import React, { useState } from'react';
import { useNavigate } from 'react-router-dom';
import 'Pages/auth/estilos.css';
import { useAlert } from 'hooks/useAlert';
import Alerta from 'components/Alerta';
import Snackbar from '@mui/material/Snackbar';
import LogoFrancesYGarcia from 'components/svg/LogoFrancesYGarcia';
import IconoCredito from 'components/svg/IconoCredito';
import { BASE_URL } from 'constant/constantes';
import axios from 'axios';
function PageRegister(){

  const { alert, handleErrorClose, mensajeError, mensajeConfirmacion } = useAlert();
  const [verNormas, setverNormas] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, password, password2 } = Object.fromEntries(new FormData(e.target));
    if(username === "" || password === ""){ 
      mensajeError("Usuario o contraseña vacíos");
      return;
    }

    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password)){
        mensajeConfirmacion("Correcto")
    }else{
        mensajeError("Contraseña Invalida");
        setverNormas(true);
        setTimeout(() => {
            setverNormas(false);
        }, 5000)
    }

    if(password !== password2){
        mensajeError("Las contraseñas no coinciden");
        return;
    }

    try{
      const { data } = await axios.post(`${BASE_URL}/register`, { username, password });
      mensajeConfirmacion(data);
      setTimeout(() => {
        navigate('/login');
      },1200)
    }catch(error){
      mensajeError(error.response.data);
    }
  }


  return(
  <React.Fragment>
  <div className='general'>
    <div className="background">
      <div className='shape logo-arriba'>
        <IconoCredito/>
      </div>
      <div className='shape logo-abajo' >
        <IconoCredito />
      </div>
    </div>
    <form className='formLogin' style={ verNormas ? { height: 600}: {height: 500}} onSubmit={handleSubmit}>
      <div className='logo'>
        <LogoFrancesYGarcia/>
      </div>
      <h3>Registrarse</h3>
     {verNormas && <div className='normas-container'>
        <span>La contraseña debe tener minimo:</span>
        <ul className='normas-lista'>
            <li>1 Minuscula</li>
            <li>1 Mayuscula</li>
            <li>1 Digito o Número</li>
            <li>Mínimo de 6 letras</li>
        </ul>
      </div>}
      <label className='labelLogin' htmlFor="username">Usuario</label>
      <input name="username" className='inputForm' type="text" placeholder="Username"/>
      <label className='labelLogin' htmlFor="password">Contraseña</label>
      <input name='password' className='inputForm' type="password" placeholder="Contraseña"/>
      <label className='labelLogin' htmlFor="password">Repetir Contraseña</label>
      <input name='password2' className='inputForm' type="password" placeholder="Contraseña"/>
      <button className='botonLogin'>Registrarse</button>
    </form>
    <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
        <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
        </Alerta>
    </Snackbar>
  </div>

</React.Fragment>)
} export default PageRegister;