import { useState, createContext, useEffect } from "react";
import dayjs from 'dayjs';

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
    estadoAsegurado: 2,
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
    resetFiltros,
    setBdDatos,
    bdDatos,
    selected,
    setSelected,
    captacion,
    setCaptacion,
  };

  useEffect(()=>{
    setFiltros(prev =>  ({...prev,codPostal: [],
      actividades: [],
      grupos: [],
      localidades: [],
      mercados: [],
      provincias: [],
      polizas: []}))
    },[filtros.estadoAsegurado])

  useEffect(()=>{
    setSelected([]);
  },[filtros,captacion])


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