import axios from "axios";
import { useState, createContext, useEffect } from "react";

const selectContexto = createContext();

function ProvedorSelect (props){
  
  const BASE_URL = "http://localhost:2000";

    const [select,setSelect] = useState({
        codPostal: [],
        actividades: [],
        grupos: [],
        localidades: [],
        mercados: [],
        provincias: [],
        polizas: [],
    });
    const localidades = "/localidades";
    const actividades = "/actividades";
    const codigoPostal = "/codPostal";
    const provincias = "/provincias";
    const mercados = "/mercados";
    const polizas = "/polizas";
    const grupos = "/grupos";

    const cargar = async()=>{
      let urlsObjeto = {
        codPostal: `${BASE_URL}${codigoPostal}`,
        actividades: `${BASE_URL}${actividades}`,
        grupos: `${BASE_URL}${grupos}`,
        localidades: `${BASE_URL}${localidades}`,
        mercados: `${BASE_URL}${mercados}`,
        provincias: `${BASE_URL}${provincias}`,
        polizas: `${BASE_URL}${polizas}`,
      }
      let nuevoObjetoPromesas = Object.keys(urlsObjeto).map(async(objeto) => await axios.post( urlsObjeto[objeto],{estadoAsegurado:2}));
      let claves = Object.keys(urlsObjeto).map(objeto => objeto);
      let resultado = await Promise.allSettled(nuevoObjetoPromesas);
      let nuevoObjeto = {};
      resultado.map((objeto, indice) => nuevoObjeto[claves[indice]] = objeto.value.data);
      setSelect(nuevoObjeto);
      console.log(nuevoObjeto);
    }

      useEffect(()=>{
        cargar();
      },[])

    const datos = {select};


  return(
    <selectContexto.Provider value={datos}>
       {props.children}
    </selectContexto.Provider>
  )
}

export default ProvedorSelect;

export { selectContexto }