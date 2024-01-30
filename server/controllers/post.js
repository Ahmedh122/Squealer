import jwt from "jsonwebtoken";
import Post from "../models/post.js";
import Relationship from "../models/relationship.js";
import Subscription from "../models/subscription.js";

export const getPosts = async (req, res) => {
  const { userId, channelname } = req.query;
  const token = req.cookies.accessToken;

  try {
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");

    let query;

    if (userId !== "undefined") {
      // If userId is defined, fetch posts for a specific user
      query = {
        userId: userId,
      };
    } else if (channelname !=="undefined") {
      // If channelname is defined, fetch posts for a specific channel
      query = {
        channelname: channelname,
      };
    } else {
      // If userId and channelname are not defined, fetch posts from followed users and channels
      const userRelationships = await Relationship.find({
        followerUserId: userInfo.id,
      });

      const followedUserIds = userRelationships.map(
        (relationship) => relationship.followedUserId
      );

      const channelSubscriptions = await Subscription.find({
        subscriberId: userInfo.id,
      });

      const followedChannelNames = channelSubscriptions.map(
        (subscription) => subscription.channelname
      );

      // Include the user's own ID and channel subscriptions in the list
      followedUserIds.push(userInfo.id);
      followedChannelNames.push(userInfo.id);

      query = {
        $or: [
          { userId: { $in: followedUserIds } },
          { channelname: { $in: followedChannelNames } },
        ],
      };
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).populate({
      path: "userId",
      model: "User",
      select: "username profilePic",
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Internal Server Error");
  }
};
export const addPost = async (req, res) => {
 
  const token = req.cookies.accessToken;
  
  try {
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");
    console.log(userInfo.id);
    const newPost = new Post({
      desc: req.body.desc,
      img: req.body.img,
      userId: userInfo.id,
      channelname: req.body.channelname || "",
    });

    await newPost.save();

    return res.status(200).json("Post has been created.");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Internal Server Error");
  }
};

export const deletePost = async (req, res) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      userId: userInfo.id,
    });

    if (deletedPost) {
      return res.status(200).json("Post has been deleted.");
    } else {
      return res.status(403).json("You can delete only your post.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Internal Server Error");
  }
};
