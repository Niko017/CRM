import React, { useContext, useEffect, useState } from 'react';
import FormGroup  from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { filtrosContexto } from 'contexts/ProvedorFiltros';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';    

function FechaProspeccion(){
    ///////////BOTON CAPTACION////////////////
    const { captacion , setCaptacion } = useContext(filtrosContexto);

    const handleCaptacion = (event) => {
        let checked = event.target.checked;
        setCaptacion(prev => ({...prev, prospeccion: checked}));
    };
    ///////////FIN BOTON CAPTACION////////////////
    //TODO: Hacer lo mismo con el otro calendario.
    const handleDateDesde = date => {
        let fecha = dayjs(date).format('DD/MM/YYYY')
    };


    return(
    <FormControl sx={{ flexShrink:2}}>
    <FormGroup aria-labelledby="estados-label">
       
      <FormControlLabel control={<Checkbox checked={captacion.prospeccion} onChange={handleCaptacion}  />} label="Fecha de Prospección"/>
      {captacion.prospeccion && 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker',]}>
        <DemoItem label="Desde">
          <DatePicker onChange={handleDateDesde} format="DD/MM/YYYY" />
        </DemoItem>
        <DemoItem label="Hasta">
          <DatePicker format="DD/MM/YYYY" />
        </DemoItem>

      </DemoContainer>
    </LocalizationProvider>  }


      

    </FormGroup>
  </FormControl>
    )
}export default FechaProspeccion;