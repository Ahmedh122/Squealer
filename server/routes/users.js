import express from "express";
import { getUser, updateUser , updateCoords, getCoords } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/update", updateUser);
router.put("/position", updateCoords);
router.get("/getCoords/:userId", getCoords);

export default router;
