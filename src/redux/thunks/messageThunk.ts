import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { messageSlice } from '../slices/message';
import { dispatch } from '../store';

export const createMessageAdmin = createAsyncThunk(
  'store/ads',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(messageSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/ads`, dataForm);
      dispatch(messageSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(messageSlice.actions.closeLoading());
    }
  }
);

export const updateMessageAdmin = createAsyncThunk(
  'update/ads',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(messageSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/ads/${id}`, dataForm);
      dispatch(messageSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(messageSlice.actions.closeLoading());
    }
  }
);

export const filesMessagesLogo = createAsyncThunk(
  'file/file-ads',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(messageSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/ads/image`, dataForm);
      dispatch(messageSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(messageSlice.actions.closeLoading());
    }
  }
);

export const getMessages = createAsyncThunk('get/ads', async () => {
  dispatch(messageSlice.actions.startLoading());

  try {
    const response = await axios.get('admin/ads');
    if (response?.data) {
      dispatch(messageSlice.actions.getMessagesSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(messageSlice.actions.startLoading());
  }
});

export const getMessage = createAsyncThunk(
  'message/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/ads/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);


export const putStatusDisabledMessages = createAsyncThunk(
  'disabled/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/ads/${id}/disable`);
      if (response) {
        dispatch(getMessages());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusEnableMessages = createAsyncThunk(
  'enable/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/ads/${id}/enable`);
      if (response) {
        dispatch(getMessages());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);
