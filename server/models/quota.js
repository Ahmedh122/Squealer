import mongoose from "mongoose";

const quotaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  quota: {
    type: int ,
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Quota;