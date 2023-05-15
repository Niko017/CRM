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
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from 'utils/get-initials';

const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Provincia</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>Actividad</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.email)
                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.email);
                          } else {
                            onDeselectOne?.(customer.email);
                          }
                        }}/>
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
              })}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, count]}
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
