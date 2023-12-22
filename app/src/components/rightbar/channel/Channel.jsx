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
          <div className="userInfoRB">
            <img src="" alt="" />
            <p>
              <span
                onClick={() => redirectToChannel(channel.channelname)}
                style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
              >
                {channel.channelname}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;
