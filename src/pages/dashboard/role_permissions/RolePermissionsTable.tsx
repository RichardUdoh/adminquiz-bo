import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled';
import TableHeadComponent from '../../../components/table/components/TableHeadComponent';
import { dispatch, useSelector } from '../../../redux/store';
import {
  getRolePermissions,
  putStatusDisabledRolePermissions,
  putStatusEnableRolePermissions
} from '../../../redux/thunks/rolePermissionThunk';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { useBoolean } from '../../../hooks/use-boolean';
import TablePagination from '@mui/material/TablePagination';
import RolePermissionModal from './RolePermissionsModal';
import { selectRolePermission } from '../../../redux/selectors/rolePermission.selector';

interface Data {
  id: number;
  label: string;
  createdDate: string;
  status: string;
  action: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'label', numeric: false, disablePadding: true, label: 'Libellé' },
  { id: 'createdDate', numeric: false, disablePadding: false, label: 'Date de création' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Statut' },
  { id: 'action', numeric: false, disablePadding: false, label: '' },
];

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': { backgroundColor: '#EFF5F8' },
  '&:last-child td, &:last-child th': { border: 0 }
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}



function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function RolePermissionTable() {
  const rolePermissions = useSelector(selectRolePermission);
  const theme = useTheme();
  const [selectedRolePermission, setSelectedRolePermission] = React.useState<Data | null>(null); // Etat pour stocker l'élément sélectionné
  const [open, setOpen] = React.useState(false);7

  React.useEffect(() => {
    dispatch(getRolePermissions());
  }, []);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleOpenModal = (rolePermission: any) => {
    setSelectedRolePermission(rolePermission);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRolePermission(null); // Reset the selected rolePermission
  };


  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rolePermissions?.data?.map((n: any) => n.id) || [];
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHeadComponent
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rolePermissions?.data?.length || 0}
              headCells={headCells}
              
             />
            <TableBody>
              {stableSort(rolePermissions?.data || [], getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event: any) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                     
                      <TableCell align="left" id={labelId} padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left" padding="none">{row.label}</TableCell>
                      <TableCell align="left">{moment(row.createdDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color:
                            (row.status === 'ACTIVE' && theme.palette.success.main) ||
                            (row.status === 'INACTIVE' && theme.palette.error.main) ||
                            theme.palette.warning.dark
                        }}
                      >
                        {(row.status === 'ACTIVE' && 'Activé') ||
                          (row.status === 'INACTIVE' && 'Désactivé') ||
                          'En cours'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleOpenModal(row)} sx={{ background: theme.palette.primary.main }}>
                          <Iconify icon="weui:arrow-filled" width={18} height={18} sx={{ color: 'white' }} />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rolePermissions?.data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>

      <RolePermissionModal
        open={open}
        onClose={handleCloseModal}
        selectedRolePermission={selectedRolePermission}
      />
    </Box>
  );
}