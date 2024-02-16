import "./profile.css";
import React from "react";

const Profile = ({ profile }) => {
  const redirectToProfile = (profilename) => {
    window.location.href = `/profile/${profilename}`;
  };

  return (
    <div className="userRB">
      {profile && (
        <>
          <div
            style={{cursor : "pointer"}}
            className="userInfoRB"
            onClick={() => redirectToProfile(profile._id)}
          >
            <img src={"/upload/" + profile.profilePic} alt="" />
            <p>{profile.username}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
