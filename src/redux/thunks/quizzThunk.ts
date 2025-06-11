import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { dispatch } from '../store';
import { quizzSlice } from '../slices/quizz';

export const createPubliciteAdmin = createAsyncThunk(
  'store/quizzes',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(quizzSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/quizzes`, dataForm);
      dispatch(quizzSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(quizzSlice.actions.closeLoading());
    }
  }
);

export const updatePubliciteAdmin = createAsyncThunk(
  'update/quizzes',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(quizzSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/quizzes/${id}`, dataForm);
      dispatch(quizzSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(quizzSlice.actions.closeLoading());
    }
  }
);

export const filesQuizzesLogo = createAsyncThunk(
  'file/file-quizzes',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(quizzSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/quizzes/image`, dataForm);
      dispatch(quizzSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(quizzSlice.actions.closeLoading());
    }
  }
);

export const getQuizzes = createAsyncThunk('get/quizzes', async ({type, plan }:any,{dispatch}) => {
  dispatch(quizzSlice.actions.startLoading());
  try {
    const response = await axios.get('admin/quizzes',{
      params: { type, plan },
    });
    if (response?.data) {
      dispatch(quizzSlice.actions.resetQuizzes()); // 🔁 Réinitialisation ici
      dispatch(quizzSlice.actions.getQuizzesSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(quizzSlice.actions.startLoading());
  }
});





export const getPublicite = createAsyncThunk(
  'quizz/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/quizzes/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);


// export const putStatusDisabledQuizzes = createAsyncThunk(
//   'disabled/id',
//   async (id: number | string) => {
//     try {
//       const response = await axios.put(`admin/quizzes/${id}/disable`);
//       if (response) {
//         dispatch(getQuizzes());
//       }
//       return response;
//     } catch (error: any) {
//       toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
//     }
//   }
// );

// export const putStatusEnableQuizzes = createAsyncThunk(
//   'enable/id',
//   async (id: number | string) => {
//     try {
//       const response = await axios.put(`admin/quizzes/${id}/enable`);
//       if (response) {
//         dispatch(getQuizzes());
//       }
//       return response;
//     } catch (error: any) {
//       toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
//     }
//   }
// );
