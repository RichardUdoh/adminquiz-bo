import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; rolePermissions: any } = {
  isLoading: false,
  error: null,
  rolePermissions: []
};

export const rolePermissionSlice = createSlice({
  name: 'rolePermission',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // CLOSE LOADING
    closeLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ALL ADS
    getRolePermissionsSuccess(state, action) {
      state.isLoading = false;
      state.rolePermissions = action.payload;
    }
  }
});

// Reducer
export default rolePermissionSlice.reducer;
