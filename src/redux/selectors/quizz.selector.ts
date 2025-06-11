import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectQuizzes = (state: RootState) => state.quizz;

export const selectQuizz = createSelector(selectQuizzes, (item) => {
  return item?.quizzes || [];
});
