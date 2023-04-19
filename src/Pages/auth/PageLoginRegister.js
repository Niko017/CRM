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

  return(
    <React.Fragment>
  <h2>Inicio de Sesion</h2>
  <div className="container" ref={contenedor}>
    <div className="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <div className="social-container">
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
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
        <Link to='/'>Saltarse Inicio Sesion</Link>
      </form>
    </div>
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="/">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost" onClick={handleInicioSesion}>
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" onClick={handleRegister}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>

</React.Fragment>)
} export default PageLoginRegister;