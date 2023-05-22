import React, { useState } from "react";
import './Auth.css';


export const Register = (props) => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password , name);
    }

    return (
        
        <div className="auth-form-container">
            <h2>Register</h2>
          
        <form className="register-form" onSubmit={handleSubmit}>

            <label>Name</label>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="name" placeholder="your name" id="name" name="name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)}type="password" placeholder="********" id="password" name="password" />
            <button type="submit" className="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() =>props.onFormSwitch('login')}>Already have an Account ? Sign In here</button>
    </div>
    )
}