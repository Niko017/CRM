import { useCallback, useMemo, useState, Fragment, useContext, useEffect } from 'react';
import { Box, Button, Container, Stack, SvgIcon, ToggleButton, Typography, Card  } from '@mui/material';
import CustomersSearch from 'secciones/clientes/CustomersSearch';
import EstadoAsegurado from 'components/Filtros/EstadoAsegurado';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CustomersTable from 'secciones/clientes/CustomersTable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { applyPagination } from 'utils/apply-pagination';
import Localidades from 'components/Filtros/Localidades';
import Actividades from 'components/Filtros/Actividades';
import TiposPoliza from 'components/Filtros/TiposPoliza';
import CodPostal from 'components/Filtros/CodigoPostal';
import Provincias from 'components/Filtros/Provincias';
import GruposEmp from 'components/Filtros/GruposEmp';
import { useSelection } from 'hooks/use-selection';
import Mercados from 'components/Filtros/Merccado';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alerta from 'components/Alerta.js';
import datos from 'data/datos.json';
import '../App.css';
import { filtrosContexto } from 'contexts/ProvedorFiltros';


const MainClientes = () => {

  const { setEmailsDatos, empleados } = useContext(emailsContexto);
  const { resetFiltros } = useContext(filtrosContexto);

  const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(empleados, page, rowsPerPage);
    },
    [page, rowsPerPage, empleados]
  );
};

const useCustomerEmails = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.email);
    },
    [customers]
  );
};

useEffect(()=>{

},[empleados])

  //Variables para el control de los clientes.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customers = useCustomers(page, rowsPerPage);
  const customersEmails = useCustomerEmails(customers);
  const customersSelection = useSelection(customersEmails);
  const [alertOpen,setAlertOpen] = useState(false);
  const [mensaje,setMensaje] = useState("");
  const [activo, setActivo] = useState(false);
  const navigate = useNavigate();


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
      navigate("/editor");
    }else{
      mensajeAdvertencia("Selecciona al menos un correo!")
    }
  }

  const handleFiltros = (event) => {
    setActivo(prev => !prev)
  }

  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: '50px'
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row"justifyContent="space-between" spacing={4}>
                <Typography variant="h4">Email Masivo</Typography>
                <div style={{display: 'flex', gap:10}}>
                { activo && <Button variant='contained' onClick={resetFiltros}>Limpiar Filtros</Button> }
                <ToggleButton 
                value='filters'
                color='primary'
                selected={activo} 
                onChange={handleFiltros}
                >Filtros{activo ? <FilterAltOffIcon/> : <FilterAltIcon/>}</ToggleButton>
                <Button
                  endIcon={(
                    <SvgIcon fontSize="small">
                     <KeyboardTabIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={seleccionEmails}
                  >Siguiente</Button>
                  </div>
            </Stack>
            { activo && <Card sx={{ p:1, padding:'20px' }}>
                <div className='filtros'>
                  <EstadoAsegurado />
                  <CodPostal />
                  <Localidades />
                  <Actividades />
                </div>
                <div className='filtros'>
                  <Provincias />
                  <GruposEmp />
                  <Mercados />
                  <TiposPoliza />
                </div>
            </Card> }
            <CustomersSearch activo={activo} />
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