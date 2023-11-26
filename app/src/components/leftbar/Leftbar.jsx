import './leftbar.css'
import { Link } from 'react-router-dom';
import Impostazioni from "../../assets/Impostazioni.png";
import Amici from "../../assets/Amici.png";
import Eventi from "../../assets/Eventi.png";
import Mappe from "../../assets/Mappe.png";


const Leftbar = () => {
  return (
    <div className='leftbar'>
      <div className='container'>
        <div className="menu">
          <div className="item">
            <img src={Impostazioni} alt="" />
            <span>Impostazioni</span>
          </div>
          <div className="item">
            <img src={Amici} alt="" />
            <span>Amici</span>
          </div>
          <div className="item">
            <img src={Eventi} alt="" />
            <span>Eventi</span>
          </div>
          <div className="item">
            <img src={Mappe} alt="" />
            <span>Mappe</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span style={{fontSize:"12px"}}>menu 2</span>
          <div className="item">
            <img src={Impostazioni} alt="" />
            <span>Impostazioni</span>
          </div>
          <div className="item">
            <img src={Amici} alt="" />
            <span>Amici</span>
          </div>
          <div className="item">
            <img src={Eventi} alt="" />
            <span>Eventi</span>
          </div>
          <div className="item">
            <img src={Mappe} alt="" />
            <span>Mappe</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar