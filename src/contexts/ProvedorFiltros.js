import { useState, createContext, useEffect } from "react";

const filtrosContexto = createContext();

function ProvedorFiltros (props){
  
  const filtrosInital = {
    codPostal: [],
    actividades: [],
    grupos: [],
    localidades: [],
    mercados: [],
    provincias: [],
    polizas: [],
  }
  const [filtros,setFiltros] = useState(filtrosInital);

  const [estadoAsegurado,setEstadoAsegurado] = useState(2);

  const resetFiltros = () => {
    setFiltros(filtrosInital);
  }
  
  const datos = {filtros, setFiltros, estadoAsegurado, setEstadoAsegurado, resetFiltros};

  useEffect(()=>{
    resetFiltros();
  },[estadoAsegurado])

  return(
    <filtrosContexto.Provider value={datos}>
       {props.children}
    </filtrosContexto.Provider>
  )
}

export default ProvedorFiltros;

export { filtrosContexto }