import { useCallback, useMemo, useState, Fragment, useContext } from 'react'
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import CustomersSearch from 'secciones/clientes/CustomersSearch';
import CustomersTable from 'secciones/clientes/CustomersTable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { applyPagination } from 'utils/apply-pagination';
import { useSelection } from 'hooks/use-selection';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alerta from 'components/Alerta.js';
import datos from 'data/datos.json';
import Head from 'next/head';

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(datos, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.email);
    },
    [customers]
  );
};

const MainClientes = () => {

  //Variables para el control de los clientes.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [alertOpen,setAlertOpen] = useState(false);
  const [mensaje,setMensaje] = useState("");
  const navigate = useNavigate();

  const { setEmailsDatos } = useContext(emailsContexto);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleErrorClose = (event, reason)=>{
    if (reason === 'clickaway') {
        return;
      }
      setAlertOpen(false);
}

  const mensajeAdvertencia = (mensaje)=>{
        setMensaje(mensaje);
        setAlertOpen(true);
  }

  const seleccionEmails =()=>{
    if(customersSelection.selected.length!==0){
      setEmailsDatos(customersSelection.selected);
      navigate("/prueba");
    }else{
      mensajeAdvertencia("Selecciona al menos un correo!")
    }
  }

  return (
    <Fragment>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack alignItems="center" direction="row"spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}>Import</Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}>Export</Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  endIcon={(
                    <SvgIcon fontSize="small">
                     <KeyboardTabIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={seleccionEmails}
                >
                  Siguiente 
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={datos.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
      <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity="warning" sx={{ width: '100%' }}>
                {mensaje}
            </Alerta>
        </Snackbar>
    </Fragment>
  );
};
export default MainClientes;