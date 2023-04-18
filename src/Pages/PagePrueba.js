import React, { useContext, useEffect, useState } from 'react';
import { emailsContexto } from 'contexts/ProvedorEmails';
import ColoresProvedor from 'contexts/ColoresProvedor';
import TextField from '@mui/material/TextField';
import SideNav from 'layouts/dashboard/SideNav';
import Grid from '@mui/material/Unstable_Grid2';
import Alerta from 'components/Alerta.js';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button'
import Editor from 'editor/Editor';
import axios from 'axios';

function PagePrueba() {

  const navigate = useNavigate();
  const url  = 'https://api.sendinblue.com/v3/smtp/email';
  const apiKey = process.env.REACT_APP_API_KEY;
  const [alerta,setAlerta] = useState({
    open:false,
    tipo: 'info',
    mensaje:''
  });
  let {emailsDatos, refTexto, setMotivo, motivo} = useContext(emailsContexto);

  const handleErrorClose = (event, reason)=>{
    if (reason === 'clickaway') {
        return;
      }
      setAlerta({...alerta,open:false,tipo:'info'});
}

/**
 * Abre una alerta personalizable con los datos pasados por parametro.
 * @param {String} mensaje Mensaje personalizado para el mensaje.
 * @param {String} tipo Tipo de alerta que se define como, ['error','warning','info','success'].
 */
  const mensajeAlerta = (mensaje,tipo)=>{
    setAlerta({...alerta,
        open:true,
        tipo:tipo,
        mensaje:mensaje})
  }

  const enviarDatos = async()=>{

    let caja = document.createElement("div");
    caja.innerHTML+=`<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">`;
    caja.innerHTML+=refTexto;
    caja.firstElementChild.setAttribute("contenteditable","false");

    const datos = {
    sender: {name: 'Maria', email: 'maria85@gmail.com'},
    to: emailsDatos.map((correo)=>{
        return {
          email: correo,
          name: correo,
        }
    }),
    textContent: caja.outerHTML,
    subject: motivo,
    }
    const cabeceras = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': `${apiKey}`
      }
    }

    if(motivo!==""){
      try {
        await axios.post(url,datos,cabeceras);
        mensajeAlerta('Correos enviados correctamente','success');
      }catch(error){
        console.log(error);
        mensajeAlerta('Error, contacte con el Administrador','error');
      }
    }else{
      mensajeAlerta('Añade motivo del correo','warning');
    }

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
        <TextField fullWidth label="Motivo" id="fullWidth" onChange={(event)=>{
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
    <Snackbar open={alerta.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
      <Alerta onClose={handleErrorClose} severity={alerta.tipo} sx={{ width: '100%' }}>
        {alerta.mensaje}
      </Alerta>
    </Snackbar>   

    </React.Fragment>
  );
} export default PagePrueba;