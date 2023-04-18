import React from 'react';
import  DashboardLayout from 'layouts/dashboard/layout';
import MainEditor from 'main/MainEditor';


function PageEditor(){
  return(
    <React.Fragment>
      <DashboardLayout>
        <MainEditor/>
      </DashboardLayout> 
  </React.Fragment>
  )
}
export default PageEditor;