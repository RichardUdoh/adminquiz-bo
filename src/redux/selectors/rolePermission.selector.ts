import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectRolePermissions = (state: RootState) => state.rolePermission;

export const selectRolePermission = createSelector(selectRolePermissions, (item) => {
  return item?.rolePermissions || [];
});
