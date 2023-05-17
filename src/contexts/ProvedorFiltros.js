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
  const [captacion, setCaptacion] = useState({
    prioridad: false,
    agentes: [],
    prospeccion:false,
    volumen:false,
    selector: "",
    rango: {
      desde: 0,
      hasta: 0,
    },
    fecha: {
      desde: '',
      hasta: '',
    },
  });

  const resetFiltros = () => {
    setFiltros(filtrosInital);
  }
  
  const datos = {
    filtros,
    setFiltros,
    estadoAsegurado,
    setEstadoAsegurado,
    resetFiltros,
    setBdDatos,
    bdDatos,
    selected,
    setSelected,
    captacion,
    setCaptacion,
  };

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