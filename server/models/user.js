import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    length: 60,
    trim: true,
    required: true,
  },
  city: {
    type: String,
  },
  website: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  maxQuota: {
    type: Number,
    default: 1000,
  },
  currentQuota: {
    type: Number,
    default: 1000,
  },
  // Add other fields as needed
});

const User = mongoose.model("User", userSchema);

export default User;
