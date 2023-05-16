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
  const [bdDatos, setBdDatos] = useState([]);
  const [selected, setSelected] = useState([]);

  const resetFiltros = () => {
    setFiltros(filtrosInital);
  }
  
  const datos = {filtros, setFiltros, estadoAsegurado, setEstadoAsegurado, resetFiltros, setBdDatos, bdDatos, selected, setSelected};

  useEffect(()=>{
    setSelected([]);
  },[bdDatos])

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