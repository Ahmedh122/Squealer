import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel", // Assuming you have a User model
  },
  channelname: {
    type: String,
    ref: "Channel", // Assuming you have a User model
  },
  position: {
    lat : {type: Number},
    lng : {type: Number},
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
