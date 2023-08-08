import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Autocomplete, Snackbar, Button, SvgIcon, Container, TextField, CssBaseline, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { BASE_URL, SENDING_EMAIL, APIKEY } from 'constant/constantes';
import { modules, formats } from 'secciones/editor/ToolbarEditor';
import { filtrosContexto } from 'contexts/ProvedorFiltros';
import { emailsContexto } from 'contexts/ProvedorEmails';
import { Link, useNavigate } from "react-router-dom";
import Editor from 'secciones/editor/Editor';
import { useEmails } from 'hooks/useEmails';
import Alerta from 'components/Alerta.js';
import { useQuill } from 'react-quilljs';
import axios from 'axios';

function MainEditor() {

  const navigate = useNavigate();
  const { quill, quillRef } = useQuill({ modules, formats });
  const { emails } = useEmails();

  const [alerta, setAlerta] = useState({
    open: false,
    tipo: 'info',
    mensaje: ''
  });
  let { emailsDatos, setEmailsDatos, refTexto, setRefTexto, setMotivo, motivo, setTextoActual } = useContext(emailsContexto);
  const { resetFiltros, setSelected, firmar, setFirmar } = useContext(filtrosContexto);

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlerta({ ...alerta, open: false, tipo: 'info' });
  }

  /**
   * Abre una alerta personalizable con los datos pasados por parametro.
   * @param {String} mensaje Mensaje personalizado para el mensaje.
   * @param {String} tipo Tipo de alerta que se define como, ['error','warning','info','success'].
   */
  const mensajeAlerta = useCallback((mensaje, tipo) => {
    setAlerta({
      ...alerta,
      open: true,
      tipo: tipo,
      mensaje: mensaje
    })
  }, [alerta])

  const emailsPruebas = [
    {
      email: 'nikolaydiaz.alu@iespacomolla.es',
      name: 'Nikolay'
    },
    {
      email: 'nikolaydiaz@truevaluesoft.com',
      name: 'Niko'
    },
    {
      email: 'ragargut@gmail.com',
      name: 'Rafa'
    },
    {
      email: 'rafa@truevaluesoft.com',
      name: 'Rafa'
    },
    {
      email: 'design@truevaluesoft.com',
      name: 'Rafa Diseño'
    }
  ]

  const enviarDatos = async () => {

    let caja = document.createElement("div");
    caja.innerHTML += `<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">`;
    caja.innerHTML += refTexto;
    if (firmar) {
      caja.innerHTML += `<img src='${BASE_URL}/images/firma.png' style='width:100%;' alt="pie de firma" />`;
    }
    const { correo, nombreEnvio } = JSON.parse(sessionStorage.getItem('user'));
    const datos = {
      sender: { name: nombreEnvio, email: correo },
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

    if (motivo !== "") {
      try {
        await axios.post(SENDING_EMAIL, datos, cabeceras);
        mensajeAlerta('Correos enviados correctamente', 'success');
        setTimeout(() => {
          navigate("/email")
          setEmailsDatos([]);
          setSelected([]);
          resetFiltros();
          setMotivo('');
          setRefTexto(null);
          setTextoActual(null);
        }, 800);

      } catch (error) {
        console.log(error);
        mensajeAlerta('Error, contacte con el Administrador', 'error');
      }
    } else {
      mensajeAlerta('Añade motivo del correo', 'warning');
    }
  }

  const cambiarTexto = (event, value) => {
    if (value) {
      const { id, titulo, contenido } = value;
      quill.setContents(contenido);
      setMotivo(titulo);
    } else {
      setMotivo('');
      quill.setContents();
    }
  }

  useEffect(() => {
    if (emailsDatos.length === 0) {
      navigate("/email");
    }
  }, [emailsDatos, navigate])

  return (
    <React.Fragment>
      <CssBaseline>
        <Container maxWidth="xl">
          <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link to='/email'>
                <Button startIcon={(
                  <SvgIcon fontSize="small">
                    <KeyboardBackspaceIcon />
                  </SvgIcon>)}
                  sx={{ height: 30 }}
                  size='small'
                  variant='contained'
                  color='error'
                >Atras</Button></Link>
              <Autocomplete
                size='small'
                sx={{ flexGrow: 1, minWidth: '150px' }}
                options={emails}
                getOptionLabel={(option) => option.titulo ?? ''}
                renderInput={(params) => <TextField {...params} label="Tipos de Email" />}
                onChange={cambiarTexto}
              />
            </div>
            <Typography sx={{ marginRight: 5 }} color='#868889' variant="h4">Email Masivo</Typography>
          </div>
          <TextField fullWidth label="Motivo" id="fullWidth" value={motivo} onChange={(event) => {
            setMotivo(event.target.value);
          }} style={{
            marginBlock: '15px'
          }} />
          <Editor
            quill={quill}
            quillRef={quillRef}
            cambiarTexto={cambiarTexto}

          />
          <div style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* <FormControlLabel control={ <Checkbox checked={firmar} onChange={e => setFirmar(e.target.checked)} color='error'/>} label="Firma"/> */}
            <Button sx={{ height: 30 }} size='small' color='error' variant="contained" onClick={enviarDatos}>Enviar</Button>
          </div>
          <Snackbar open={alerta.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity={alerta.tipo} sx={{ width: '100%' }}>
              {alerta.mensaje}
            </Alerta>
          </Snackbar>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
}
; export default MainEditor;