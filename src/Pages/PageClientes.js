import React from 'react';
import  DashboardLayout  from 'layouts/dashboard/layout';
import MainClientes from 'main/MainClientes';

function PageClientes(){
  return (
  <React.Fragment>
    <DashboardLayout>
      <MainClientes/>
    </DashboardLayout>
  </React.Fragment>
  )
}

export default PageClientes;