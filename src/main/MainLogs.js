import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Snackbar, Typography } from '@mui/material'
import axios from 'axios';
import Alerta from 'components/Alerta.js';
import { BASE_URL } from 'constant/constantes';
import { useAlert } from 'hooks/useAlert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function MainLogs() {

    const [logs, setLogs] = useState([]);
    const { alert, handleErrorClose, mensajeAdvertencia, mensajeError, mensajeInfo, mensajeConfirmacion } = useAlert()

    const cargarUsuarios = async () => {
        try {
            const cabecera = {
                headers: {
                    Authorization: sessionStorage.getItem('token'),
                }
            }
            const { data } = await axios.get(`${BASE_URL}/logs`, cabecera);
            setLogs(data);
        } catch (error) {
            mensajeError(error.message);
        }
    }

    useEffect(() => {
        cargarUsuarios();
    }, [])

    return (
        <>
            <Typography textAlign='center' sx={{ marginY: 1 }} color='#868889' variant="h4">Usuarios</Typography>
            <Container sx={{ marginY: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">ID</StyledTableCell>
                                <StyledTableCell align="center">Nombre</StyledTableCell>
                                <StyledTableCell align="center">Correo</StyledTableCell>
                                <StyledTableCell align="center">Fecha</StyledTableCell>
                                <StyledTableCell align="center">Hora</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.length === 0 ?
                                <TableRow><TableCell colSpan={5} style={{ textAlign: 'center' }}>Sin Resultados</TableCell></TableRow> :
                                logs.map((user) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell align="center">{user.id}</StyledTableCell>
                                        <StyledTableCell align="center">{user.nombre}</StyledTableCell>
                                        <StyledTableCell align="center">{user.correo}</StyledTableCell>
                                        <StyledTableCell align="center">{user.fecha}</StyledTableCell>
                                        <StyledTableCell align="center">{user.hora}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                    <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alerta>
                </Snackbar>
            </Container>
        </>
    )
}