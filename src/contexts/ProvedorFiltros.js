import { useState, createContext, useEffect } from "react";

const filtrosContexto = createContext();

function ProvedorFiltros (props){
  const [estadoAsegurado,setEstadoAsegurado] = useState(2);
  const filtrosInital = {
    codPostal: [],
    actividades: [],
    grupos: [],
    localidades: [],
    mercados: [],
    provincias: [],
    polizas: [],
    estadoAsegurado,
  }
  const [filtros,setFiltros] = useState(filtrosInital);

  const resetFiltros = () => {
    setFiltros(filtrosInital);
  }

  const [bdDatos, setBdDatos] = useState([]);
  
  
  const datos = {filtros, setFiltros, estadoAsegurado, setEstadoAsegurado, resetFiltros, setBdDatos, bdDatos};

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