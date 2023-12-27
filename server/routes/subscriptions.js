import express from "express";
import { getSubscriptions,addSubscription,deleteSubscription } from "../controllers/subscription.js";

const router = express.Router();

router.get("/", getSubscriptions);
router.post("/", addSubscription);
router.delete("/", deleteSubscription);

export default router;
