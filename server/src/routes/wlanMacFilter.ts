import express from "express";
import * as WlanMacFilterController from "../controllers/wlanMacFilter";

const router = express.Router();

// POST requests
router.post("/add-device-to-wlan-mac-filter", WlanMacFilterController.login);

// PUT requests
router.put("/enable-wlan-mac-filter", WlanMacFilterController.updateWlanMacFilter);
router.put("/disable-wlan-mac-filter", WlanMacFilterController.updateWlanMacFilter);

export default router;