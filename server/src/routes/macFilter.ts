import express from "express";
import * as macFilterControlsController from "../controllers/macFilter";

const router = express.Router();

// GET requests
router.get("/get-device-list", macFilterControlsController.getDeviceList);
router.get("/get-list-of-filtered-devices", macFilterControlsController.getListOfFilteredDevices);
// POST requests
router.post("/get-ont-token",  macFilterControlsController.fetchOntTokenSource)
router.post("/edit-mac-filter", macFilterControlsController.editMacFilter);
router.post("/add-device-to-mac-filter", macFilterControlsController.addDeviceToMacFilter);
// DELETE requests
router.delete("/remove-device-from-mac-filter", macFilterControlsController.removeDeviceFromMacFilter);

export default router;