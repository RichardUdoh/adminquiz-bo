import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; messages: any } = {
  isLoading: false,
  error: null,
  messages: []
};

export const messageSlice = createSlice({
  name: 'message',
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
    getMessagesSuccess(state, action) {
      state.isLoading = false;
      state.messages = action.payload;
    }
  }
});

// Reducer
export default messageSlice.reducer;
