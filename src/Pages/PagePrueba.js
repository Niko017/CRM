import React, { useContext, useEffect } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import ColoresProvedor from 'contexts/ColoresProvedor';
import TextField from '@mui/material/TextField';
import SideNav from 'layouts/dashboard/SideNav';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Editor from 'editor/Editor';
import axios from 'axios';

function PagePrueba() {

  const navigate = useNavigate();
  let {emailsDatos, refTexto, setMotivo, motivo} = useContext(emailsContexto);

  const enviarDatos = async()=>{

    const url  = 'https://api.sendinblue.com/v3/smtp/email';

    const datos = {
    sender: {name: 'Maria', email: 'maria85@gmail.com'},
    to: emailsDatos.map((correo)=>{
        return {
          email: correo,
          name: correo,
        }
    }),
    textContent: refTexto,
    subject: motivo,
    }
    const cabeceras = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      }
    }

    let respuesta = await axios.post(url,datos,cabeceras);
    console.log(respuesta);
    console.log(respuesta);
  }

    useEffect(()=>{
    if(emailsDatos.length===0){
        navigate("/");
    }
  },[emailsDatos])

  return (
    <React.Fragment>
          <ColoresProvedor>
      <Grid container disableEqualOverflow alignItems="center" justifyContent="center" spacing={1}>
        <Grid xs={2}>
          <SideNav/>
        </Grid> 
        <Grid xs={10}>
          
        <TextField fullWidth label="titulo" id="fullWidth" onChange={(event)=>{
          setMotivo(event.target.value); 
        }} style={{
          marginBlock: '15px'
        }} />
        <Editor/>
        <div style={{
                marginTop:'30px',
                display:'flex',
                justifyContent:'center'
            }}>
                <Button variant="contained" onClick={enviarDatos}>Enviar</Button>
        </div>
        </Grid>
      </Grid>
    </ColoresProvedor>    

    </React.Fragment>
  );
} export default PagePrueba;