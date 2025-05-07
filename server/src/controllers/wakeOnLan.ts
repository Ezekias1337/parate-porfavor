// Library Imports
import { RequestHandler } from "express";
const wol = require('wakeonlan');


export const wakeDevice: RequestHandler = async (req, res, next) => {
    try {
        console.log("req.body", req.body)
        const deviceMacAddr: string = req.body.macAddress;
        await wol(deviceMacAddr);
        res.json(true);
    } catch (error) {
        next(error);
        res.json(false);
    }
}

