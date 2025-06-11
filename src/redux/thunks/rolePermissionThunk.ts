import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { rolePermissionSlice } from '../slices/rolePermission';
import { dispatch } from '../store';

export const createRolePermissionAdmin = createAsyncThunk(
  'create/rolePermissions',
  async (dataForm: any, { rejectWithValue }) => {
    dispatch(rolePermissionSlice.actions.startLoading());
    try {
      const response = await axios.post(`admin/roles`, dataForm);
      dispatch(rolePermissionSlice.actions.closeLoading());
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(rolePermissionSlice.actions.closeLoading());
    }
  }
);

export const updateRolePermissionAdmin = createAsyncThunk(
  'update/rolePermissions',
  async ({ id, dataForm }: { id: number | string; dataForm: any }, { rejectWithValue, dispatch }) => {
    dispatch(rolePermissionSlice.actions.startLoading());
    try {
      const response = await axios.put(`admin/rolePermissions/${id}`, dataForm);
      dispatch(rolePermissionSlice.actions.closeLoading());
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
      dispatch(rolePermissionSlice.actions.closeLoading());
    }
  }
);


export const getRolePermissions = createAsyncThunk('get/role-permissions', async (status?: string) => {
  dispatch(rolePermissionSlice.actions.startLoading());
  
  try {
    const response = await axios.get('admin/roles', {
        params: status ? { status } : {},
      });
    if (response?.data) {
      dispatch(rolePermissionSlice.actions.getRolePermissionsSuccess(response.data));
    }
    return response.data;
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(rolePermissionSlice.actions.startLoading());
  }
});

export const getRolePermissionWthPermissions = createAsyncThunk('get/with-permissions', async (status?: string) => {
  dispatch(rolePermissionSlice.actions.startLoading());
  try {
    const response = await axios.get('admin/roles/with-permissions', {
        params: status ? { status } : {},
      });
    if (response?.data) {
      dispatch(rolePermissionSlice.actions.getRolePermissionsSuccess(response.data));
    }
    return response.data;
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(rolePermissionSlice.actions.startLoading());
  }
});



export const getRolePermission = createAsyncThunk(
  'rolePermission/id',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/rolePermissions/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);


export const putStatusDisabledRolePermissions = createAsyncThunk(
  'disabled/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/roles/${id}/disable`);
      if (response) {
        dispatch(getRolePermissions());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);

export const putStatusEnableRolePermissions = createAsyncThunk(
  'enable/id',
  async (id: number | string) => {
    try {
      const response = await axios.put(`admin/roles/${id}/enable`);
      if (response) {
        dispatch(getRolePermissions());
      }
      return response;
    } catch (error: any) {
      toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    }
  }
);
