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

function CodPostal() {
  const { select } = useContext(selectContexto);
  const {filtros, setFiltros } = useContext(filtrosContexto);
  const [open, setOpen] = useState(false);
  const loading =  open && select.codPostal.length === 0;
  const handleChange = (event, value)=>{
    setFiltros(prev => ({...prev,codPostal:value}));
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
      value={filtros.codPostal}
      onChange={handleChange}
      options={select.codPostal}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
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
      style={{flexGrow: 1 , maxWidth: '220px'}}
      renderInput={(params) => (
        <TextField {...params}
        label="Código Postal"
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
}export default CodPostal;