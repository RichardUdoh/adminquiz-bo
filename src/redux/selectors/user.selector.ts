import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.user;

export const selectUser = createSelector(selectUsers, (item) => {
  return item?.users || [];
});
