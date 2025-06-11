import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectMenus = (state: RootState) => state.menu;

export const selectMenu = createSelector(selectMenus, (item) => {
  return item?.menus || [];
});
