import express from "express";
import * as ParentalControlsController from "../controllers/parentalControls";

const router = express.Router();

// GET requests
router.get("/get-parental-controls-data", ParentalControlsController.getParentalControlsData);
// POST requests
router.post("/get-ont-token", ParentalControlsController.fetchOntTokenSource)
router.post("/add-device-to-parental-controls", ParentalControlsController.addDeviceToParentalControls);
router.post("/add-time-period-to-parental-controls-template", ParentalControlsController.addTimePeriodToParentalControls);
router.post("/create-parental-controls-template", ParentalControlsController.createParentalControlsTemplate);
// DELETE requests
router.delete("/remove-time-period-from-parental-controls-template", ParentalControlsController.removeTimePeriodFromParentalControls);
router.delete("/remove-device-from-parental-controls", ParentalControlsController.removeDeviceFromParentalControls);
router.delete("/delete-parental-controls-template", ParentalControlsController.deleteParentalControlsTemplate);

export default router;