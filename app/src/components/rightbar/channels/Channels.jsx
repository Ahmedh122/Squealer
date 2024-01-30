import Channel from "../channel/Channel";
import "./channels.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/Authcontext";

const Channels = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["channels"], () =>
    makeRequest.get("/channels").then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: subscriptionData } = useQuery(
    ["subscriptions"],
    () =>
      makeRequest
        .get("/subscriptions/channellist?userId=" + currentUser._id) // Added '='
        .then((res) => {
          return res.data;
        })
  );

  return (
    <div className="channels">
      {error && data.length === 0
        ? null
        : error
        ? "Something went wrong!"
        : isLoading || rIsLoading
        ? "loading"
        : data
            .filter(
              (channel) =>
                channel.admin === currentUser._id ||
                subscriptionData.includes(channel.channelname)
            )
            .map((channel) => (
              <Channel channel={channel} key={channel.channelname} />
            ))}
    </div>
  );
};

export default Channels;
