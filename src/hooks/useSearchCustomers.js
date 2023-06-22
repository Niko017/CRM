import { useEffect, useContext } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { filtrosContexto } from 'contexts/ProvedorFiltros';


export function useSearchCustomers({ search }) {

  const { setEmpleados } = useContext(emailsContexto);
  const { bdDatos } = useContext(filtrosContexto);

  // Busca en todos los valores de cada objeto y devuelve las coincidencias.
  const buscarDatos = (search) => {
    return bdDatos.filter(objeto => Object.keys(objeto).some(clave => String(objeto[clave]).toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  };

  useEffect(() => {
    let datos = buscarDatos(search);
    setEmpleados(datos);
  }, [search]);

  useEffect(() => {
    setEmpleados(buscarDatos(''));
  }, [bdDatos]);
}