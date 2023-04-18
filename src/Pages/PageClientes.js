import React from 'react';
//import Layout from 'layouts/dashboard/layout';

import SideNav from 'layouts/dashboard/SideNav';
import SideNav2 from 'layouts/dashboard/side-nav';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import MainClientes from 'main/MainClientes';

function PageClientes(){
  return (
  <React.Fragment>
    <Grid container disableEqualOverflow alignItems="center" justifyContent="center" spacing={1}>
      <Grid xs={2}>
        <SideNav2/>
      </Grid>
      <Grid xs={10}>
        <MainClientes/>
      </Grid>
    </Grid>
  </React.Fragment>
  )
}
export default PageClientes;