import Channel from "../channel/Channel";
import "./channels.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";

const Channels = () => { 
 
  const { isLoading, error, data } = useQuery(["channels"], () =>
    makeRequest.get("/channels").then((res) => {
        console.log(res.data);
      return res.data;
    })
  );

  return (
    <div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((channel) => <Channel channel={channel} key={channel.channelname} />)}
    </div>
  );
};

export default Channels;