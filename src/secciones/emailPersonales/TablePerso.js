import React, { useState } from 'react';
import { usePagination } from 'hooks/use-pagination';
import { useOrder } from 'hooks/use-order';
import TableHeader from 'secciones/emailPersonales/TableHeader';
import { Box, Button, Card, Checkbox, Table, TableBody, TableCell, TablePagination, TableRow, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';

export default function TablePerso(props) {
    const { clientes, edit } = props;


    const datosPrueba = [
        {
            idDeclaracion: 21823,
            anyo: 2023,
            mes: 5,
            asegurado: "ABR Surface Technologies SLU (ABRASIVOS ALICANTE, S.L.U)",
            grupo: null,
            codPoliza: "147446",
            fechaFin: "2023-09-30T00:00:00.000Z",
            realizada: false,
            envioEmail: true,
            codEmail: 4,
            codAsegurado: 26740,
            email: "ADMINISTRACION@ABRASIVOSALICANTE.COM",
            idPoliza: 11843,
            nombreMes: "January",
            observaciones: null
        },
        {
            idDeclaracion: 21808,
            anyo: 2023,
            mes: 5,
            asegurado: "ABRASIVOS MOLINA,SL",
            grupo: null,
            codPoliza: "150278",
            fechaFin: "2023-08-31T00:00:00.000Z",
            realizada: false,
            envioEmail: true,
            codEmail: 4,
            codAsegurado: 554,
            email: "abrasivosmolina@abrasivosmolina.com",
            idPoliza: 11827,
            nombreMes: "January",
            observaciones: null
        },
    ]
    const count = clientes.length;
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = usePagination();
    const { order, orderBy, createSortHandler, visibleRows } = useOrder({ items: clientes, page, rowsPerPage });

    const transformarFechaEuropea = (fechaOriginal) => {
        const fecha = new Date(fechaOriginal);
        const anyo = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        const fechaEuropea = `${dia}-${mes}-${anyo}`;
        return fechaEuropea;
    }

    const handleActulizar = async (event, id) => {
        const observacion = event.target.previousSibling.value;

        await axios.post(`${BASE_URL}/actualizarObservacion`, { id, observacion })

    }

    return (
        <Card sx={{ padding: 2 }}>
            <Box sx={{ minWidth: 800 }}>
                <Table
                    size={'small'}>
                    <TableHeader
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={createSortHandler}
                    />
                    <TableBody>
                        {visibleRows.length !== 0 ?
                            visibleRows.map((customer, indice) => {
                                const fecha = transformarFechaEuropea(customer.fechaFin);
                                return (
                                    <TableRow
                                        hover
                                        key={customer.idDeclaracion}
                                    >
                                        <TableCell>{indice + 1}</TableCell>
                                        <TableCell>{customer.anyo ?? ''}</TableCell>
                                        <TableCell>{customer.mes ?? ''}</TableCell>
                                        <TableCell>{customer.asegurado}</TableCell>
                                        <TableCell>{customer.grupo ?? 'Sin Grupo'}</TableCell>
                                        <TableCell>{customer.idPoliza ?? 'Sin Poliza'}</TableCell>
                                        <TableCell>{fecha}</TableCell>
                                        <TableCell>{customer.codEmail}</TableCell>
                                        {edit ?
                                            <TableCell><textarea style={{ resize: 'vertical' }} defaultValue={customer.observaciones}></textarea>
                                                <Button onClick={(event) => handleActulizar(event, customer.idDeclaracion)} variant='outlined'>Actualizar</Button>
                                            </TableCell> :
                                            <TableCell>{customer.observaciones ?? ''}</TableCell>}
                                        <TableCell><Checkbox color='error' checked={customer.realizada} /></TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                    </TableRow>
                                );
                            }) :
                            <TableRow><TableCell colSpan={11} style={{ textAlign: 'center' }}>Sin Resultados</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[10, 25, 50, 100, count]}
                labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count} filas`}
                labelRowsPerPage="Filas por página"
            />
        </Card>
    )
}