import "./channel.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router";
import React, { useState } from "react";
import Modal from "../../components/channelpopupmod/Channelpopupmod";

const Channel = () => {
  const channelname = useLocation().pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["channelName"], () =>
    makeRequest.get("/channels/find/" + channelname).then((res) => {
      return res.data;
    })
  );

  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const { isLoading: rIsLoading, data: subscriptionData } = useQuery(
    ["subscription"],
    () =>
      makeRequest.get("/subscriptions?channelname=" + channelname).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (subscribed) => {
      if (subscribed)
        return makeRequest.delete("/subscriptions?channelname=" + channelname);
      return makeRequest.post("/subscriptions", { channelname });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["subscription"]);
      },
    }
  );

  const handleFollow = () => {
    console.log(subscriptionData.includes(currentUser._id));
    mutation.mutate(subscriptionData.includes(currentUser._id));
  };

  return (
    <div className="Channel">
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <div className="imagesChannel">
            <img src="" alt="" className="coverChannel" />
            <img src="" alt="" className="profilePicChannel" />
          </div>
          <div className="profileContainerChannel">
            <div className="uInfoChannel">
              <div className="leftChannel">
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
              <div className="centerChannel">
                <span>{data.channelname}</span>
                <div className="infoChannel">
                  <div className="itemChannel">
                    <PlaceIcon />
                    <span>USA</span>
                  </div>
                  <div className="itemChannel">
                    <LanguageIcon />
                    <span>lama.dev</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : (
                  < button onClick={handleFollow}>
                {subscriptionData && subscriptionData.includes(currentUser._id)
                  ? "Following"
                  : "Follow"}
              </button>
                )}
                {showPopup && (
                  <div className="popup">
                    <span>ciao</span>
                    <button onClick={closePopup}>Close</button>
                  </div>
                )}
              </div>
              <div className="rightChannel">
                <EmailOutlinedIcon />
                <MoreVertIcon />
                <Modal />
              </div>
            </div>
            <Posts />
          </div>
        </>
      )}
      ;
    </div>
  );
};

export default Channel;
