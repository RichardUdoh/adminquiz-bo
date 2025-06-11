import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; questions: any } = {
  isLoading: false,
  error: null,
  questions: []
};

export const questionSlice = createSlice({
  name: 'question',
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
    getQuestionsSuccess(state, action) {
      state.isLoading = false;
      state.questions = action.payload;
    },

     resetQuestions(state) {
      state.questions = [];
      state.isLoading = false;
      state.error = null;
    }
  }
});

export default questionSlice.reducer;
