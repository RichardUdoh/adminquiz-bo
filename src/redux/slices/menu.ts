import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; menus: any } = {
  isLoading: false,
  error: null,
  menus: []
};

export const menuSlice = createSlice({
  name: 'menu',
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

    // GET ALL MENUS
    getMenusSuccess(state, action) {
      state.isLoading = false;
      state.menus = action.payload;
    }
  }
});

// Reducer
export default menuSlice.reducer;
