import React from 'react';
import  DashboardLayout  from 'layouts/dashboard/layout';
import { CssBaseline } from '@mui/material';
import ProvedorSelect from 'contexts/ProvedorSelects';
import MainPlantillaEmails from 'main/MainPlantillasEmails';

function PagePlantillasEmail(){
  return (
  <React.Fragment>
        <ProvedorSelect>
        <DashboardLayout>
          <CssBaseline>
            <MainPlantillaEmails />
          </CssBaseline>
        </DashboardLayout>
      </ProvedorSelect>
  </React.Fragment>
  )
}

export default PagePlantillasEmail;