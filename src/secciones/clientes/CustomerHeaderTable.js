import React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

function CustomerHeaderTable(props) {
  const { onSelectAllClick, onDeselectAll, order, orderBy, numSelected, onRequestSort, selectedSome, total } = props;

  const headCells = [
    {
      id: 'codigo',
      numeric: false,
      disablePadding: false,
      label: 'Código',
    },
    {
      id: 'nombre',
      numeric: false,
      disablePadding: false,
      label: 'Nombre',
    },
    {
      id: 'provincia',
      numeric: false,
      disablePadding: false,
      label: 'Provincia',
    },
    {
      id: 'grupo',
      numeric: false,
      disablePadding: false,
      label: 'Grupo',
    },
    {
      id: 'actividad',
      numeric: false,
      disablePadding: false,
      label: 'Actividad',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="error"
            checked={numSelected === total}
            indeterminate={numSelected > 0 && numSelected < total}
            onChange={(event) => {
              let checkeado = event.target.checked;
              if (!checkeado || selectedSome) {
                onDeselectAll?.();
              } else if (checkeado) {
                onSelectAllClick?.();
              }
            }}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onRequestSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
} export default CustomerHeaderTable;