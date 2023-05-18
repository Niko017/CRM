import { useContext, useEffect, useState }  from 'react';
import { useSearchCustomers } from 'hooks/useSearchCustomers';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import axios from 'axios';
import { useAlert } from './useAlert';

export function useBuscar(){
    const BASE_URL = "http://localhost:2000";
    const [search,setSearch] = useState("");
    const { setBdDatos, filtros, resetFiltros, captacion } = useContext(filtrosContexto);
    useSearchCustomers({search});
    
    const handleChange = event =>{
      setSearch(event.target.value);
    }
    
    const { mensajeError, mensajeConfirmacion } = useAlert();
    const validarDatosCaptacion = () => {
      if(captacion.prioridad && captacion.agentes.length === 0){
        mensajeError("Debes seleccionar al menos un agente");
        return false;
      }
      if(captacion.prospeccion && captacion.fecha.desde === "" && captacion.fecha.hasta === ""){
        mensajeError("Debes seleccionar dos fechas");
        return false;
      }
      return true;
    }
  
    const handleSearch = async() => {
      let filtrosBuenos = {...filtros}
      let codPostalNum = filtrosBuenos.codPostal.map( num => Number(num) );
      filtrosBuenos = {...filtrosBuenos,codPostal:codPostalNum}
      try{
        let datos = Object.assign(captacion,filtrosBuenos);
        if(datos.rango.desde=== "" && datos.rango.hasta=== ""){
          datos = {...datos,rango:{desde:0,hasta:0}}
        }
        let respuesta = await axios.post(`${BASE_URL}/filtrar`,datos);
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