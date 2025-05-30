// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
// Auth
import sessionStore from "../session/sessionStore";
// Functions, Helpers, and Utils
import fetchOntToken from "../util/fetchOntToken";
import getModemUrl from "../util/getModemUrl";
// Types
import { ModemStatus } from "../../../shared/types/Modem";
import OntToken from "@shared/types/OntToken";
// Environment Variables
const USER_AGENT = env.USER_AGENT;

export const getModemStatus: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);
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
        res.json(modemStatus);
    } catch (error) {
        next(error);
    }
};

export const rebootModem: RequestHandler = async (req, res, next) => {
    /* 
        ! NEED TO ADD SOME WAY TO HANDLE THE SERVER SHUTTING DOWN WHEN THE INTERNET
        ! TURNS OFF
    */
    
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);
        /* 
            ! Before we can make the request to the modem to reboot we need the onttoken 
            ! from the DOM of the page (which will be passed as x.X_HW_Token)
        */
        const ontTokenSource = await axios.get(`${MODEM_URL_BASE}/html/ssmp/reset/reset.asp`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${env.MODEM_URL_BASE}/index.asp`,
                "Cookie": cookies,
            },
        });
        const ontToken: OntToken = fetchOntToken(ontTokenSource.data);

        await axios.post(`${MODEM_URL_BASE}/html/ssmp/reset/set.cgi?x=InternetGatewayDevice.X_HW_DEBUG.SMP.DM.ResetBoard&RequestFile=html/ssmp/reset/reset.asp`, `x.X_HW_Token=${ontToken}`, {
            method: "POST",
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                Cookie: cookies,
                referrer: `${env.MODEM_URL_BASE}/html/ssmp/reset/reset.asp`,
                mode: "cors",
            },
        });
        res.json({ rebootStatus: true });
    } catch (error) {
        next(error);
    }
};