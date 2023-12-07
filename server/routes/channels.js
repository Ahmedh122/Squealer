import express from "express";
import { getChannel, addChannel, deleteChannel } from "../controllers/channel.js";

const router = express.Router();

router.get("/find/:channelId", getChannel);
router.post("/", addChannel);
router.delete("/:id", deleteChannel);

export default router;
