import {useState, useContext} from 'react';
import {Login} from "./Login" ;
import {Register} from "./Register";
import React from 'react';
import './Auth.css';


export const Auth =(props)=>{
    const [currentForm , setCurrentForm] = useState('login'); 
    const toggleForm = (formName) =>{
        setCurrentForm(formName);
    }


   

return(props.trigger) ? (

  <div className="popup">
    <div className="popup-inner">
    <button className="close-button" onClick={()=> props.setTrigger(false)}>close</button>
            {props.children}
            {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  />
      
      }
    </div>


  </div>
     

): "";


}