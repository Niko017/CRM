import React, { useContext } from 'react';
import Editor from 'components/Editor';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import { emailsContexto } from 'contexts/ProvedorEmails';

function MainEditor(){

  

  const { emailsDatos, refTexto, setMotivo } = useContext(emailsContexto);



  console.log(emailsDatos);

    return (
      <Container maxWidth="xl">
      <FormControl>
        <TextField fullWidth label="titulo" id="fullWidth" onChange={(event)=>{
          setMotivo(event.target.value);
        }}/>
        <Editor/>
      </FormControl>
      </Container>
    );
}

export default MainEditor;