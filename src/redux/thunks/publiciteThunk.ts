import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { publiciteSlice } from '../slices/publicite';
import { dispatch } from '../store';

export const createPubliciteAdmin = createAsyncThunk(
  'store/ads',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(publiciteSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/ads`, dataForm);
      dispatch(publiciteSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(publiciteSlice.actions.closeLoading());
    }
  }
);

export const updatePubliciteAdmin = createAsyncThunk(
  'update/ads',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(publiciteSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/ads/${id}`, dataForm);
      dispatch(publiciteSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(publiciteSlice.actions.closeLoading());
    }
  }
);

export const filesPublicitesLogo = createAsyncThunk(
  'file/file-ads',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(publiciteSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/ads/image`, dataForm);
      dispatch(publiciteSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(publiciteSlice.actions.closeLoading());
    }
  }
);

export const getPublicites = createAsyncThunk('get/ads', async () => {
  dispatch(publiciteSlice.actions.startLoading());

  try {
    const response = await axios.get('admin/ads');
    if (response?.data) {
      dispatch(publiciteSlice.actions.getPublicitesSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(publiciteSlice.actions.startLoading());
  }
});

export const getPublicite = createAsyncThunk(
  'publicite/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/ads/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);


export const putStatusDisabledPublicites = createAsyncThunk(
  'disabled/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/ads/${id}/disable`);
      if (response) {
        dispatch(getPublicites());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusEnablePublicites = createAsyncThunk(
  'enable/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/ads/${id}/enable`);
      if (response) {
        dispatch(getPublicites());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);
