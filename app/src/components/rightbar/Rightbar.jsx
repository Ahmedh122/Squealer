import "./rightbar.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Channels from "../rightbar/channels/Channels";
import Profiles from "../rightbar/profiles/Profiles";

const RightBar = () => {



  return (
    <div className="rightBar">
      <div className="containerRB">
        <div className="itemRB">
          <span>Your channels</span>
          <Channels/>
        </div>
        <div className="itemRB">
          <span>Your friends</span>
          <Profiles/>
        </div>
      </div>
    </div>
  );
};

export default RightBar;