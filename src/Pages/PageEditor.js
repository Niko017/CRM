import React from 'react';
import  DashboardLayout from 'layouts/dashboard/layout';
import MainEditor from 'main/MainEditor';
import { CssBaseline } from '@mui/material';
import ProvedorFiltros from 'contexts/ProvedorFiltros';


function PageEditor(){
  return(
    <React.Fragment>
      <DashboardLayout>
        <CssBaseline>
          <MainEditor/>
        </CssBaseline>
      </DashboardLayout>
  </React.Fragment>
  )
}
export default PageEditor;