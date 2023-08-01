import { useState } from 'react';

export function useAlert() {

    const TYPES_ALERTS = {
        ALERTA: 'warning',
        ERROR: 'error',
        INFORMATIVO: 'info',
        CONFIRMACION: 'success',
    }

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: ""
    });

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert(prev => ({ ...prev, open: false }));
    }

    const mensajeAdvertencia = (message) => {
        setAlert(prev => ({ ...prev, open: true, message, type: TYPES_ALERTS.ALERTA }));
    }
    const mensajeError = (message) => {
        setAlert(prev => ({ ...prev, open: true, message, type: TYPES_ALERTS.ERROR }));
    }
    const mensajeInfo = (message) => {
        setAlert(prev => ({ ...prev, open: true, message, type: TYPES_ALERTS.INFORMATIVO }));
    }
    const mensajeConfirmacion = (message) => {
        setAlert(prev => ({ ...prev, open: true, message, type: TYPES_ALERTS.CONFIRMACION }));
    }

    return { alert, handleErrorClose, mensajeAdvertencia, mensajeError, mensajeInfo, mensajeConfirmacion }

}