import Profile from "../profile/Profile";
import "./profiles.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/Authcontext";

const Channels = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["profiles"], () =>
    makeRequest.get("/users/find").then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: subscriptionData } = useQuery(
    ["relationshipz"],
    () =>
      makeRequest.get("/relationships?followerUserId=" + currentUser._id).then((res) => {
        return res.data;
      })
  );

  const { followers = [], following = [] } = subscriptionData || {};

  return (
    <div className="profiles">
      {error && data.length === 0
        ? null
        : error
        ? "Something went wrong!"
        : isLoading || rIsLoading
        ? "loading"
        : data
            .filter(
              (profile) =>
                profile.admin === currentUser._id ||
                following.includes(profile._id)
            )
            .map((profile) => { 
              return <Profile profile={profile} key={profile._id}/>
            })}
    </div>
  );
};

export default Channels;