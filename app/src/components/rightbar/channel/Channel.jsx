import "./channel.css";
import { Link } from "react-router-dom";

const Channel = ({ channel }) => {
  return (
    <div className="userRB">
      <div className="userInfoRB">
        
        <img src="" alt="" />
        <p>
            <Link
                to={`/channel/${channel.channelname}`}
                style={{ textDecoration: "none", color: "inherit" }}
            > 
          <span>{channel.channelname}</span>
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Channel;
