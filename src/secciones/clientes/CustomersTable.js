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
} from '@mui/material';
import { getInitials } from 'utils/get-initials';
import CustomerHeaderTable from './CustomerHeaderTable';
import { useOrder } from 'hooks/use-order';
import { usePagination } from 'hooks/use-pagination';

const CustomersTable = (props) => {

  const { selectAll, deselectAll, selectOne, deselectOne, selected, items } = props;

  const count = items.length;
  const selectedSome = (selected.length > 0) && (selected.length < count);
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = usePagination();
  const { order, orderBy, createSortHandler, visibleRows } = useOrder({ items, page, rowsPerPage });

  const handleClick = (event, name) => {
    const validacion = selected.includes(name);
    if (!validacion) {
      selectOne?.(name);
    } else {
      deselectOne?.(name);
    }
  };

  const handleCheckChange = (event, selector) => {
    if (event.target.checked) {
      selectOne?.(selector);
    } else {
      deselectOne?.(selector);
    }
  }

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table
          size={'small'}>
          <CustomerHeaderTable
            items={items}
            numSelected={selected.length}
            total={items.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={selectAll}
            onDeselectAll={deselectAll}
            selectedSome={selectedSome}
            onRequestSort={createSortHandler}
          />
          <TableBody>
            {visibleRows.length !== 0 ?
              visibleRows.map((customer) => {
                const isSelected = selected.includes(customer.email);
                return (
                  <TableRow
                    hover
                    key={customer.codigo}
                    selected={isSelected}
                    onClick={(event) => { handleClick(event, customer.email) }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}
                        color='error'
                        onChange={event => handleCheckChange(event, customer.email)} />
                    </TableCell>
                    <TableCell>{customer.codigo ?? ''}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row">
                        <Avatar sx={{ marginRight: '15px' }}>{getInitials(customer.nombre ?? '')}</Avatar>
                        {customer.nombre}
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.provincia ?? 'Sin Provincia'}</TableCell>
                    <TableCell>{customer.grupo ?? 'Sin grupo'}</TableCell>
                    <TableCell>{customer.actividad ?? 'Sin Actividad'}</TableCell>
                    <TableCell>{customer.email ?? 'Sin Email'}</TableCell>
                  </TableRow>
                );
              }) :
              <TableRow><TableCell colSpan={7} style={{ textAlign: 'center' }}>Sin Resultados</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100, count]}
        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count} filas`}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
};

export default CustomersTable;