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
    default: "https://i.pinimg.com/222x/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg",
  },
  coverPic: {
    type: String,
  },
  quota: {
    type: Number,
    default: 9000,
  },
  // Add other fields as needed
});

const User = mongoose.model("User", userSchema);

export default User;
