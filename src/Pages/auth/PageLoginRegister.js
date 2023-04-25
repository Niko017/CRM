import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import 'Pages/auth/estilos.css';

function PageLoginRegister(){

  const contenedor = useRef(null);

  const handleRegister = ()=>{
    contenedor.current.classList.add("right-panel-active");
  }

  const handleInicioSesion = ()=>{
    contenedor.current.classList.remove("right-panel-active");
  }

  const handleSubmitRegister = (event)=>{
    event.preventDefault()
    const datos = Object.fromEntries(new FormData(event.target))
    console.log(datos);
  }

  return(
    <React.Fragment>
  <h2>Inicio de Sesion</h2>
  <div className="container" ref={contenedor}>
    {/* ////////CONTENEDOR DE REGISTRO////////////// */}
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmitRegister}>
        <h1>Crear Cuenta</h1>
        <div style={{margin:'10px 0px'}} className="social-container">
          <a href="/" className="social">
            <FacebookIcon htmlColor='#3b5998'/>
          </a>
          <a href="/" className="social">
            <GoogleIcon htmlColor='#DB4437' />
          </a>
          <a href="/" className="social">
            <LinkedInIcon htmlColor='#0e76a8'/>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" name='user' placeholder="Usuario" />
        <input type="email" name='email' placeholder="Email" /> 
        <input type="password" name='pass' placeholder="Password" />
        <input type="password" name='passConfirm' onPaste={(event)=>{event.preventDefault()}} placeholder='Confirmar Contraseña'/>
        <button type='submit' style={{margin:'10px 0px'}}>Registrarse</button>
        <Link to='/'>Saltarse Inicio Sesion</Link>
      </form>
    </div>
    {/* ///////////////FIN CONTENEDOR REGISTRO ///////////// */}
    {/* ///////////////CONTENEDOR DE INICIO DE SESION/////// */}
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Inicio Sesión</h1>
        <div className="social-container">
          <a href="/" className="social">
            <FacebookIcon htmlColor='#3b5998'/>
          </a>
          <a href="/" className="social">
            <GoogleIcon htmlColor='#DB4437'/>
          </a>
          <a href="/" className="social">
            <LinkedInIcon htmlColor='#0e76a8'/>
          </a>
        </div>
        <span>o usa tu cuenta</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Link to="/">¿Has olvidado la contraseña?</Link>
        <button>Sign In</button>
      </form>
    </div>
    {/* ////////////FIN CONTENEDOR INICIO DE SESION///////// */}
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Bienvenid@ de Nuevo!</h1>
          <p>Inicia sesion para volver a la plataforma</p>
          <button className="ghost" onClick={handleInicioSesion}>
            Iniciar Sesion
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hola, Bienvenid@</h1>
          <p>Registrate para insgresar en nuestra plataforma </p>
          <button className="ghost" onClick={handleRegister}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>

</React.Fragment>)
} export default PageLoginRegister;