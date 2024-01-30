import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoadinglikes, errorlikes, data:datalikes } = useQuery(["likes", post._id], () =>
    makeRequest.get("/likes/getLike?postId=" + post._id).then((res) => {
      return res.data;
    })
  );
  const { isLoadingdislikes, errordislikes, data:datadislikes } = useQuery(["dislikes", post._id], () =>
    makeRequest.get("/likes/getDislike?postId=" + post._id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes/deleteLike?postId=" + post._id);
      return makeRequest.post("/likes/addLike", { postId: post._id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
        queryClient.invalidateQueries(["dislikes"]);
      },
    }
  );

  const dislikemutation = useMutation(
    (disliked) => {
      if (disliked) return makeRequest.delete("/likes/deleteDislike?postId=" + post._id);
      return makeRequest.post("/likes/addDislike", { postId: post._id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["dislikes"]);
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );


  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    console.log('currentUser:', currentUser);
    console.log('datalikes in handleLike:', datalikes);
    mutation.mutate(datalikes.includes(currentUser._id));
  };

  const handleDislike = () => {
    dislikemutation.mutate(datadislikes.includes(currentUser._id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post._id);
  };

  return (
    <div className="Post">
      <div className="containerPost">
        <div className="userPost">
          <div className="userInfoPost">
            {post.userId && (
              <>
                <img src={post.userId.profilePic} alt="" />
                <div className="detailsPost">
                  <Link
                    to={`/profile/${post.userId._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="namePost">{post.userId.username}</span>
                  </Link>
                  {post.channelname!=="" &&(
                  <Link
                    to={`/channel/${post.channelname}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="namePost">§ {post.channelname}</span>
                  </Link>)}
                  <span className="datePost">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </>
            )}
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser._id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="contentPost">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="infoPost">
          <div className="itemPost">
            {isLoadinglikes ? (
              "loading"
            ) : datalikes?.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {datalikes?.length} Likes
          </div>
          <div className="itemPost">
            {isLoadingdislikes ? (
              "loading"
            ) : datadislikes?.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "purple", rotate: "180deg" }}
                onClick={handleDislike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                style={{ rotate: "180deg" }}
                onClick={handleDislike}
              />
            )}
            {datadislikes?.length} Dislikes
          </div>
          <div
            className="itemPost"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            See Comments
          </div>
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;