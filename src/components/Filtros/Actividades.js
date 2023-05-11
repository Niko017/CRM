import React, { useContext, useState } from 'react';
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

function Actividades() {
  const { select } = useContext(selectContexto);
  const {filtros, setFiltros } = useContext(filtrosContexto);
  const [open, setOpen] = useState(false);
  const loading =  open && select.actividades.length === 0;

  //TODO: SOLO PASAR LOS CODIGOS.
  const handleChange = (event, value)=>{

    setFiltros(prev => ({...prev,actividades: value }));
  }
  return (
    <Autocomplete
      multiple
      open={open}
      onOpen={()=> setOpen(true)}
      onClose={() => setOpen(false)}
      loading={loading}
      id="checkboxes-tags-demo"
      value={filtros.actividades}
      onChange={handleChange}
      options={select.actividades}
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
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params}
        label="Actividades"
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
}export default Actividades;