import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPlayer from "react-player";
import { MuteContext } from "../../context/Mutecontext";

function Player({ source }) {
  const [isVideoInViewport, setIsVideoInViewport] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); 
  const {isMuted, toggleMute}= useContext(MuteContext);
  const videoRef = useRef(null);

  const handleVideoIntersection = (entries) => {
    const [entry] = entries;
    setIsVideoInViewport(entry.isIntersecting);

    /*if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
        if (entry.isIntersecting) {
          setIsVideoInViewport(true);
          //console.log("is in viewport", isVideoInViewport);
        } else {
          setIsVideoInViewport(false);
          // console.log("is in viewport", isVideoInViewport);
        }
      }*/
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleVideoIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  const togglePlay =()=>{
    setIsPlaying(!isPlaying);
  } ;
 

  return (
    <div className="playerWrap" ref={videoRef}>
      <ReactPlayer
        url={`/upload/${source}`}
        controls={true}
        height="500px"
        width="750px"
        playing={isVideoInViewport && isPlaying}
        muted={isMuted}
      />
      <button onClick={toggleMute}>toggle mute</button>
      <button onClick={togglePlay}>Play/Pause</button>
    </div>
  );
}

export default Player;

//src={`/upload/${source}`}
