import React, { useState, createContext } from "react";

const emailsContexto = createContext();

function ProvedorEmails (props){    

    const [emailsDatos, setEmailsDatos] = useState([]);
    const [refTexto,setRefTexto] = useState(null);
    const [motivo,setMotivo] = useState("");

    const datos = {emailsDatos, setEmailsDatos, refTexto, setRefTexto, motivo,setMotivo};


  return(
    <emailsContexto.Provider value={datos}>
       {props.children}
    </emailsContexto.Provider>
  )
}

export default ProvedorEmails;

export {emailsContexto }