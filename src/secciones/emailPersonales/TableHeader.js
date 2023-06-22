import React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


export default function TableHeader(props) {

    const { order, orderBy, onRequestSort } = props;


    const headCells = [
        {
            id: 'numero',
            numeric: true,
            disablePadding: false,
            label: 'Nº',
        },
        {
            id: 'anyo',
            numeric: true,
            disablePadding: false,
            label: 'Año',
        },
        {
            id: 'mes',
            numeric: true,
            disablePadding: false,
            label: 'Mes',
        },
        {
            id: 'asegurado',
            numeric: false,
            disablePadding: false,
            label: 'Asegurado',
        },
        {
            id: 'grupo',
            numeric: false,
            disablePadding: false,
            label: 'Grupo',
        },
        {
            id: 'codPoliza',
            numeric: false,
            disablePadding: false,
            label: 'Código Póliza',
        },
        {
            id: 'fechaFin',
            numeric: false,
            disablePadding: false,
            label: 'Fecha Fin',
        },
        {
            id: 'tipoEmail',
            numeric: false,
            disablePadding: false,
            label: 'Email para enviar',
        },
        {
            id: 'observaciones',
            numeric: false,
            disablePadding: false,
            label: 'Observaciones',
        },
        {
            id: 'comunicado',
            numeric: false,
            disablePadding: false,
            label: '¿OK?',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        }
    ];


    return (
        <React.Fragment>
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={onRequestSort(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </React.Fragment>
    )
}