import { Button, FormControlLabel, Paper, Switch, TextField, ToggleButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import TablePerso from 'secciones/emailPersonales/TablePerso';
import dayjs from 'dayjs';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { APIKEY } from 'constant/constantes';
import { SENDING_EMAIL } from 'constant/constantes';

function MainEmailPerso() {

    const [filtrado, setFiltrado] = useState({
        mes: 1,
        anyo: 0,
        realizada: false
    })
    const [clientes, setClientes] = useState([]);
    const [edit, setEdit] = useState(false);

    const handleMonth = (date) => {
        const mesNumero = dayjs(date).month() + 1;
        setFiltrado(prev => ({ ...prev, mes: mesNumero }));
    }

    const handleYear = (date) => {
        const anyoNumero = dayjs(date).year();
        setFiltrado(prev => ({ ...prev, anyo: anyoNumero }));
    }

    const handleRealizada = (event) => {
        setFiltrado(prev => ({ ...prev, realizada: event.target.checked }));
    }

    const cargarEmailsPersonales = async () => {
        const { data } = await axios.post(`${BASE_URL}/emailsPersonales`, filtrado);
        setClientes(data)
    }

    const handleEdit = () => {
        cargarEmailsPersonales();
        setEdit(prev => !prev);
    }


    const envioEmail = async (nombre, email) => {

        const { correo, nombreEnvio } = JSON.parse(sessionStorage.getItem('user'));

        const datos = {
            sender: { name: nombreEnvio, email: correo },
            to: [
                {
                    email,
                    name: nombre,
                }
            ],
            textContent: `<p>Estimados ${nombre},&nbsp;</p><p>Recordamos que el día 25 vence el plazo para la declaración de ventas.</p><p>Les solicitamos, por favor, sean puntuales para las mismas, ya que la no declaración es motivo suficiente para el rehúse de los avisos de insolvencia.</p><p>Por favor tened en cuenta que las ventas a crédito se declaran en el apartado "asegurables" y que las "no asegurables" deben declararse en su apartado correspondiente según motivo.</p><p>Gracias y un cordial saludo,</p><p>&nbsp;</p><p><span style="color: rgb(230, 0, 0);">***Horario del 15/06 al 15/09: Lunes a Jueves de 08:00 a 15:00 y Viernes de 8:00 a 14:00***</span></p>`,
            subject: 'Declaracion de ventas',
        }
        const cabeceras = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': `${APIKEY}`
            }
        }
        await axios.post(SENDING_EMAIL, datos, cabeceras);


    }

    const enviarEmail = () => {
        let emails = clientes.filter(cliente => {
            if (cliente.email !== null && cliente.email !== " " && cliente.email !== "")
                return cliente
        });
        let indice = 0;
        console.log(emails);
        let interval = setInterval(() => {
            if (indice < emails.length) {
                envioEmail(emails[indice].asegurado, emails[indice].email);
                indice += 1;
            } else {
                clearInterval(interval);
            }
        }, 1500)
    }

    useEffect(() => {
        cargarEmailsPersonales();
    }, [filtrado]);

    return (
        <React.Fragment>
            <Paper elevation={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            disableFuture
                            label={'Mes'}
                            views={['month']}
                            format='MMMM'
                            onChange={handleMonth}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            disableFuture
                            label={'Año'}
                            views={['year']}
                            format='YYYY'
                            onChange={handleYear}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            disableFuture
                            label={'Seleccione Fecha'}
                            views={['year', 'month', 'day']}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormControlLabel control={<Switch color='error' onChange={handleRealizada} />} label="realizado" />
                        <ToggleButton
                            color={edit ? 'error' : 'standard'}
                            value="edit"
                            selected={edit}
                            onChange={handleEdit}
                        >
                            <EditIcon />
                        </ToggleButton>
                        {
                            filtrado.realizada ||
                            <Button onClick={enviarEmail} color='error' endIcon={<SendIcon />}>Enviar</Button>
                        }
                    </DemoContainer>
                </LocalizationProvider>
            </Paper>
            <TablePerso
                clientes={clientes}
                edit={edit} />
        </React.Fragment>
    )
}; export default MainEmailPerso;