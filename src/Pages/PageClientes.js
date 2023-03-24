import React from 'react';
//import Layout from 'layouts/dashboard/layout';
import MainClientes from 'main/MainClientes';
import SideNav from 'layouts/dashboard/SideNav';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

function PageClientes(){
  return (
  <React.Fragment>
    <Grid container disableEqualOverflow alignItems="center" justifyContent="center" spacing={1}>
      <Grid xs={2}>
        <SideNav/>
      </Grid>
      <Grid xs={10}>
        <MainClientes/>
      </Grid>
    </Grid>      
  </React.Fragment>
  )
}
export default PageClientes;