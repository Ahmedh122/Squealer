import jwt from "jsonwebtoken";
import Quota from "../models/quota.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import mongoose from "mongoose";
import cron from "node-cron";
import Like from "../models/like.js";

export const updateQuota = async (req, res) => {
  try {
    const users = await User.find();
    
    for (let j = 0; j < users.length; j++) {
      const user = users[j];
    
      const userId = user._id;
     
      const quota = await Quota.findOne({ userId: userId });
   
      if(quota){
      await Quota.updateOne({ userId: userId }, { quota: quota.maxquota });

      let batchLikes = 0;
      let batchDislikes = 0;
      let CM10 = 0;
      let CM3 = 0;
      let X10 = 0;
      let X3 = 0;

      const userPosts = await Post.find({ userId: userId });

      for (let i = 0; i < userPosts.length; i++) {
        const post = userPosts[i];
        const postLikes = await Like.countDocuments({
          postId: post._id,
          type: "like",
        });

        const postDislikes = await Like.countDocuments({
          postId: post._id,
          type: "dislike",
        });

        X10 += post.views;
        X3 += post.views;
        batchLikes += postLikes;
        batchDislikes += postDislikes;
        if ((i + 1) % 10 === 0) {
          CM10 = Math.floor(0.25 * X10);
          const isBatchPopular = batchLikes > CM10;
          console.log("isBatchPopular", isBatchPopular);
          if (isBatchPopular) {
            quota.maxquota += Math.floor(quota.maxquota * 0.01);
            await Quota.updateOne(
              { userId: userId },
              { maxquota: quota.maxquota, 
              quota : quota.maxquota }
            );
          }
          batchLikes = 0;
          X10 = 0;
          CM10 = 0;
        }

        if ((i + 1) % 3 === 0) {
          CM3 = Math.floor(0.25 * X3);
          const isBatchUnpopular = batchDislikes > CM3;
          if (isBatchUnpopular) {
            quota.maxquota -= Math.floor(quota.maxquota * 0.01);
            await Quota.updateOne(
              { userId: userId },
              { maxquota: quota.maxquota,
              quota : quota.maxquota }
            );
          }
          batchDislikes = 0;
          X3 = 0;
          CM3 = 0;
        }
      }
      }
    }

    return res.status(200).json({ message: "Quota modified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  
  }
};

export const getQuota = async (req, res) => {
  const userId = req.params.userId;

  try {
    const quota = await Quota.findOne({ userId: userId });

    if (quota) {
      return res.status(200).json(quota);
    } else {
      // No quota found for the user
      return res.status(404).json({ message: "Quota not found for the user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const modifyQuota = async (req, res) => {
  try {
    const quota = await Quota.findOne({ userId: req.body.userId });

    if (!quota) {
      return res.status(404).json({ message: "Quota not found" });
    }

    let newQuota = Math.max(0, quota.quota - (req.body.usedQuota || 0));

    const updatedQuota = await Quota.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: { quota: newQuota } },
      { new: true }
    );

    return res.status(200).json({
      message: "Quota has been updated.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

cron.schedule("50 15 * * *", async () => {
  await updateQuota();
});
