import jwt from "jsonwebtoken";
import User from "../models/user.js"; 
import mongoose from "mongoose";// Assuming you have a User model for MongoDB

export const getUser = async (req, res) => {
  const userId = req.params.userId;
  //console.log("userid" , userId);
  try {
     const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information like password before sending the response
    const { password, ...data } = user.toObject();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateUser = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const userId = userInfo.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.id !== userId) {
        return res.status(403).json("You can update only your profile!");
      }

      const updateFields = {};

      if (req.body.username2) {
        updateFields.username = req.body.username2;
      }

      if (req.body.newprpic) {
        updateFields.profilePic = req.body.newprpic;
      }

      if (req.body.newprcover) {
        updateFields.coverPic = req.body.newprcover;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).json({
        message: "User has been updated.",
        _id: updatedUser._id,
        name: updatedUser.name,
        profilePic: updatedUser.profilePic,
        coverPic: updatedUser.coverPic,
      });
      

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};



