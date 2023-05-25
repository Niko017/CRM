import React from 'react';
import  DashboardLayout  from 'layouts/dashboard/layout';
import MainClientes from 'main/MainClientes';
import { CssBaseline } from '@mui/material';
import ProvedorFiltros from 'contexts/ProvedorFiltros';
import ProvedorSelect from 'contexts/ProvedorSelects';

function PageClientes(){
  return (
  <React.Fragment>
        <ProvedorSelect>
        <DashboardLayout>
          <CssBaseline>
            <MainClientes/>
          </CssBaseline>
        </DashboardLayout>
      </ProvedorSelect>
  </React.Fragment>
  )
}

export default PageClientes;