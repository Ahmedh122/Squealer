
import './Navbar.css';
import squealerlogo from './img/logo-1.png';
import {Auth} from './Auth';
import { useState } from 'react';
import{Login} from './Login';



export const Navbar =(props) =>{

    const [buttonPopup, setButtonPopup] = useState(false);
    return(
        <div className="Nav">

        <img src={squealerlogo} className="logo-squealer" alt="squealer"/>
        
        <input type="search" className="searchbar" placeholder="Search" />
        
        <button className='log-btn' onClick={() => setButtonPopup(true)}>Log In</button>
        
        <Auth trigger={buttonPopup} setTrigger= {setButtonPopup}>
        </Auth>
        

        </div>

    )


}