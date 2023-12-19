import express from "express";
import { getChannel, addChannel, deleteChannel, getChannellist } from "../controllers/channel.js";

const router = express.Router();

router.get("/find/:channelname", getChannel);
router.post("/", addChannel);
router.delete("/:id", deleteChannel);
router.get("/", getChannellist);

export default router;
