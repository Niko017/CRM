import React from 'react';
import  DashboardLayout  from 'layouts/dashboard/layout';
import MainClientes from 'main/MainClientes';
import { CssBaseline } from '@mui/material';
import ProvedorFiltros from 'contexts/ProvedorFiltros';
import ProvedorSelect from 'contexts/ProvedorSelects';

function PageClientes(){
  console.log("Problems hiunton")
  return (
  <React.Fragment>
    <ProvedorSelect>
      <ProvedorFiltros>
        <DashboardLayout>
          <CssBaseline>
            <MainClientes/>
          </CssBaseline>
        </DashboardLayout>
      </ProvedorFiltros>
    </ProvedorSelect>
  </React.Fragment>
  )
}

export default PageClientes;