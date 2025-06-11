import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; users: any } = {
  isLoading: false,
  error: null,
  users: []
};

export const userSlice = createSlice({
  name: 'user',
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
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    }
  }
});

// Reducer
export default userSlice.reducer;
