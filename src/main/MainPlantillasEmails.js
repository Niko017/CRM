import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import ToolbarEditor, { modules, formats } from 'secciones/editor/ToolbarEditor';
import { Autocomplete, Button, ButtonGroup, Container, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { useAlert } from 'hooks/useAlert';
import Alerta from 'components/Alerta'
import Snackbar from '@mui/material/Snackbar';
import { useEmails } from 'hooks/useEmails';

function MainPlantillaEmails() {

    const emailInital = {
        id: 0,
        titulo: '',
        contenido: '',
    }
    const { emails, setEmails, cargarEmails } = useEmails();
    const [select, setSelect] = useState(false);
    const [email, setEmail] = useState(emailInital);
    const { quill, quillRef } = useQuill({ modules, formats });
    const { alert, handleErrorClose, mensajeAdvertencia, mensajeError, mensajeInfo, mensajeConfirmacion } = useAlert();

    const gaurdarDatos = async () => {
        const contenido = quill.getContents();
        const { data } = await axios.put(`${BASE_URL}/email/${email.id}`, { titulo: email.titulo, contenido: contenido });
        cargarEmails();
        mensajeConfirmacion(data);
    }
    const cambiarTexto = (event, value) => {
        if (value) {
            const { id, titulo, contenido } = value;
            setEmail(prev => ({ ...prev, id: id, titulo: titulo, contenido: contenido }));
            quill.setContents(contenido);
            setSelect(true);
        } else {
            setEmail(emailInital);
            quill.setContents();
            setSelect(false)
        }
    }
    //Mirar para actualizar
    const cargarUltimo = async () => {
        let emailId = emails[emails.length - 1].id;
        const { data } = await axios.get(`${BASE_URL}/email/${emailId}`);
        cambiarTexto('__', data);
    };

    const crearNuevo = async () => {
        const contenido = quill.getContents();
        const { data } = await axios.post(`${BASE_URL}/newEmail`, { titulo: email.titulo, contenido: contenido });
        mensajeConfirmacion(data);
        cargarEmails();
    }
    const eliminar = async () => {
        const { data } = await axios.delete(`${BASE_URL}/email/${email.id}`);
        setEmail(emailInital);
        setEmails([])
        quill.setContents();
        cargarEmails();
        mensajeConfirmacion(data)
    }



    return (
        <React.Fragment>
            <Container>
                <div style={{ display: 'flex', gap: 50 }}>
                    <Autocomplete
                        sx={{ flexGrow: 1, maxWidth: '150px' }}
                        options={emails}
                        getOptionLabel={(option) => option.titulo ?? ''}
                        renderInput={(params) => <TextField {...params} label="Tipos de Email" />}
                        onChange={cambiarTexto}
                    />
                    {
                        select ?
                            <ButtonGroup>
                                <Button size='small' color='error' variant="contained" onClick={gaurdarDatos}>Guardar</Button>
                                <Button size='small' color='error' variant="contained" onClick={eliminar}>Eliminar</Button>
                            </ButtonGroup> :
                            <Button size='small' color='error' variant="contained" onClick={crearNuevo}>Crear Email</Button>
                    }
                </div>

                <TextField
                    label='titulo'
                    value={email.titulo}
                    onChange={(event) => setEmail(prev => ({ ...prev, titulo: event.target.value }))}
                    fullWidth
                    sx={{ marginY: 1 }}
                />
                <div className="text-editor">
                    <ToolbarEditor />
                    <div ref={quillRef} />
                </div>
            </Container>
            <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alerta>
            </Snackbar>
        </React.Fragment>
    )
} export default MainPlantillaEmails;