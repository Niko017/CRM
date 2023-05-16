import { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from 'utils/get-initials';
import CustomerHeaderTable from './CustomerHeaderTable';

const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange,
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  ///////////////ORDENAR POR COLUMUNAS/////////////
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(items, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [items, order, orderBy, page, rowsPerPage],
  );

  ///////////////FIN ORDENAR POR COLUMUNAS/////////////

  const handleClick = (event, name) => {
    const validacion  = selected.includes(name);
    if(!validacion){
      onSelectOne?.(name);
    }else{
      onDeselectOne?.(name);  
    }
  };

  const handleCheckChange = (event,selector) =>{
    if (event.target.checked) {
      onSelectOne?.(selector);
    } else {
      onDeselectOne?.(selector);
    }
  }

  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table
          size={'small'}>
            <CustomerHeaderTable
              numSelected={selected.length}
              total={items.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={onSelectAll}
              onDeselectAll={onDeselectAll}
              selectedSome={selectedSome}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.length!==0 ? 
              visibleRows.map((customer) => {
                const isSelected = selected.includes(customer.email);
                return (
                  <TableRow
                  hover
                  key={customer.codigo}
                  selected={isSelected} 
                  onClick={(event)=> { handleClick(event, customer.email) }}
                  sx={{ cursor:'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}
                        onChange={event => handleCheckChange(event,customer.email)}/>
                    </TableCell>
                    <TableCell>{customer.codigo}</TableCell>
                    <TableCell>
                    <Stack alignItems="center" direction="row">
                        <Avatar sx={{marginRight:'15px'}}>{getInitials(customer.nombre)}</Avatar>
                        {customer.nombre}
                      </Stack>
                      </TableCell>
                    <TableCell>{customer.provincia ?? 'Sin Provincia'}</TableCell>
                    <TableCell>{customer.grupo ?? 'Sin grupo'}</TableCell>
                    <TableCell>{customer.actividad ?? 'Sin Actividad'}</TableCell>
                    <TableCell>{customer.email ?? 'Sin Email'}</TableCell>
                  </TableRow>
                );
              }):
              <TableRow><TableCell colSpan={7} style={{textAlign:'center'}}>Sin Resultados</TableCell></TableRow>}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[ 10, 25, 50, 100, count]}
        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count} filas`}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
};

export default CustomersTable;

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
