import { useState, Fragment, useContext, useEffect } from 'react';
import { Box, Button, Container, Stack, SvgIcon, ToggleButton, Typography, Card } from '@mui/material';
import CustomersSearch from 'secciones/clientes/CustomersSearch';
import EstadoAsegurado from 'components/Filtros/EstadoAsegurado';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CustomersTable from 'secciones/clientes/CustomersTable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import Localidades from 'components/Filtros/Localidades';
import Actividades from 'components/Filtros/Actividades';
import TiposPoliza from 'components/Filtros/TiposPoliza';
import { emailsContexto } from 'contexts/ProvedorEmails';
import CodPostal from 'components/Filtros/CodigoPostal';
import Provincias from 'components/Filtros/Provincias';
import GruposEmp from 'components/Filtros/GruposEmp';
import Mercados from 'components/Filtros/Merccado';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { useBuscar } from 'hooks/useBuscar';
import Alerta from 'components/Alerta.js';
import { useTabla } from 'hooks/useTabla';
import '../App.css';
import Prioridad from 'components/filtrosCaptacion/Prioridad';
import FechaProspeccion from 'components/filtrosCaptacion/FechaProspeccion';
import { useAlert } from 'hooks/useAlert';
import Volumen from 'components/filtrosCaptacion/Volumen';


const MainClientes = () => {

  //Variables para el control de los clientes.
  const { filtros, resetFiltros } = useContext(filtrosContexto);
  const { setEmailsDatos } = useContext(emailsContexto);
  const { handleSearch } = useBuscar();
  const navigate = useNavigate();
  const { count, items, page, rowsPerPage, handlePageChange, handleRowsPerPageChange, handleDeselectAll, handleDeselectOne, handleSelectAll, handleSelectOne, selected } = useTabla();
  const { alert, handleErrorClose, mensajeAdvertencia } = useAlert();

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
                <Button sx={{ height: 30 }} color='error' variant='contained' size='small' onClick={() => {
                  resetFiltros();
                  handleSearch();
                }}>Limpiar Filtros</Button>
                <Button
                  sx={{ height: 30, marginLeft: 1 }}
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
              count={count}
              items={items}
              onDeselectAll={handleDeselectAll}
              onDeselectOne={handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
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