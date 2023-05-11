import { useState, createContext } from "react";

const filtrosContexto = createContext();

function ProvedorFiltros (props){    

    const [filtros,setFiltros] = useState({
        codPostal: [],
        actividades: [],
        grupos: [],
        localidades: [],
        mercados: [],
        provincias: [],
        polizas: [],
    });

    const datos = {filtros, setFiltros};


  return(
    <filtrosContexto.Provider value={datos}>
       {props.children}
    </filtrosContexto.Provider>
  )
}

export default ProvedorFiltros;

export { filtrosContexto }