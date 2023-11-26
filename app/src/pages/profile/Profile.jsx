import "./profile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useQuery } from "react-query";
import {makeRequest} from "../../axios";
import { useLocation } from "react-router";

const Profile = () => {

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { currentUser } = useContext(AuthContext);
  const { isLoading, data } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  console.log(data);

  return (
    <div className="Profile">
      {isLoading ? ( "loading...") :
      ( <>
      <div className="imagesProfile">
        <img
          src={data.coverPic}
          alt=""
          className="coverProfile"
        />
        <img
          src={data.profilePic}
          alt=""
          className="profilePicProfile"
        />
      </div>
      <div className="profileContainerProfile">
        <div className="uInfoProfile">
          <div className="leftProfile">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="centerProfile">
            <span>{data.username}</span>
            <div className="infoProfile">
              <div className="itemProfile">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="itemProfile">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="rightProfile">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts/>
      </div>
      </>
    )};
    </div>
  );
};

export default Profile;