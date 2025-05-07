import express from "express";
import * as WakeOnLanController from "../controllers/wakeOnLan";

const router = express.Router();

// POST requests
router.post("/wake-device", WakeOnLanController.wakeDevice);

export default router;