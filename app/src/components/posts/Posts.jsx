import Post from "../post/Post";
import "./posts.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

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

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
};

export default Posts;