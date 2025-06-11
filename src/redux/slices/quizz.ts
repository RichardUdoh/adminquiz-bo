import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; quizzes: any } = {
  isLoading: false,
  error: null,
  quizzes: []
};

export const quizzSlice = createSlice({
  name: 'quizz',
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
    getQuizzesSuccess(state, action) {
      state.isLoading = false;
      state.quizzes = action.payload;
    },

   resetQuizzes(state) {
      state.quizzes = [];
      state.isLoading = false;
      state.error = null;
    }
  }
});

export default quizzSlice.reducer;
