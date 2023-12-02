import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
//import Comments from "../comments/Comments";
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

  const { isLoading, error, data } = useQuery(["likes", post._id], () =>
    makeRequest.get("/likes?postId=" + post._id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  
  //console.log(currentUser._id);

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post._id);
      return makeRequest.post("/likes", { postId: post._id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
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
    mutation.mutate(data.includes(currentUser._id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post._id);
  };

  return (
    <div className="Post">
      <div className="containerPost">
        <div className="userPost">
          <div className="userInfoPost">
            <img src={"/upload/"+post.profilePic} alt="" />
            <div className="detailsPost">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="namePost">{post.name}</span>
              </Link>
              <span className="datePost">{moment(post.createdAt).fromNow()}</span>
            </div>
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
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="itemPost" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
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