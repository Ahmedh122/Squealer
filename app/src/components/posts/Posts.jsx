import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

const Posts = ({userId, channelname}) => { 
  const currentuser = useContext(AuthContext);

  const { isLoading: postsLoading, error: postsError, data: postsData } = useQuery(
    ["posts", userId, channelname],
    () =>
      makeRequest
        .get(`/posts?userId=${userId}&channelname=${channelname}&currentuser=${currentuser.currentUser._id}`)
        .then((res) => {
          return res.data;
        })
  );

  const { isLoading: userLoading, error: userError, data: userData } = useQuery(["users"], () =>
      makeRequest.get("/users/find/").then((res) => {
        return res.data;
      })
    );

  return (
    <div className="posts">
      {postsError || userError 
        ? "Something went wrong!"
        : postsLoading || userLoading 
        ? "loading"
        : postsData.map((post) => {
          const user = userData.find(user => user._id === post.userId._id);
          return <Post post={post} key={post._id} user={user} />
        })}
    </div>
  );
};

export default Posts;