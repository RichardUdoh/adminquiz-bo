import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { userSlice } from '../slices/user';
import { dispatch } from '../store';

export const createUserAdmin = createAsyncThunk(
  'admin/collaborators',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/collaborators`, dataForm);
      dispatch(userSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(userSlice.actions.closeLoading());
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  'update/collaborators',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/collaborators/${id}`, dataForm);
      dispatch(userSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(userSlice.actions.closeLoading());
    }
  }
);

export const filesUsersLogo = createAsyncThunk(
  'file/profile-pictures',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post(`files/profile-pictures`, dataForm);
      dispatch(userSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(userSlice.actions.closeLoading());
    }
  }
);

export const getUsers = createAsyncThunk('get/collaborators', async () => {
  dispatch(userSlice.actions.startLoading());

  try {
    const response = await axios.get('admin/collaborators');
    if (response?.data) {
      dispatch(userSlice.actions.getUsersSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(userSlice.actions.startLoading());
  }
});

export const getUsagers = createAsyncThunk('get/usagers', async () => {
  dispatch(userSlice.actions.startLoading());

  try {
    const response = await axios.get('admin/accounts/usagers');
    if (response?.data) {
      dispatch(userSlice.actions.getUsersSuccess(response.data));
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(userSlice.actions.startLoading());
  }
});


export const getUser = createAsyncThunk(
  'user/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/collaborators/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusDisabledUsers = createAsyncThunk(
  'disabled/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/collaborators/${id}/disable`);
      if (response) {
        dispatch(getUsers());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusEnableUsers = createAsyncThunk(
  'enable/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/collaborators/${id}/enable`);
      if (response) {
        dispatch(getUsers());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);