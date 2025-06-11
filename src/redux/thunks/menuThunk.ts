import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios
import axios from '../../utils/axios';
// redux
import { menuSlice } from '../slices/menu';
import { dispatch } from '../store';

export const getMenus = createAsyncThunk('get/menus', async () => {
  dispatch(menuSlice.actions.startLoading());
  try {
    const response = await axios.get('admin/menus');
    if (response?.data) {
      dispatch(menuSlice.actions.getMenusSuccess(response.data));
      return response.data;
    }
  } catch (error: any) {
    toast.error(`${isArray(error?.errors) ? error?.errors[0] : error?.errors}`);
    dispatch(menuSlice.actions.startLoading());
  }
});
