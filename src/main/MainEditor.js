import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SENDING_EMAIL, APIKEY } from 'constant/constantes';
import { emailsContexto } from 'contexts/ProvedorEmails';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Editor from 'secciones/editor/Editor';
import Alerta from 'components/Alerta.js';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import { Checkbox, FormControlLabel } from '@mui/material';
import { BASE_URL } from 'constant/constantes';

function MainEditor() {

  const navigate = useNavigate();

  const [alerta,setAlerta] = useState({
    open:false,
    tipo: 'info',
    mensaje:''
  });
  let {emailsDatos, setEmailsDatos, refTexto, setRefTexto, setMotivo, motivo, setTextoActual} = useContext(emailsContexto);
  const { resetFiltros, setSelected, firmar, setFirmar } = useContext(filtrosContexto);

  const handleErrorClose = (event, reason)=>{
    if (reason === 'clickaway') return;
      setAlerta({...alerta,open:false,tipo:'info'});
}

/**
 * Abre una alerta personalizable con los datos pasados por parametro.
 * @param {String} mensaje Mensaje personalizado para el mensaje.
 * @param {String} tipo Tipo de alerta que se define como, ['error','warning','info','success'].
 */
  const mensajeAlerta = useCallback((mensaje,tipo)=>{
    setAlerta({...alerta,
        open:true,
        tipo:tipo,
        mensaje:mensaje})
  },[alerta])

  const emailsPruebas = [
    {
      email: 'nikolaydiaz.alu@iespacomolla.es',
      name:'Nikolay'
    },
    {
      email:'nikolaydiaz@truevaluesoft.com',
      name:'Niko'
    },
    {
      email:'ragargut@gmail.com',
      name:'Rafa'
    },
    {
      email:'rafa@truevaluesoft.com',
      name:'Rafa'
    },
    {
      email:'design@truevaluesoft.com',
      name:'Rafa Diseño'
    }
  ]

  const enviarDatos = async()=>{

    let caja = document.createElement("div");
    caja.innerHTML+=`<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">`;
    caja.innerHTML+=refTexto;
    if(firmar){
       caja.innerHTML+=`<img src='${BASE_URL}/images/firma.png' style='width:100%;' alt="pie de firma" />`;
    }
    const { correo, nombreEnvio } =  JSON.parse(sessionStorage.getItem('user'));
    const datos = {
    sender: {name: nombreEnvio, email: correo},
    to: emailsDatos.map((correo) => {
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
        'api-key': `${APIKEY}`
      }
    }

    if(motivo!==""){
      try {
        await axios.post(SENDING_EMAIL,datos,cabeceras);
        mensajeAlerta('Correos enviados correctamente','success');
        setTimeout(() =>{
          navigate("/email")
          setEmailsDatos([]);
          setSelected([]);
          resetFiltros();
          setMotivo('');
          setRefTexto(null);
          setTextoActual(null);
        }, 800);

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
        navigate("/email");
    }
  },[emailsDatos, navigate])

  return (
    <React.Fragment>
      <CssBaseline>
        <Container maxWidth="xl">
          <Link to='/email'>
          <Button startIcon={(              
          <SvgIcon fontSize="small">
            <KeyboardBackspaceIcon/>
          </SvgIcon>)} sx={{height:30}} size='small' variant='contained' color='error'>Atras</Button></Link>
        <TextField fullWidth label="Motivo" id="fullWidth" value={motivo} onChange={(event)=>{
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
                {/* <FormControlLabel control={ <Checkbox checked={firmar} onChange={e => setFirmar(e.target.checked)} color='error'/>} label="Firma"/> */}
                <Button sx={{height:30}} size='small' color='error' variant="contained" onClick={enviarDatos}>Enviar</Button>
          </div>
      <Snackbar open={alerta.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
        <Alerta onClose={handleErrorClose} severity={alerta.tipo} sx={{ width: '100%' }}>
          {alerta.mensaje}
        </Alerta>
      </Snackbar>
      </Container>
      </CssBaseline>
    </React.Fragment>
  );
} 
;export default MainEditor;