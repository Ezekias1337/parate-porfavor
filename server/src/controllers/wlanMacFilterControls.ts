import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import sessionStore from "../session/sessionStore";
import Device from "../../../shared/types/Device";
import { ModemStatus } from "../../../shared/types/Modem";

import fetchOntToken from "../util/fetchOntToken";
import extractDeviceList from "../util/extractDeviceList";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

/* 
    ? It seems like there are different api requests for WLAN vs LAN (wireless vs ethernet)
    ? After getting one working inspect the differences
    ? On each of the pages in the modem's html the wlan only returns wifi devices and vice versa
*/

const fetchOntTokenSource = async (ontToken: string | null, cookies: string): Promise<string | null> => {
    /* 
        ! Before we can make the request to the modem to reboot we need the onttoken 
        ! from the DOM of the page (which will be passed as x.X_HW_Token)
    */

    try {
        if (ontToken === null) {
            const ontTokenSource = await axios.get(`${MODEM_URL_BASE}/html/bbsp/macfilter/macfilter.asp`, {
                headers: {
                    "User-Agent": USER_AGENT,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Upgrade-Insecure-Requests": "1",
                    "Priority": "u=4",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache",
                    referrer: `${env.MODEM_URL_BASE}/index.asp`,
                    "mode": "cors",
                    "Cookie": cookies,
                },
            });
            ontToken = fetchOntToken(ontTokenSource.data);
        }

        return ontToken;
    } catch (error) {
        return null
    }
}

export const editMacFilter: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();
    const blacklistOrWhitelist = req.body.blacklistOrWhitelist;
    const macFilterEnabledOrDisabled = req.body.macFilterEnabledOrDisabled;
    let ontToken = req.body.ontToken;

    try {
        ontToken = await fetchOntTokenSource(ontToken, cookies);

        await axios.post(`${MODEM_URL_BASE}/html/bbsp/macfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security&RequestFile=html/bbsp/macfilter/macfilter.asp`, `x.MacFilterPolicy=${blacklistOrWhitelist === "blacklist" ? "0" : "1"}&x.MacFilterRight=${macFilterEnabledOrDisabled === "enabled" ? "1" : "0"}&x.X_HW_Token=${ontToken}`, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/macfilter/macfilter.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });
        res.json({ macFilterStatus: "enabled" });
    } catch (error) {
        next(error);
    }
};


export const addDeviceToMacFilter: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();
    const { deviceMac, deviceName } = req.body.deviceToAdd;
    let ontToken = req.body.ontToken;

    /* 
        ! For some reason the mac address needs to be encoded with url encoding, so take the : and 
        ! replace it with %3A before sending it to the modem
    */
    const deviceMacEncoded = deviceMac.replace(/:/g, "%3A");

    try {
        ontToken = await fetchOntTokenSource(ontToken, cookies);

        /* 
            ? Need to verify what happens if the device alias is non-existant
        */

        await axios.post(`${MODEM_URL_BASE}/html/bbsp/macfilter/add.cgi?x=InternetGatewayDevice.X_HW_Security.MacFilter&RequestFile=html/bbsp/macfilter/macfilter.asp`, `x.SourceMACAddress=${deviceMacEncoded}&x.DeviceAlias=${deviceName}&x.X_HW_Token=${ontToken}`, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/macfilter/macfilter.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });
        res.json({ deviceAdded: true });
    } catch (error) {
        next(error);
        res.json({ deviceAdded: false });
    }
};

export const removeDeviceFromMacFilter: RequestHandler = async (req, res, next) => {
    const cookies = sessionStore.getAllCookies();
    const deviceIndicesToRemove: number[] = req.body.deviceIndexToRemove;
    let ontToken = req.body.ontToken;

    try {
        ontToken = await fetchOntTokenSource(ontToken, cookies);

        let deviceIndicesString: string = "";
        for (const index of deviceIndicesToRemove) {
            deviceIndicesString += `InternetGatewayDevice.X_HW_Security.MacFilter.${index}=&,`;
        }

        await axios.post(`${MODEM_URL_BASE}/html/bbsp/macfilter/del.cgi?x=InternetGatewayDevice.X_HW_Security.MacFilter&RequestFile=html/bbsp/macfilter/macfilter.asp`, `${deviceIndicesString}x.X_HW_Token=${ontToken}`, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/macfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security.MacFilter.1&RequestFile=html/bbsp/macfilter/macfilter.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });
        res.json({ devicesRemoved: true });
    } catch (error) {
        next(error);
        res.json({ devicesRemoved: false });
    }
};
