import express from "express";
import * as ModemController from "../controllers/modem";

const router = express.Router();

// GET requests
/* router.get("/get-network-devices", ModemController.getNetworkDevices);*/
router.get("/get-modem-status", ModemController.getModemStatus);
router.get("/get-device-list", ModemController.getDeviceList);

// POST requests
//router.post("/reboot-modem", ModemController.rebootModem);

export default router;