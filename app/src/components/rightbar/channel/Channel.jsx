import "./channel.css";
import React from "react";

const Channel = ({ channel }) => {
  const redirectToChannel = (channelname) => {
    window.location.href = `/channel/${channelname}`;
  };

  return (
    <div className="userRB">
      {channel && (
        <>
          <div
            style={{cursor : "pointer"}}
            className="userInfoRB"
            onClick={() => redirectToChannel(channel.channelname)}
          >
            <img src={"/upload/" + channel.channelPic} alt="" />
            <p>{channel.channelname}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;
