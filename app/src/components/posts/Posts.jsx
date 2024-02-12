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
 const { isLoading: coordsLoading, error: coordsError, data: coordsData } = useQuery(["users"], () =>
     makeRequest.get("/users/getCoords/" + userId).then((res) => {
        console.log(res.data)
        return res.data;
      })
    );

  return (
    <div className="posts">
      {postsError || coordsError
        ? "Something went wrong!"
        : postsLoading || coordsLoading
        ? "loading"
        : postsData.map((post) => <Post post={post} key={post._id} routeCoordinates={coordsData}/>)}
    </div>
  );
};

export default Posts;