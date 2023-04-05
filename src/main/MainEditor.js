import React, { useRef } from 'react';
import Editor from 'components/Editor';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';

function MainEditor(){

  let refConcept = useRef(null);

  const enviarDatos=({emails})=>{

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        sender: {name: 'Pepe', email: 'nikolaydiaz.alu@iespacomolla.es'},
        to: emails.map((correo)=>{
          return {
              email: correo,
              name: correo,
          }
        }),
        textContent: 'mensaje HTML',
        subject: refConcept.current.textContent,
      })
    }

  // console.log(document.getElementById("concepto").value);    
  // fetch('https://api.sendinblue.com/v3/smtp/email', options)
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));

  }

    return (
      <Container maxWidth="xl">
      <FormControl onSubmit={enviarDatos}>
        <TextField fullWidth label="titulo" id="fullWidth" ref={refConcept}/>
        <Editor/>
      </FormControl>
      </Container>
    );
}

export default MainEditor;