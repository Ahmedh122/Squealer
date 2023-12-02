import './register.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {

  const [inputs, setInputs] = useState(
    {
      username: '',
      email: '',
      password: '',
      name: 'sdf'
    }
  );

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('waiting...');
      await axios.post('http://localhost:8800/api/auth/register', inputs);
      console.log('success');
      Navigate('/');
    } catch (error) {
      setError(error.response.data);
    }

  }
  return (
    <div className='register'>
      <div className='card'>

        <h1 className='welcome'>Welcome!</h1>
      
        <form className='form'>
          
          <input className='text' placeholder='Username' name='username' onChange={handleChange}/>

          <input className='text' type="email" placeholder='Email' name='email' onChange={handleChange}/>
          
          <input className='text' type="password" placeholder='Password' name='password' onChange={handleChange}/>
          {error && error}
          <button className='logbutton' onClick={handleSubmit}>Register</button>
        </form>
        <p className='regtext'>Already have an account? <Link to='/login'><a className='regbutton'>Log in</a></Link></p>
        
      </div>

    </div>
  )
}

export default Register;