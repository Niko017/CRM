import React , { useContext, useEffect, useState }  from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { emailsContexto } from 'contexts/ProvedorEmails';
import datos from 'data/datos.json';

function CustomersSearch(){

  const [value,setValue] = useState("");

  const { setEmpleados } = useContext(emailsContexto);

  const handleChange = event =>{
    setValue(event.target.value);
  }

  /**
   * Busca en todos los valores de cada objeto y devuelve las coincidencias.
   */
  const buscarDatos = async()=>{
    return await datos.filter( objeto =>  Object.keys(objeto).some( clave => String(objeto[clave]).includes(value)) )
  }

  useEffect(()=>{
    let datos = buscarDatos();
    datos.then(
      datos => setEmpleados(datos)
    )
    
  },[value])

  return(
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      fullWidth
      value={value}
      onChange={handleChange}
      placeholder="Buscador empleados..."
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>)
  }; export default CustomersSearch;