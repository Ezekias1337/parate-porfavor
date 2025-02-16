import express from "express";
import * as wlanMacFilterControlsController from "../controllers/wlanMacFilterControls";

const router = express.Router();

// POST requests
router.post("/edit-mac-filter", wlanMacFilterControlsController.editMacFilter);
router.post("/add-device-to-mac-filter", wlanMacFilterControlsController.addDeviceToMacFilter);
router.post("/remove-device-from-mac-filter", wlanMacFilterControlsController.removeDeviceFromMacFilter);

export default router;