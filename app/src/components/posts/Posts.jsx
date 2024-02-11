import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";

const Posts = ({userId, channelname}) => { 

 const { isLoading, error, data } = useQuery(
   ["posts", userId, channelname],
   () =>
     makeRequest
       .get(`/posts?userId=${userId}&channelname=${channelname}`)
       .then((res) => {
         return res.data;
       })
 );
 const [routeCoordinates, setRouteCoordinates] = useState([]);

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post._id} routeCoordinates={routeCoordinates} setRouteCoordinates={setRouteCoordinates}  />)}
    </div>
  );
};

export default Posts;