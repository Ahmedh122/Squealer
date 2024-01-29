import './leftbar.css'
import { Link } from 'react-router-dom';
import Impostazioni from "../../assets/Impostazioni.png";
import Amici from "../../assets/Amici.png";
import Eventi from "../../assets/Eventi.png";
import Mappe from "../../assets/Mappe.png";
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import Modal from '../channelpopupcreate/Channelpopupcreate';




const Leftbar = () => {

  const navigate = useNavigate();  // Initialize useNavigate

  const [channelname, setchannelname] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();





  const mutation = useMutation(newChannel => {
    return makeRequest.post("/channels", newChannel).then(res => res.data);
  }, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["channels"]);
      // Redirect to the newly created channel
     // navigate(`/channel/${data.channelname}`, {replace: true}); // Use navigate instead of history.push
      window.location.href = `/channel/${data.channelname}`;
  
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ channelname });
    setchannelname("");
    closePopup();
    
  };




  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

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
          <span style={{ fontSize: "12px" }}>menu 2</span>
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