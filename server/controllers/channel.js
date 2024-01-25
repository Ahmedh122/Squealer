import jwt from "jsonwebtoken";
import Channel from "../models/channel.js";

export const getChannel = async (req, res) => {
  const channelname = req.params.channelname;
  //console.log("userid" , userId);
  try {
    const channel = await Channel.findOne({ channelname: channelname });
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }

    return res.send(channel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addChannel = async (req, res) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");

    // Check if channel already exists
    const existingChannel = await Channel.findOne({ channelname: req.body.channelname });
    if (existingChannel) {
      return res.status(409).json("Channel already exists!");
    }

    const newChannel = new Channel({
      admin: userInfo.id,
      channelname: req.body.channelname,
      channelPic: req.body.chimg,
      coverPic: req.body.coverimg,
    });

    await newChannel.save();

    return res.status(200).json({
      message: "Channel has been created.",
      channelname: newChannel.channelname,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Internal Server Error");
  }
};

export const deleteChannel = async (req, res) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");

    const deleteChannel = await Channel.findOneAndDelete({
      channelname: req.params.channelname,
      admin: userInfo.id,
    });

    if (deleteChannel) {
      return res.status(200).json("Channel has been deleted.");
    } else {
      return res.status(403).json("You can delete only your Channel.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Internal Server Error");
  }
};

export const getChannellist = async (req , res) => {

 

  try {

  //console.log("userid" , userId);

    const channel = await Channel.find({});
    if (!channel || channel.length === 0) {
      return res.status(404).json({ message: "channels not found" });
    }

    // Exclude sensitive information like password before sending the response
    return res.json(channel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
