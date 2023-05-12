import React , { useContext, useState }  from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useSearchCustomers } from 'hooks/useSearchCustomers';
import { filtrosContexto } from 'contexts/ProvedorFiltros';

function CustomersSearch({ activo }){
  const [search,setSearch] = useState("");
  const { filtros, estadoAsegurado, resetFiltros } = useContext(filtrosContexto);
  useSearchCustomers({search})

  const handleChange = event =>{
    setSearch(event.target.value);
  }
  //TODO:Acabar de Comprobar filtros y hacer pruebas.
  const handleSearch = () => {
    let filtrosBuenos = {...filtros}
    let codPostalNum = filtrosBuenos.codPostal.map( num => Number(num) );
    filtrosBuenos = {...filtrosBuenos,codPostal:codPostalNum}
    console.log(filtrosBuenos)
  }

  return(
  <Card sx={{ p: 2, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
    <OutlinedInput
      fullWidth
      value={search}
      onChange={handleChange}
      placeholder="Paula Rodrigu..., 6452..., pepe@gmail..."
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
    { activo && <Button onClick={handleSearch} variant='contained' sx={{marginRight:'20px', height:'40px'}} >Buscar</Button>}
  </Card>)
  }; export default CustomersSearch;