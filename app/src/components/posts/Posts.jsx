import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";


const Posts = ({userId, channelname}) => { 

 const { isLoading: postsLoading, error: postsError, data: postsData } = useQuery(
   ["posts", userId, channelname],
   () =>
     makeRequest
       .get(`/posts?userId=${userId}&channelname=${channelname}`)
       .then((res) => {
         return res.data;
       })
 );

 // use query for users to get routeCoordinates
 const { isLoading: userLoading, error: userError, data: userData } = useQuery(["users"], () =>
     makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
    );



  return (
    <div className="posts">
      {postsError || userError 
        ? "Something went wrong!"
        : postsLoading || userLoading 
        ? "loading"
        : postsData.map((post) => <Post post={post} key={post._id} user={userData} />)}
    </div>
  );
};

export default Posts;