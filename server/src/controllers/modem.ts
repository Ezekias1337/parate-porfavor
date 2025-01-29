// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import vm from "vm";
// Functions, Helpers, and Utils
import sessionStore from "../session/sessionStore";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

type Device = {
    domain: string,
    MacAddr: string,
    HostName: string
}

export const getDeviceList: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();
    console.log("GETTING COOKIE VALUES:", cookies);
    
    /* 
        The current problem is that the cookie values aren't exactly what I need to make the request.
        
        The expected value should be the structure of: sid=b1649a435ddb59fdb8886dde89a74a9e0ebf1e4987cf2a88f5c41075876dd2c2:Language:english:id=1
        The current value is the structure of: sid=b1649a435ddb59fdb8886dde89a74a9e0ebf1e4987cf2a88f5c41075876dd2c2:Language:english:id=1; Path=/
        
        The Path value is causing it to fail'
    */
    
    try {
        const response = await axios.get(`${MODEM_URL_BASE}/html/bbsp/common/parentalctrlinfo.asp`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "X-Requested-With": "XMLHttpRequest",
                "Priority": "u=2",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrlmac.asp`,
                mode: "cors",
                "Cookie": cookies,

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


