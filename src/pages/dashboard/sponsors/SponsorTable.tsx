import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import TableHeadComponent from '../../../components/table/components/TableHeadComponent';
import { selectSponsor } from '../../../redux/selectors/sponsor.selector';
import { dispatch, useSelector } from '../../../redux/store';
import {
  getSponsors,
  putStatusDisabledSponsors,
  putStatusEnableSponsors
} from '../../../redux/thunks/sponsorThunk';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { useBoolean } from '../../../hooks/use-boolean';

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ID'
  },
  {
    id: 'label',
    numeric: false,
    disablePadding: true,
    label: 'Libellé'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date de début'
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'Date de fin'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'statut'
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: ''
  }
];

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#EFF5F8'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function SponsorTable() {
  const sponsors = useSelector(selectSponsor);
  const open = useBoolean();

  React.useEffect(() => {
    dispatch(getSponsors());
  }, []);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const theme = useTheme();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = sponsors?.data?.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHeadComponent
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={sponsors?.data?.length}
              headCells={headCells}
            />
            <TableBody>
              {sponsors?.data?.map((row: any, index: number) => {
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        sx={{ color: theme.palette.divider }}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.label}</TableCell>
                    <TableCell align="left">{moment(row.startDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="left">{moment(row.endDate).format('DD/MM/YYYY')}</TableCell>
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
                      <IconButton
                        onClick={() => open.onTrue()}
                        sx={{ background: theme.palette.primary.main }}
                      >
                        <Iconify
                          icon="weui:arrow-filled"
                          width={18}
                          height={18}
                          sx={{ color: 'white' }}
                        />
                      </IconButton>
                    </TableCell>

                    <Dialog fullWidth maxWidth="sm" open={open.value} onClose={open.onToggle}>
                      <DialogContent>
                        <Stack direction="row" justifyContent="flex-end">
                          <IconButton color="primary" onClick={open.onToggle}>
                            <Iconify icon="mingcute:close-fill" />
                          </IconButton>
                        </Stack>

                        <Stack spacing={1}>
                          <Box
                            width={1}
                            height={100}
                            bgcolor={theme.palette.grey[200]}
                            borderRadius={4}
                            boxSizing="border-box"
                            overflow="hidden"
                          >
                            <img
                              src={row.image}
                              alt={row.label}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </Box>

                          <Stack
                            direction="row"
                            sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography width="50%" variant="body2" color="text.secondary">
                              Libellé:
                            </Typography>
                            <Typography width="50%" variant="subtitle2">
                              {row.label}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            sx={{ p: 2, borderRadius: 2 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography width="50%" variant="body2" color="text.secondary">
                              Date de début:
                            </Typography>
                            <Typography width="50%" variant="subtitle2">
                              {moment(row.startDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography width="50%" variant="body2" color="text.secondary">
                              Date de fin:
                            </Typography>
                            <Typography width="50%" variant="subtitle2">
                              {moment(row.endDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            sx={{ p: 2, borderRadius: 2 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography width="50%" variant="body2" color="text.secondary">
                              Lien de rédirection:
                            </Typography>
                            <Typography width="50%" variant="subtitle2">
                              {row.redirectionLink}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Typography width="50%" variant="body2" color="text.secondary">
                              Description:
                            </Typography>
                            <Typography width="50%" variant="subtitle2">
                              {row.description}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            mt={4}
                          >
                            <Button
                              variant="contained"
                              startIcon={<Iconify icon="material-symbols-light:edit-rounded" />}
                            >
                              Editer
                            </Button>
                            <Button
                              startIcon={<Iconify icon="hugeicons:logout-04" />}
                              variant="contained"
                              color="error"
                              onClick={async () => {
                                row.status === 'ACTIVE'
                                  ? await dispatch(putStatusDisabledSponsors(row?.id))
                                  : await dispatch(putStatusEnableSponsors(row?.id));

                                open.onFalse();
                              }}
                            >
                              {row.status === 'ACTIVE' ? 'Désactivé' : 'Activé'}
                            </Button>
                          </Stack>
                        </Stack>
                      </DialogContent>
                    </Dialog>
                  </StyledTableRow>
                );
              })}
              {sponsors?.data?.lenght > 0 && (
                <TableRow
                  style={{
                    height: 53
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
