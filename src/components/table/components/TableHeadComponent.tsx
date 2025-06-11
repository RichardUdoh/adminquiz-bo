import * as React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Box,
  tableCellClasses
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import styled from '@emotion/styled';

// Types utilisés
interface Data<T = any> {
  id: number;
  label: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  redirectionLink?: string;
  image?: string;
  description?: string;
  createdDate?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface TableHeadComponentProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Data;
  onRequestSort: (event: React.MouseEvent<unknown>, property: ColumnKey) => void;
  rowCount: number;
  headCells: readonly HeadCell[];
}

// 🎨 Styled cell avec tes couleurs
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#34B4E2',
    color: '#fff'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export default function TableHeadComponent(props: TableHeadComponentProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells
  } = props;

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <StyledTableCell  padding="checkbox" sx={{ 'padding': '16px', }}>
          <Checkbox
            sx={{ color: 'white' }}
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        </StyledTableCell > */}
        {headCells.map((headCell, index) => (
          <StyledTableCell 
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                ...(index === 0 && { '&:first-of-type': { boxShadow: 'none' } }), // style pour le premier
                ...(index === headCells.length - 1 && { '&:last-of-type': { boxShadow: 'none' } }) // style pour le dernier
              }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: 'white', '&.Mui-active': { color: 'white' } }}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}