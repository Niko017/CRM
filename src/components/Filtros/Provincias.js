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

function Provincias() {
  const { select } = useContext(selectContexto);
  const { filtros, setFiltros } = useContext(filtrosContexto);
  const [open, setOpen] = useState(false);
  const loading =  open && select.provincias.length === 0;

  const handleChange = (event, value) => {
    setFiltros(prev => ({...prev,provincias: value }));
  }

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
      value={filtros.provincias}
      onChange={handleChange}
      options={select.provincias}
      disableCloseOnSelect
      renderGroup={option => console.log(option)}
      getOptionLabel={(option) => option }
      renderOption={(props, option, { selected }) => (
        <li  {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ flexGrow: 1, maxWidth: '220px' }}
      renderInput={(params) => (
        <TextField {...params}
        color='error'
        label="Provincias"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
            {loading ? <CircularProgress color="error" size={20} /> : null}
            {params.InputProps.endAdornment}
            </>
          ),
        }}/>
      )}
    />
  );
}export default Provincias;