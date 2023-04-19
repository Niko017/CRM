import React from 'react';
import  DashboardLayout  from 'layouts/dashboard/layout';
import MainClientes from 'main/MainClientes';
import { CssBaseline } from '@mui/material';

function PageClientes(){
  return (
  <React.Fragment>
    <DashboardLayout>
      <CssBaseline>
        <MainClientes/>
      </CssBaseline>
    </DashboardLayout>
  </React.Fragment>
  )
}

export default PageClientes;