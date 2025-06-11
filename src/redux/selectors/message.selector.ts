import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectMessages = (state: RootState) => state.message;

export const selectMessage = createSelector(selectMessages, (item) => {
  return item?.messages || [];
});
