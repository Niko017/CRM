import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useBuscar } from 'hooks/useBuscar';

function CustomersSearch(){
  const { search, handleChange } = useBuscar();

  return(
    <>
  <Card sx={{ p: 2, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
    <OutlinedInput
      fullWidth
      value={search}
      onChange={handleChange}
      placeholder="reformas pep..., murci..., pepe@gmail..."
      color='error'
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500, height:30 }}
    />
  </Card>
  </>)
  }; export default CustomersSearch;