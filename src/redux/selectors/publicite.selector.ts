import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPublicites = (state: RootState) => state.publicite;

export const selectPublicite = createSelector(selectPublicites, (item) => {
  return item?.publicites || [];
});
