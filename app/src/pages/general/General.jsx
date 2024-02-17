
import "./general.css";
import Post from "../../components/post/Post";

import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

const General = () => {
  

  const {
    isLoading: postsLoading,
    error: pubpostsError,
    data: pubpostsData,
  } = useQuery(["publicposts"], () =>
    makeRequest
      .get(`/posts/getPublicPosts`)
      .then((res) => {
       
        return res.data;
      })
  );

  const {
    isLoading: userLoading2,
    error: userError2,
    data: userData2,
  } = useQuery(["users2"], () =>
    makeRequest.get("/users/find/").then((res) => {
       
      return res.data;
    })
  );

  return (
    <div className="posts">
      {pubpostsError || userError2
        ? "Something went wrong!"
        : postsLoading || userLoading2
        ? "loading"
        : pubpostsData.map((post) => {
            const user = userData2.find((user) => user._id === post.userId._id);
            return <Post post={post} key={post._id} user={user} />;
          })}
    </div>
  );
};

export default General;
