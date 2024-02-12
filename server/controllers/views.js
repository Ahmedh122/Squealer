// views.js
import Post from "../models/post.js";
import jwt from "jsonwebtoken";

export const addView = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Initialize viewedUsers array if undefined
    if (!post.viewedUsers) {
      post.viewedUsers = [];
    }

    // Check if the request is from the post owner
    if (post.userId.toString() === userId) {
      // Do nothing if the request is from the post owner
      return res
        .status(200)
        .json({ message: "Request from post owner. No view added." });
    }

    // Check if the user is registered and has not viewed the post before
    if (userId && !post.viewedUsers.includes(userId)) {
      post.views += 1;
      post.viewedUsers.push(userId);
      await post.save();

      return res.status(200).json({ message: "View added successfully" });
    } else if (!userId) {
      // If the user is not registered, increment the views counter
      post.views += 1;
      await post.save();

      return res.status(200).json({ message: "View added successfully" });
    } else {
      // If the user is registered and has already viewed the post, return a message
      return res.status(200).json({ message: "Already viewed by the user" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};