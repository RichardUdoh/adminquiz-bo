import { Box, List } from '@mui/material';
import React from 'react';
import NavList from './nav-list';

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }: any) {
  const renderContent = navConfig.map((list: any) => (
    <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
  ));
  return (
    <Box {...other}>
      <List disablePadding>{renderContent}</List>
    </Box>
  );
}
