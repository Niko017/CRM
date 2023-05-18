import { useState, createContext, useEffect } from "react";
import dayjs from 'dayjs';

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

  const captacionInit = {
    prioridad: false,
    agentes: [],
    volumen:false,
    selector: "",
    rango: {
      desde: 0,
      hasta: 0,
    },
    prospeccion:false,
    fecha: {
      desde: '',
      hasta: '',
    },
  }

  const [filtros,setFiltros] = useState(filtrosInital);
  const [bdDatos, setBdDatos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [captacion, setCaptacion] = useState(captacionInit);

  const resetSeleccion = () => {
    if(!captacion.prioridad){
      setCaptacion(prev => ({...prev, agentes:[]}))
    }
    if(!captacion.volumen){
      setCaptacion(prev => ({...prev, selector:"", rango: {desde: 0, hasta: 0}}))
    }
    if(!captacion.prospeccion){
      setCaptacion(prev => ({...prev, fecha: {desde: dayjs().format('DD/MM/YYYY'), hasta:dayjs().format('DD/MM/YYYY')}}));
    }
  }

  const resetFiltros = () => {
    setFiltros(filtrosInital);
    setCaptacion(captacionInit);
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
  },[estadoAsegurado]);

  useEffect(()=>{
    resetSeleccion();
  },[captacion.prioridad, captacion.volumen, captacion.prospeccion]);

  return(
    <filtrosContexto.Provider value={datos}>
       {props.children}
    </filtrosContexto.Provider>
  )
}

export default ProvedorFiltros;

export { filtrosContexto }