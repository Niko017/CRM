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
                        <Button color='error' endIcon={<SendIcon />}>Enviar</Button>
                    </DemoContainer>
                </LocalizationProvider>
            </Paper>
            <TablePerso
                clientes={clientes}
                edit={edit} />
        </React.Fragment>
    )
}; export default MainEmailPerso;