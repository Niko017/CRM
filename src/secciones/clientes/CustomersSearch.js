import React , { useState }  from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useSearchCustomers } from 'hooks/useSearchCustomers';

function CustomersSearch(){

  const [search,setSearch] = useState("");

  const handleChange = event =>{
    setSearch(event.target.value);
  }
  
  useSearchCustomers({search}); 

  return(
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      fullWidth
      value={search}
      onChange={handleChange}
      placeholder="Maria Rodrigu..., 6452..., pepe@gmail..."
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