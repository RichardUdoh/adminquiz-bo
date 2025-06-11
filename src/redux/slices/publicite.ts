import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; publicites: any } = {
  isLoading: false,
  error: null,
  publicites: []
};

export const publiciteSlice = createSlice({
  name: 'publicite',
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
    getPublicitesSuccess(state, action) {
      state.isLoading = false;
      state.publicites = action.payload;
    }
  }
});

// Reducer
export default publiciteSlice.reducer;
