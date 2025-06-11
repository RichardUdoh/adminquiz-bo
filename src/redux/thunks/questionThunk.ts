import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { questionSlice } from '../slices/question';
import { dispatch } from '../store';

export const getQuestionsByQuizz = createAsyncThunk('get/quizzes', 
  async (id: number | string,{dispatch}) => {
  dispatch(questionSlice.actions.startLoading());
  try {
      const response = await axios.get(`admin/questions/quiz/${id}`);

    if (response?.data) {
      dispatch(questionSlice.actions.getQuestionsSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(questionSlice.actions.startLoading());
  }
});

 export const createQuestionAdmin = createAsyncThunk(
  'store/questions',
  async (dataForm: any, { rejectWithValue, dispatch }) => {
    dispatch(questionSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/questions`, dataForm);
      dispatch(questionSlice.actions.closeLoading());
      return response.data; // retourner la data ici
    } catch (error: any) {
      dispatch(questionSlice.actions.closeLoading());
      // Afficher toast
      toast.error(
        `${Array.isArray(error?.errors) ? error?.errors[0] : error?.errors || error.message}`
      );
      // rejeter proprement avec rejectWithValue
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateQuestionAdmin = createAsyncThunk(
  'update/questions',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(questionSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/questions/${id}`, dataForm);
      dispatch(questionSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(questionSlice.actions.closeLoading());
    }
  }
);


export const getQuestion = createAsyncThunk(
  'questions/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/questions/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);


export const filesQuestionMediaSupport = createAsyncThunk(
  'file/file-mediaSupport',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(questionSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/mediaSupport`, dataForm);
      dispatch(questionSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(questionSlice.actions.closeLoading());
    }
  }
);