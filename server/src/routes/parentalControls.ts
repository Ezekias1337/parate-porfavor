import express from "express";
import * as ParentalControlsController from "../controllers/parentalControls";

const router = express.Router();

// POST requests
router.post("/add-device-to-parental-controls-template", ParentalControlsController.addDeviceToParentalControlsTemplate);
router.post("/add-time-period-to-parental-controls-template", ParentalControlsController.addTimePeriodToParentalControlsTemplate);
router.post("/create-parental-control-template", ParentalControlsController.createParentalControlTemplate);

// DELETE requests
router.delete("/remove-device-from-parental-controls-template/:macIndex", ParentalControlsController.removeDeviceFromParentalControlsTemplate);


export default router;