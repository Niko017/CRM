import React from 'react';
import SideNav from 'layouts/dashboard/SideNav';
import Grid from '@mui/material/Unstable_Grid2';
import MainEditor from 'main/MainEditor';
import ColoresProvedor from 'contexts/ColoresProvedor';

function PageEditor(){
  return(
    <React.Fragment>
    <ColoresProvedor>
      <Grid container disableEqualOverflow alignItems="center" justifyContent="center" spacing={1}>
        <Grid xs={2}>
          <SideNav/>
        </Grid> 
        <Grid xs={10}>
          <MainEditor/>
        </Grid>
      </Grid>
    </ColoresProvedor>      
  </React.Fragment>
  )
}
export default PageEditor;