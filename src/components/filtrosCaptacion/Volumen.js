import React, { useContext, useState } from'react';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';    
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

function Volumen(){
    const { captacion, setCaptacion } = useContext(filtrosContexto);
    const opciones = ['distinto','mayor','menor','exacto'];

    const handleVolumen = event =>  setCaptacion( prev => ({...prev, volumen: event.target.checked}));
    const handleChange = event => setCaptacion( prev => ({...prev,selector: event.target.value}));
    const handleDesde = event => {
        const numero = Number(event.target.value);
        if(numero < 0) return;
        setCaptacion( prev => ({...prev, rango:{...prev.rango, desde: event.target.value}}));
    }
    const handleHasta = event => {
        const numero = Number(event.target.value);
        if(numero < 0) return;
        setCaptacion( prev => ({...prev, rango:{...prev.rango, hasta: event.target.value}}));
    }

    return(
    <React.Fragment>
    <FormControl sx={{ flexShrink:2}}>
        <FormGroup aria-labelledby="estados-label">
            <FormControlLabel control={<Checkbox color='error' checked={captacion.volumen} onChange={handleVolumen}  />} label="Volumen"/>
            {
                captacion.volumen && 
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel color='error' id="select-volumen">Volumen</InputLabel>
                <Select
                color='error'
                labelId="select-volumen"
                value={captacion.selector}
                label="Volumen"
                onChange={handleChange}
            >
                <MenuItem value={''}><em>Nada</em></MenuItem>
                <MenuItem value={"entre"}>Entre</MenuItem>
                <MenuItem value={"distinto"}>Distinto de</MenuItem>
                <MenuItem value={"mayor"}>Mayor o igual</MenuItem>
                <MenuItem value={"menor"}>Menor o igual</MenuItem>
                <MenuItem value={"exacto"}>Exacto</MenuItem>
            </Select>
            </FormControl>
            }

            {
                captacion.selector === "entre" &&
                <FormControl sx={{ m: 1, minWidth: 120, display:'flex', flexDirection:'row' }} size="small">
                <TextField
                    color='error'
                    value={captacion.rango.desde}
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    type='number'
                    label="desde"
                    onChange={handleDesde}
                />
                <TextField
                    color='error'
                    value={captacion.rango.hasta}
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    type='number'
                    label="hasta"
                    onChange={handleHasta}
                />
            </FormControl> 
            }
            {
                opciones.includes(captacion.selector) &&
                <FormControl sx={{ m: 1, minWidth: 120, display:'flex', flexDirection:'row' }} size="small">
                    <TextField
                    color='error'
                    value={captacion.rango.desde}
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    type='number'
                    label="desde"
                    onChange={handleDesde}
                />
                </FormControl>
            }
        </FormGroup>
    </FormControl>
    </React.Fragment>
    )
}export default Volumen;