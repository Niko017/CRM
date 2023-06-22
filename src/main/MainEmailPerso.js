import { FormControlLabel, Paper, Switch, TextField } from '@mui/material';
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
    const [clientes, setClientes] = useState([])

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
                        <FormControlLabel control={<Switch onChange={handleRealizada} />} label="realizado" />
                    </DemoContainer>
                </LocalizationProvider>
            </Paper>
            <TablePerso
                clientes={clientes} />
        </React.Fragment>
    )
}; export default MainEmailPerso;