import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/Mappe.png";
import Friend from "../../assets/Amici.png";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";


const Share = () => {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="Share">
      <div className="containerShare">
        <div className="topShare">
        <button>Public Squeal</button>
        <button>Channel Squeal</button>
        </div>
        <hr />
        <div className="middleShare">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ?`} />
        </div>
        <hr />
        <div className="bottomShare">
          <div className="leftShare">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="itemShare">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="itemShare">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="itemShare">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="rightShare">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;