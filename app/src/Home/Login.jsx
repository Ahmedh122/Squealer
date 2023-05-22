import React,  { useState , useContext} from "react";
import './Auth.css';

export const Login = (props) => {
    const [email , setEmail] = useState('');
    const [password, setPassword] =useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }
    return (
        <div className="auth-form-container">
            <h2>Log In</h2>
            
            <form className="login-form" onSubmit={handleSubmit}>
               
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" className="submit">Log In</button>
            </form>
            <button className="link-btn"onClick={()=>props.onFormSwitch('register')}>Don't have an Account? Register here.</button>
        </div>
    ) ;
}