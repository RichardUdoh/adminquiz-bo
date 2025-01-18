import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { sponsorSlice } from '../slices/sponsor';
import { dispatch } from '../store';

export const createSponsorAdmin = createAsyncThunk(
  'login/codeOtp',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(sponsorSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/sponsors`, dataForm);
      dispatch(sponsorSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(sponsorSlice.actions.closeLoading());
    }
  }
);

export const filesSponsorsLogo = createAsyncThunk(
  'file/file-sponsor',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(sponsorSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/sponsors/logo`, dataForm);
      dispatch(sponsorSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(sponsorSlice.actions.closeLoading());
    }
  }
);

export const getSponsors = createAsyncThunk('get/sponsors', async () => {
  dispatch(sponsorSlice.actions.startLoading());

  try {
    const response = await axios.get('admin/sponsors');
    if (response?.data) {
      dispatch(sponsorSlice.actions.getSponsorsSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(sponsorSlice.actions.startLoading());
  }
});

export const putStatusDisabledSponsors = createAsyncThunk(
  'disabled/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/sponsors/${id}/disable`);
      if (response) {
        dispatch(getSponsors());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusEnableSponsors = createAsyncThunk(
  'enable/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/sponsors/${id}/enable`);
      if (response) {
        dispatch(getSponsors());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);
