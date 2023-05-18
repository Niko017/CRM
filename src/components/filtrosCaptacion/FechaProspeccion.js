import React, { useContext, useEffect, useRef, useState } from 'react';
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
    //TODO: Arreglar estilos con el current estado.
    const estilado1 = useRef(null);

    const handleCaptacion = (event) => {
        let checked = event.target.checked;
        setCaptacion(prev => ({...prev, prospeccion: checked}));
    };
    ///////////FIN BOTON CAPTACION////////////////
    const handleDateDesde = date => {
        let desde = dayjs(date).format('DD/MM/YYYY');
        setCaptacion(prev => ({...prev, fecha: { ...prev.fecha, desde }}));
    };

    const handleDateHasta = date => {
        let hasta = dayjs(date).format('DD/MM/YYYY');
        setCaptacion(prev => ({...prev, fecha: { ...prev.fecha, hasta }}));
    };

    useEffect(()=>{
      setCaptacion(prev => ({...prev, fecha: { desde: dayjs().format('DD/MM/YYYY'), hasta: dayjs().format('DD/MM/YYYY') }}));
    },[]);

    return(
    <FormControl sx={{ flexShrink:2}}>
    <FormGroup aria-labelledby="estados-label">
       
      <FormControlLabel control={<Checkbox checked={captacion.prospeccion} onChange={handleCaptacion}  />} label="Fecha de Prospección"/>
      {captacion.prospeccion && 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{display:'flex',flexDirection:'row'}}>
        <div style={{flexGrow:1}}>
          <DemoItem label="Desde">
            <DatePicker ref={estilado1} views={['year', 'month', 'day']} label={'dia, mes, año'} onChange={handleDateDesde} format="DD/MM/YYYY" defaultValue={dayjs()}/>
          </DemoItem>
        </div>
        <div style={{flexGrow:1}}>
          <DemoItem label="Hasta">
            <DatePicker views={['year', 'month', 'day']} label={'dia, mes, año'} onChange={handleDateHasta} format="DD/MM/YYYY" defaultValue={dayjs()}/>
          </DemoItem>
        </div>

      </DemoContainer>
    </LocalizationProvider>  }


      

    </FormGroup>
  </FormControl>
    )
}export default FechaProspeccion;