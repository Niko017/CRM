import React, { useContext, useEffect, useState } from 'react';
import FormGroup  from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { selectContexto } from 'contexts/ProvedorSelects';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import  CircularProgress  from '@mui/material/CircularProgress';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function Prioridad(){
    ///////////BOTON CAPTACION////////////////
    const { captacion , setCaptacion } = useContext(filtrosContexto);

    const handleCaptacion = (event) => {
        let checked = event.target.checked;
        setCaptacion(prev => ({...prev, prioridad: checked}));
    };
    ///////////FIN BOTON CAPTACION////////////////

    const { select } = useContext(selectContexto);
    const [open, setOpen] = useState(false);
    const [vista, setVista] = useState([]);
    const loading =  open && select.agentes.length === 0;


    const handleChange = (event, value) => {
        const codigos = value.map( valor => valor.Codigo );
        setCaptacion(prev => ({...prev,agentes: codigos }));
        setVista(value);
    }

    useEffect(()=>{
        if(captacion.agentes.length === 0){
        setVista([]);
        }
    },[captacion.agentes]);


    return(
    <FormControl sx={{ flexShrink:2}}>
    <FormGroup aria-labelledby="estados-label">
       
      <FormControlLabel value={2} control={<Checkbox checked={captacion.prioridad} onChange={handleCaptacion}  />} label="Prioridad Alta"/>
      {captacion.prioridad && 
      <Autocomplete
        size='small'
        multiple
        open={open}
        onOpen={()=> setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        id="checkboxes-tags-demo"
        noOptionsText={'Sin Opciones'}
        value={vista}
        onChange={handleChange}
        options={select.agentes}
        disableCloseOnSelect
        getOptionLabel={(option) => option.Usuario }
        renderOption={(props, option, { selected }) => (
          <li  {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.Usuario}
          </li>
        )}
        style={{ flexGrow: 1, maxWidth: '220px', minWidth: '220px'}}
        renderInput={(params) => (
          <TextField {...params}
          label="Agentes"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
              {loading ? <CircularProgress color="primary" size={20} /> : null}
              {params.InputProps.endAdornment}
              </>
            ),
          }}/>
        )}
      /> }
    </FormGroup>
  </FormControl>
    )
}export default Prioridad;