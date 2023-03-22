import MUIDataTable from "mui-datatables";
import users from '../data/datos.json';
import { createTheme, ThemeProvider } from '@mui/material/styles'; //../../@mui/material/styles
import React from "react";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default class Table extends React.Component {
   
    render() {
      
        const columns = [
            {
                name:"nombre",
                label: "Nombre"        
            },
            {
                name:"apellidos",
                label: "Apellidos"        
            },
            {
                name:"email",
                label:"Correo"
            }
        ]
        const options = {
            filter: true,
            selectableRows: 'multiple',
            filterType: 'dropdown',
            responsive: 'vertical',
            rowsPerPage: 10,
          };
          
        return (
            <ThemeProvider theme={darkTheme}>
                <MUIDataTable 
                title={"Lista de usuarios"}
                data={users}
                columns={columns}
                options={options}
                />
            </ThemeProvider>
        )
    }
}