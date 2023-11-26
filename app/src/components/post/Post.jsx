import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

import { useState } from "react";

const Post = ({ post }) => {
  

  //TEMPORARY
  const liked = false;

  return (
    <div className="Post">
      <div className="containerPost">
        <div className="userPost">
          <div className="userInfoPost">
            <img src={post.profilePic} alt="" />
            <div className="detailsPost">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <span className="namePost">{post.name}</span>
              </Link>
              <Link
                to={`/channel/${post.channel}`}
                style={{textDecoration: "none", color: "inherit"}}>
              <span className="namePost"> s/{post.channel}</span>
              </Link>
              <span className="datePost">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>  
        <div className="contentPost">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="infoPost">
          <div className="itemPost">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="itemPost" >
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="itemPost">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;