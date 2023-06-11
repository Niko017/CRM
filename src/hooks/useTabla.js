import { useCallback, useMemo, useState, useContext } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { useSelection } from 'hooks/use-selection';

export function useTabla() {

  const useUsuariosEmails = (customers) => {
    return useMemo(
      () => {
        customers.map((customer) => customer.email);
      },
      [customers]
    );
  };

  const handlePageChange = useCallback((event, value) => setPage(value), []);


  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(Number(event.target.value));
      setPage(0);
    },
    []
  );

  const { empleados } = useContext(emailsContexto);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customersEmails = useUsuariosEmails(empleados);
  const { handleDeselectAll, handleDeselectOne, handleSelectAll, handleSelectOne, selected } = useSelection(customersEmails); // Hacer desestructuracion



  return { count: empleados.length, items: empleados, page, rowsPerPage, handlePageChange, handleRowsPerPageChange, handleDeselectAll, handleDeselectOne, handleSelectAll, handleSelectOne, selected }
}