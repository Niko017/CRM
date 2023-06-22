import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'hooks/useAlert';
import 'Pages/auth/estilos.css';
import Alerta from 'components/Alerta';
import Snackbar from '@mui/material/Snackbar';
import LogoFrancesYGarcia from 'components/svg/LogoFrancesYGarcia';
import IconoCredito from 'components/svg/IconoCredito';
import { BASE_URL } from 'constant/constantes';
import axios from 'axios';
function PageLogin() {

  const { alert, handleErrorClose, mensajeError } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));
    if (username === "" || password === "") {
      mensajeError("Usuario o contraseña vacíos");
      return;
    }
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, { username, password });
      const { token, user } = data;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      navigate('/email');
    } catch (error) {
      mensajeError(error.response.data);
    }
  }
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) navigate('/email');
  }, [])


  return (
    <React.Fragment>
      <div className='general'>
        <div className="background">
          <div className='shape logo-arriba'>
            <IconoCredito />
          </div>
          <div className='shape logo-abajo' >
            <IconoCredito />
          </div>
        </div>
        <form className='formLogin' onSubmit={handleSubmit}>
          <div className='logo'>
            <LogoFrancesYGarcia />
          </div>
          <h3>Inicia Sesión</h3>
          <label className='labelLogin' htmlFor="username">Usuario</label>
          <input name="username" className='inputForm' type="text" placeholder="Username" />
          <label className='labelLogin' htmlFor="password">Contraseña</label>
          <input name='password' className='inputForm' type="password" placeholder="Contraseña" />
          {/*  <Link className='cuenta' to='/register'><span>¿No tienes cuenta? Registrate</span></Link> */}
          <button className='botonLogin'>Iniciar Sesión</button>
        </form>
        <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
          <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alerta>
        </Snackbar>
      </div>
    </React.Fragment>)
} export default PageLogin;