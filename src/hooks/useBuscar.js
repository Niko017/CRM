import { useContext, useEffect, useState } from 'react';
import { useSearchCustomers } from 'hooks/useSearchCustomers';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';

export function useBuscar() {
  const [search, setSearch] = useState("");
  const { setBdDatos, filtros, captacion } = useContext(filtrosContexto);
  useSearchCustomers({ search });

  const handleChange = event => {
    setSearch(event.target.value);
  }

  const handleSearch = async () => {
    let filtrosBuenos = { ...filtros }
    let codPostalNum = filtrosBuenos.codPostal.map(num => Number(num));
    filtrosBuenos = { ...filtrosBuenos, codPostal: codPostalNum }
    try {
      let datos = Object.assign(captacion, filtrosBuenos);
      if (datos.rango.desde === "" && datos.rango.hasta === "") {
        datos = { ...datos, rango: { desde: 0, hasta: 0 } }
      }
      const cabecera = {
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      }
      let respuesta = await axios.post(`${BASE_URL}/filtrar`, datos, cabecera);
      setBdDatos(respuesta.data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSearch();
  }, [filtros, captacion])

  return { handleChange, search, handleSearch }
}