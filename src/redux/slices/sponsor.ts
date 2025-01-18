import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; sponsors: any } = {
  isLoading: false,
  error: null,
  sponsors: []
};

export const sponsorSlice = createSlice({
  name: 'sponsor',
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
    getSponsorsSuccess(state, action) {
      state.isLoading = false;
      state.sponsors = action.payload;
    }
  }
});

// Reducer
export default sponsorSlice.reducer;
