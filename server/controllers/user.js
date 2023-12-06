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
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = userInfo.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user updating is the owner of the profile
      if (user.id !== userId) {
        return res.status(403).json("You can update only your profile!");
      }

      // Update user fields
      user.name = req.body.name || user.name;
      user.city = req.body.city || user.city;
      user.website = req.body.website || user.website;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.coverPic = req.body.coverPic || user.coverPic;

      await user.save();

      return res.json("Updated!");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};