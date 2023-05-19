import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LogoGoogle from 'components/svg/LogoGoogle';
import 'Pages/auth/estilos.css';

function PageLoginRegister(){


  return(
  <React.Fragment>
  <div className='general'>
    <div className="background">
    <div className="shape" />
    <div className="shape" />
    </div>
    <form>
      <h3>Login Here</h3>
      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Email or Phone" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" />
      <button>Log In</button>
      <div className="social">
        <div className="go">
          <i className="fab fa-google" /> Google
        </div>
        <div className="fb">
          <i className="fab fa-facebook" /> Facebook
        </div>
      </div>
    </form>
  </div>

</React.Fragment>)
} export default PageLoginRegister;