import { Fragment, useContext, useEffect, useMemo } from 'react';
import { Box, Button, Container, Stack, SvgIcon, Typography, Card } from '@mui/material';
import FechaProspeccion from 'components/filtrosCaptacion/FechaProspeccion';
import CustomersSearch from 'secciones/clientes/CustomersSearch';
import EstadoAsegurado from 'components/Filtros/EstadoAsegurado';
import CustomersTable from 'secciones/clientes/CustomersTable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import Prioridad from 'components/filtrosCaptacion/Prioridad';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import Volumen from 'components/filtrosCaptacion/Volumen';
import Localidades from 'components/Filtros/Localidades';
import Actividades from 'components/Filtros/Actividades';
import TiposPoliza from 'components/Filtros/TiposPoliza';
import { emailsContexto } from 'contexts/ProvedorEmails';
import CodPostal from 'components/Filtros/CodigoPostal';
import Provincias from 'components/Filtros/Provincias';
import GruposEmp from 'components/Filtros/GruposEmp';
import { useSelection } from 'hooks/use-selection';
import Mercados from 'components/Filtros/Merccado';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { useBuscar } from 'hooks/useBuscar';
import Alerta from 'components/Alerta.js';
import { useAlert } from 'hooks/useAlert';
import '../App.css';


const MainClientes = () => {

  //Variables para el control de los clientes.
  const { filtros, resetFiltros } = useContext(filtrosContexto);
  const { setEmailsDatos, empleados } = useContext(emailsContexto);
  const { handleSearch } = useBuscar();
  const navigate = useNavigate();

  const { alert, handleErrorClose, mensajeAdvertencia } = useAlert();

  const useUsuariosEmails = (customers) => {
    return useMemo(
      () => customers.map((customer) => customer.email),
      [customers]
    );
  };

  const customersEmails = useUsuariosEmails(empleados);
  const { handleDeselectAll, handleDeselectOne, handleSelectAll, handleSelectOne, selected } = useSelection(customersEmails);

  const seleccionEmails = () => {
    if (selected.length !== 0) {
      let emailsSeleccionados = selected.filter(elemento => elemento !== null);
      setEmailsDatos(emailsSeleccionados);
      navigate("/editor");
    } else {
      mensajeAdvertencia("Selecciona al menos un correo!");
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) navigate('/');
  }, [])

  return (
    <Fragment>
      <Box component="main" sx={{ flexGrow: 1, py: '50px' }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <div style={{ display: 'flex' }}>
                <Button sx={{ height: 40 }} color='error' variant='contained' size='small' onClick={() => {
                  resetFiltros();
                  handleSearch();
                }}>Limpiar Filtros</Button>
                <Button
                  sx={{ height: 40, marginLeft: 1 }}
                  endIcon={(
                    <SvgIcon fontSize="small">
                      <KeyboardTabIcon />
                    </SvgIcon>
                  )}
                  color='error'
                  variant="contained"
                  size="small"
                  onClick={seleccionEmails}
                >Siguiente</Button>

              </div>
              <Typography color='#868889' variant="h4">Email Masivo</Typography>
            </Stack>
            <Card sx={{ p: 1, padding: '20px' }}>
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
            </Card>
            {
              filtros.estadoAsegurado === 1 &&
              <Card sx={{ p: 1, padding: '20px' }}>
                <div className='filtros'>
                  <Prioridad />
                  <FechaProspeccion />
                  <Volumen />
                </div>
              </Card>
            }
            <CustomersSearch />
            <CustomersTable
              selectAll={handleSelectAll}
              deselectAll={handleDeselectAll}
              selectOne={handleSelectOne}
              deselectOne={handleDeselectOne}
              selected={selected}
              items={empleados}
            />
          </Stack>
        </Container>
      </Box>
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
        <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alerta>
      </Snackbar>
    </Fragment>
  );
};
export default MainClientes;