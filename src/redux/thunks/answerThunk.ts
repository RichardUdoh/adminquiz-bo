import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { questionSlice } from '../slices/question';
import { dispatch } from '../store';

 export const createAnswerAdmin = createAsyncThunk(
  'store/answers',
  async (dataForm: any, { rejectWithValue, dispatch }) => {
    dispatch(questionSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/answers`, dataForm);
      dispatch(questionSlice.actions.closeLoading());
      return response.data; 
    } catch (error: any) {
      dispatch(questionSlice.actions.closeLoading());
      toast.error(
        `${Array.isArray(error?.errors) ? error?.errors[0] : error?.errors || error.message}`
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);