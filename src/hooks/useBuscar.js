import { useContext, useEffect, useState }  from 'react';
import { useSearchCustomers } from 'hooks/useSearchCustomers';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import axios from 'axios';

export function useBuscar(){
    const BASE_URL = "http://localhost:2000";
    const [search,setSearch] = useState("");
    const { setBdDatos, filtros, resetFiltros } = useContext(filtrosContexto);
    useSearchCustomers({search});
  
    const handleChange = event =>{
      setSearch(event.target.value);
    }
  
    const handleSearch = async() => {
      let filtrosBuenos = {...filtros}
      let codPostalNum = filtrosBuenos.codPostal.map( num => Number(num) );
      filtrosBuenos = {...filtrosBuenos,codPostal:codPostalNum}
      try{
        let respuesta = await axios.post(`${BASE_URL}/filtrar`,filtrosBuenos);
        setBdDatos(respuesta.data);
        resetFiltros();
      }catch(error){
        console.error(error)
      }
    }
  
    useEffect(()=>{
      handleSearch();
    },[])

    return { handleChange, search, handleSearch}
}