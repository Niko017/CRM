import {  useState, Fragment, useContext } from 'react';
import { Box, Button, Container, Stack, SvgIcon, ToggleButton, Typography, Card } from '@mui/material';
import CustomersSearch from 'secciones/clientes/CustomersSearch';
import EstadoAsegurado from 'components/Filtros/EstadoAsegurado';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CustomersTable from 'secciones/clientes/CustomersTable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Localidades from 'components/Filtros/Localidades';
import Actividades from 'components/Filtros/Actividades';
import TiposPoliza from 'components/Filtros/TiposPoliza';
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
import { emailsContexto } from 'contexts/ProvedorEmails';


const MainClientes = () => {

  ///////////////Funciones para la tabla y control///////////////
  
  
  //Variables para el control de los clientes.
  const { resetFiltros } = useContext(filtrosContexto);
  const { setEmailsDatos } = useContext(emailsContexto);
  const [alertOpen,setAlertOpen] = useState(false);
  const [mensaje,setMensaje] = useState("");
  const [activo, setActivo] = useState(false);
  const { handleSearch } = useBuscar();
  const navigate = useNavigate();
  const { count, items, page, rowsPerPage, handlePageChange, handleRowsPerPageChange,  handleDeselectAll, handleDeselectOne, handleSelectAll, handleSelectOne, selected } = useTabla();

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  }

  const mensajeAdvertencia = (mensaje) => {
    setMensaje(mensaje);
    setAlertOpen(true);
  }

  const seleccionEmails = () => {
    if(selected.length!==0){
      let emailsSeleccionados = selected.filter(elemento => elemento!==null);
      setEmailsDatos(emailsSeleccionados);
      navigate("/editor");
    }else{
      mensajeAdvertencia("Selecciona al menos un correo!")
    }
  }

  return (
    <Fragment>
      <Box component="main" sx={{ flexGrow: 1, py: '50px'}}>
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
                onChange={() => setActivo(prev => !prev)}
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
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Button variant='contained' onClick={handleSearch}>Buscar</Button>
                </div>
            </Card> }
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
      <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity="warning" sx={{ width: '100%' }}>
                {mensaje}
            </Alerta>
        </Snackbar>
    </Fragment>
  );
};
export default MainClientes;