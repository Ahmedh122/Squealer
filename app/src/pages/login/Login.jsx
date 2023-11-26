import './login.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';

const Login = () => {
  const {login} = useContext(AuthContext);
  const handleLogin = () => {
    login();
  }
  return (
    <div className='login'>
      <div className='card'>

        <h1 className='welcome'>Welcome!</h1>
      
        <form className='form'>
          
          <input className='text' type="email" placeholder='Email'/>
          
          <input className='text' type="password" placeholder='Password'/>
         
          <button className='logbutton' onClick={handleLogin}>Login</button>
          
        </form>
        
        <p>Don't have an account? <Link to='/register'><a className='regbutton'>Sign up</a></Link></p>
        
      </div>

    </div>
  )
}

export default Login;