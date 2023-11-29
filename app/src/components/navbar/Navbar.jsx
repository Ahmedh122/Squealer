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


const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
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
          <img src={currentUser.profilePic} alt="" />
          <Link to={`/profile/${currentUser._id}`} style={{ textDecoration: 'none', color: '#000' }}>
            <span>{currentUser.username}</span>
          </Link>
        </div>
      </div>

    </div>

  )
}

export default Navbar