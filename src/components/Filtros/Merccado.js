import React, { useContext, useState, useEffect } from 'react';
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

function Mercados() {
  const { select } = useContext(selectContexto);
  const { filtros, setFiltros } = useContext(filtrosContexto);
  const [open, setOpen] = useState(false);
  const [vista, setVista] = useState([]);
  const loading =  open && select.mercados.length === 0;

  const handleChange = (event, value) => {
    const codigos = value.map( valor => valor.Codigo );
    setFiltros(prev => ({...prev,mercados: codigos }));
    setVista(value);
  }

  useEffect(()=>{
    if(filtros.mercados.length === 0){
      setVista([]);
    }
  },[filtros.mercados])

  return (
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
      options={select.mercados}
      disableCloseOnSelect
      renderGroup={option => console.log(option)}
      getOptionLabel={(option) => option.Descripcion }
      renderOption={(props, option, { selected }) => (
        <li  {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.Descripcion}
        </li>
      )}
      style={{ flexGrow: 1, maxWidth: '220px' }}
      renderInput={(params) => (
        <TextField {...params}
        label="Mercados"
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
    />
  );
}export default Mercados;