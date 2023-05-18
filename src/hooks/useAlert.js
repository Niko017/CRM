import { useState,useRef } from'react';

export function useAlert(){

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: ""
    });

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert(prev => ({...prev,open: false}));
    }
    
    const mensajeAdvertencia = (message) => {
        setAlert(prev => ({...prev,open: true, message, type: "warning"}));
    }
    const mensajeError = (message) => {
        setAlert(prev => ({...prev,open: true, message, type: "error"}));
    }
    const mensajeInfo = (message) => {
        setAlert(prev => ({...prev,open: true, message, type: "info"}));
    }
    const mensajeConfirmacion = (message) => {
        setAlert(prev => ({...prev,open: true, message, type: "success"}));
    }

    return { alert, handleErrorClose, mensajeAdvertencia, mensajeError, mensajeInfo, mensajeConfirmacion }

}