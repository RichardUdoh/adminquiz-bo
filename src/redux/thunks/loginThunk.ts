import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { loginSlice } from '../slices/login';
import { dispatch } from '../store';

export const loginAdmin = createAsyncThunk(
  'login/codeOtp',
  async (
    datum: { accountId: string; password: string; captchaToken: string },
    { rejectWithValue }
  ) => {
    dispatch(loginSlice.actions.startLoading());
    try {
      const response = await axios.post(`signin`, datum);
      dispatch(loginSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(loginSlice.actions.closeLoading());
    }
  }
);
