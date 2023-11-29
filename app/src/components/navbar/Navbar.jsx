import './navbar.css'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import voltyImage from './volty.png'
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';


  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


const Navbar = () => {




  const userId = useLocation().pathname.split("/")[2];
  const { data } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  return (
    <div className='Navbar'>
      <div className='leftside'>
        <div className='leftside2'>
          <img src={voltyImage} alt="" />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span>Squealer</span>
          </Link>
        </div>
        <HomeIcon />
        <DarkModeIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search...' />
        </div>
      </div>
      <div className='rightside'>
        <SettingsIcon />
        <div className="user">
          <img src={data.profilePic} alt="" />
          <Link to={`/profile/${data._id}`} style={{ textDecoration: 'none', color: '#000' }}>
            <span>{data.username}</span>
          </Link>
        </div>
      </div>

    </div>

  )
}

export default Navbar