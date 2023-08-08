import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, FormGroup, MenuItem, Snackbar, Typography } from '@mui/material'
import axios from 'axios';
import Alerta from 'components/Alerta.js';
import { BASE_URL } from 'constant/constantes';
import { useAlert } from 'hooks/useAlert';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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

export default function MainUsuarios() {

    const caja = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = useState(false)
    const { alert, handleErrorClose, mensajeAdvertencia, mensajeError, mensajeInfo, mensajeConfirmacion } = useAlert()

    const cargarUsuarios = async () => {
        try {
            const cabecera = {
                headers: {
                    Authorization: sessionStorage.getItem('token'),
                }
            }
            const { data } = await axios.get(`${BASE_URL}/allUsers`, cabecera);
            setUsuarios(data);
        } catch (error) {
            mensajeError(error.message);
        }
    }

    const roles = [
        {
            value: 'ventas',
            label: 'Notificador de Ventas',
        },
        {
            value: 'emails',
            label: 'Marketing Masivo',
        },
        {
            value: 'admin',
            label: 'Administracion',
        },
        {
            value: 'avisador',
            label: 'AD Mailing',
        },
    ]

    useEffect(() => {
        cargarUsuarios();
    }, [])

    return (
        <>

            <Typography textAlign='center' sx={{ marginY: 1 }} color='#868889' variant="h4">Usuarios</Typography>
            <Container sx={{ marginY: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 5 }}>
                    <Button onClick={() => setOpen(true)} variant='contained' color='error' >Añadir usuario</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="center">Username</StyledTableCell>
                                <StyledTableCell align="center">Nombre</StyledTableCell>
                                <StyledTableCell align="center">Correo</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map((user) => (
                                <StyledTableRow key={user.idUsuario}>
                                    <StyledTableCell component="th" scope="row">
                                        {user.idUsuario}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{user.usuario}</StyledTableCell>
                                    <StyledTableCell align="center">{user.nombreEnvio}</StyledTableCell>
                                    <StyledTableCell align="center">{user.correo}</StyledTableCell>
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
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box sx={caja}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Nombre" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Apellidos" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Genero" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth type='date' label="Fecha Nacimento" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Departamento" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Rol" variant="outlined" >
                                    {roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid alignSelf='flex-end' item xs={12}>
                                <Button variant='contained' color='error' onClick={() => setOpen(false)}>Guardar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}