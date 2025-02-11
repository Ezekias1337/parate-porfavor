import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import sessionStore from "../session/sessionStore";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

type Device = {
    domain: string;
    macAddr: string;
    hostName: string;
    ipAddress: string;
    onlineStatus: string;
    connectionType: string;
    ssid: string;
};

export const getDeviceList: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();

    try {
        const response = await axios.get(`${MODEM_URL_BASE}/html/bbsp/common/GetLanUserDevInfo.asp`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "X-Requested-With": "XMLHttpRequest",
                "Priority": "u=2",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/common/GetLanUserDevInfo.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        // Regex to capture relevant device data
        const deviceRegex = /new USERDeviceNew\("(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)","(.*?)"\)/g;
        
        let match;
        const deviceList: Device[] = [];

        while ((match = deviceRegex.exec(response.data)) !== null) {
            deviceList.push({
                domain: match[1],
                ipAddress: match[2].replace(/\\x2e/g, "."), // Convert encoded IP address
                macAddr: match[3].replace(/\\x3a/g, ":"), // Convert encoded MAC address
                hostName: decodeURIComponent(match[11].replace(/\\x2d/g, "-")), // Decode hostnames
                onlineStatus: match[8] === "Online" ? "Online" : "Offline",
                connectionType: match[9] === "ETH" ? "ETH" : "WIFI",
                ssid: match[5],
            });
        }

        console.log(deviceList);
        res.json({ deviceList });
    } catch (error) {
        next(error);
    }
};
