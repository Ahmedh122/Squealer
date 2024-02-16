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
import { makeRequest } from "../../axios";
import { useLocation } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import Modal from "../../components/channelpopupcreate/Channelpopupcreate";
import Share from "../../components/share/Share";
import Predit from "../../components/profileEdit/Profileedit";


const Profile = () => {

  const userId = useLocation().pathname.split("/")[2];
  console.log("userId",userId);

  const { currentUser } = useContext(AuthContext);
  console.log("currentUser",currentUser);
  const { isLoading, data } = useQuery(["usersprofile"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      console.log("res",res.data);
      return res.data;
    })
  );


  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    console.log(relationshipData.includes(currentUser._id));
    mutation.mutate(relationshipData.includes(currentUser._id));
  };

  //console.log(data);

  return (
    <div className="Profile">
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <div className="imagesProfile">
            <img
              src={`/upload/${data.coverPic}`}
              alt=""
              className="coverProfile"
            />
            <img src={`/upload/${data.profilePic}`} alt="" className="profilePicProfile" />
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
                {rIsLoading ? (
                  "loading"
                ) : (
                  <>
                    {userId !== currentUser._id && (
                      <button onClick={handleFollow}>
                        {relationshipData.includes(currentUser._id)
                          ? "Following"
                          : "Follow"}
                      </button>
                    )}
                  </>
                )}
                {userId === currentUser._id && <Predit />}
              </div>
              <div className="rightProfile">
                <EmailOutlinedIcon />
                <MoreVertIcon />
                {userId === currentUser._id && <Modal />}
              </div>
            </div>
            <Share Idreciver={userId} />
            <Posts userId={userId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;