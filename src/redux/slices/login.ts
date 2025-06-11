import { createSlice } from '@reduxjs/toolkit';
// types

// ----------------------------------------------------------------------

const initialState: { isLoading: boolean; error: any; user?: any; token?: string | null } = {
  isLoading: false,
  error: null,
  user: null,
  token: null,
};

export const loginSlice = createSlice({
  name: 'login',
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
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      console.log(state)
      state.user = null;
      state.token = null;
      
    },
  }
});
export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
