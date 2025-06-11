import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectQuestions = (state: RootState) => state.question;

export const selectQuestion = createSelector(selectQuestions, (item) => {
  return item?.questions || [];
});
