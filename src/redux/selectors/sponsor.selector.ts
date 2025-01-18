import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectSponsors = (state: RootState) => state.sponsor;

export const selectSponsor = createSelector(selectSponsors, (item) => {
  return item?.sponsors || [];
});
