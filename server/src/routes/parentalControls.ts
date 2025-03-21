import express from "express";
import * as ParentalControlsController from "../controllers/parentalControls";

const router = express.Router();

// GET requests
router.get("/get-parental-controls-data", ParentalControlsController.getParentalControlsData);
// POST requests
/* router.post("/reboot-modem", ModemController.rebootModem); */
export default router;