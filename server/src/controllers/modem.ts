// Library Imports
import { RequestHandler } from "express";
import axiosInstance from "../util/axiosWithCookies";
import createHttpError from "http-errors";
import env from "../util/validateEnv";
import vm from "vm";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

type Device = {
    domain: string,
    MacAddr: string,
    HostName: string
}

export const getDeviceList: RequestHandler = async (req, res, next) => {
    try {
        const response = await axiosInstance.get(`${MODEM_URL_BASE}/html/bbsp/common/parentalctrlinfo.asp`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "X-Requested-With": "XMLHttpRequest",
            },
            
        });
        console.log("DEVICE LIST:", response.data);

        // Run the script in a sandbox to extract the array
        /* const sandbox = {};
        const context = vm.createContext(sandbox); // Isolated context
        const script = new vm.Script(response.data);
        const userDevicesList = script.runInContext(context);
        const listToReturn: Device[] = [] */


        // Process the extracted data
        /* if (Array.isArray(userDevicesList)) {
            userDevicesList.forEach(device => {
                console.log(`Domain: ${device.domain}`);
                console.log(`MAC Address: ${device.MacAddr}`);
                console.log(`Host Name: ${device.HostName}`);

                device = { device: device.domain, mac: device.MacAddr, name: device.HostName }
                listToReturn.push(device);
            });

            res.json({ deviceList: listToReturn })
        }; */
    } catch (error) {
        next(error);
    }
};


