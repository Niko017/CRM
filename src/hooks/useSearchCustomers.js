import { useCallback, useEffect, useContext } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import datos from 'data/datos.json';


export function useSearchCustomers({ search }){

    const { setEmpleados } = useContext(emailsContexto);
    /**
   * Busca en todos los valores de cada objeto y devuelve las coincidencias.
   */
  const buscarDatos = useCallback(async(search)=>{
    return await datos.filter(objeto =>  Object.keys(objeto).some( clave => String(objeto[clave]).toLocaleLowerCase().includes(search.toLocaleLowerCase())) )
  },[]) 
  
  useEffect(()=>{
    let datos = buscarDatos(search);
    datos.then(
      datos => setEmpleados(datos)
    )
  },[search]);

  return {  }
}