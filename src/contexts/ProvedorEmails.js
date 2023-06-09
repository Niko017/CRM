import { useState, createContext } from "react";

const emailsContexto = createContext();

function ProvedorEmails (props){    

    const [emailsDatos, setEmailsDatos] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [refTexto,setRefTexto] = useState(null);
    const [motivo,setMotivo] = useState("");
    const [textoActual, setTextoActual] = useState(null);

    const datos = {
      emailsDatos,
      setEmailsDatos,
      refTexto,
      setRefTexto,
      motivo,
      setMotivo,
      empleados,
      setEmpleados,
      textoActual,
      setTextoActual
    };
  return(
    <emailsContexto.Provider value={datos}>
       {props.children}
    </emailsContexto.Provider>
  )
}

export default ProvedorEmails;

export {emailsContexto }