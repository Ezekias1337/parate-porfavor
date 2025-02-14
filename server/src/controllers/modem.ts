import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import sessionStore from "../session/sessionStore";
import Device from "../../../shared/types/Device";
import { ModemStatus } from "../../../shared/types/Modem";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;



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

export const getModemStatus: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();

    try {
        const response = await axios.get(`${MODEM_URL_BASE}/html/ssmp/deviceinfo/deviceinfo.asp`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "X-Requested-With": "XMLHttpRequest",
                "Priority": "u=2",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/index.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        const htmlText = await response.data;
        const cpuUsedMatch = htmlText.match(/var cpuUsed = '(.+?)';/);
        const memUsedMatch = htmlText.match(/var memUsed = '(.+?)';/);
        const systemTimeMatch = htmlText.match(/var systemdsttime = '(.+?)';/);

        const modemStatus: ModemStatus = {
            cpuUsed: cpuUsedMatch ? cpuUsedMatch[1] : null,
            memUsed: memUsedMatch ? memUsedMatch[1] : null,
            systemTime: systemTimeMatch ? systemTimeMatch[1] : null,
        };
        console.log(modemStatus);
        res.json(modemStatus);
    } catch (error) {
        next(error);
    }
};