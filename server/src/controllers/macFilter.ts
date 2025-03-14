import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import sessionStore from "../session/sessionStore";
import { Device } from "../../../shared/types/Device";
import { ModemStatus } from "../../../shared/types/Modem";

import fetchOntToken from "../util/fetchOntToken";
import extractDeviceList from "../util/extractDeviceList";
import extractMacFilterList from "../util/extractMacFilterList";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

/* 
    ? It seems like there are different api requests for WLAN vs LAN (wireless vs ethernet)
    ? After getting one working inspect the differences
    ? On each of the pages in the modem's html the wlan only returns wifi devices and vice versa
    
    
    ? fetchOntTokenSource has an ontToken parameter, need to think about where that token should be stored
    ? so that it doesn't need to be constantly refreshed
*/

export const fetchOntTokenSourceHandler = async (ontToken: string | null, cookies: string, wirelessOrEthernet: string): Promise<string | null> => {
    /* 
        ! Before we can make the request to the modem to reboot we need the onttoken 
        ! from the DOM of the page (which will be passed as x.X_HW_Token)
    */

    try {
        if (ontToken === null) {
            let queryString;

            if (wirelessOrEthernet === "ethernet") {
                queryString = `${MODEM_URL_BASE}/html/bbsp/macfilter/macfilter.asp`;
            } else {
                queryString = `${MODEM_URL_BASE}/html/bbsp/wlanmacfilter/wlanmacfilter.asp`
            }

            const ontTokenSource = await axios.get(queryString, {
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

export const fetchOntTokenSource: RequestHandler = async (req, res, next) => {
    try {
        const cookies = sessionStore.getAllCookies();
        const wirelessOrEthernet = req.body.wirelessOrEthernet;
        let ontToken = req.body.ontToken;
        const tokenToReturn = await fetchOntTokenSourceHandler(ontToken, cookies, wirelessOrEthernet);
        res.json(tokenToReturn);
    } catch (error) {
        next(error);
    }
}

export const getDeviceList: RequestHandler = async (req, res, next) => {
    try {
        const cookies = sessionStore.getAllCookies();
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

        const deviceList = extractDeviceList(response.data, false);
        res.json(deviceList);
    } catch (error) {
        next(error);
    }
};

export const editMacFilter: RequestHandler = async (req, res, next) => {
    try {
        const cookies = sessionStore.getAllCookies();
        const blacklistOrWhitelist = req.body.blacklistOrWhitelist;
        const macFilterEnabledOrDisabled = req.body.macFilterEnabledOrDisabled;
        const wirelessOrEthernet = req.body.wirelessOrEthernet;
        let ontToken = req.body.ontToken;

        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, wirelessOrEthernet);

        let queryString: string;
        let params: string;

        if (wirelessOrEthernet === "ethernet") {
            queryString = `${MODEM_URL_BASE}/html/bbsp/macfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security&RequestFile=html/bbsp/macfilter/macfilter.asp`;
            params = `x.MacFilterPolicy=${blacklistOrWhitelist === "blacklist" ? "0" : "1"}&x.MacFilterRight=${macFilterEnabledOrDisabled === "enabled" ? "1" : "0"}&x.X_HW_Token=${ontToken}`;
        } else {
            queryString = `${MODEM_URL_BASE}/html/bbsp/wlanmacfilter/set.cgi?x=InternetGatewayDevice.X_HW_Security&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp`;
            params = `x.MacFilterPolicy=${blacklistOrWhitelist === "blacklist" ? "0" : "1"}&x.MacFilterRight=${macFilterEnabledOrDisabled === "enabled" ? "1" : "0"}&x.X_HW_Token=${ontToken}`;
        }


        await axios.post(queryString, params, {
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
    try {
        const cookies = sessionStore.getAllCookies();
        const { deviceMac, deviceName } = req.body.deviceToAdd;
        const wirelessOrEthernet = req.body.wirelessOrEthernet;
        const ssidName = req.body.ssidName;
        let ontToken = req.body.ontToken;

        /* 
            ! For some reason the mac address needs to be encoded with url encoding, so take the : and 
            ! replace it with %3A before sending it to the modem
        */
        let queryString: string;
        let params: string;
        const deviceMacEncoded = deviceMac.replace(/:/g, "%3A");
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, wirelessOrEthernet);

        if (wirelessOrEthernet === "ethernet") {
            queryString = `${MODEM_URL_BASE}/html/bbsp/macfilter/add.cgi?x=InternetGatewayDevice.X_HW_Security.MacFilter&RequestFile=html/bbsp/macfilter/macfilter.asp`;
            params = `x.SourceMACAddress=${deviceMacEncoded}&x.DeviceAlias=${deviceName}&x.X_HW_Token=${ontToken}`
        } else {
            queryString = `${MODEM_URL_BASE}/html/bbsp/wlanmacfilter/add.cgi?x=InternetGatewayDevice.X_HW_Security.WLANMacFilter&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp`;
            params = `x.SourceMACAddress=${deviceMacEncoded}&x.SSIDName=${ssidName}&x.DeviceName=${deviceName}&x.Enable=1&x.X_HW_Token=${ontToken}`;
        }

        await axios.post(queryString, params, {
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
    }
};

export const removeDeviceFromMacFilter: RequestHandler = async (req, res, next) => {
    try {
        const cookies = sessionStore.getAllCookies();
        const deviceIndicesToRemove: number[] = req.body.deviceIndecesToRemove;
        const wirelessOrEthernet = req.body.wirelessOrEthernet;
        let ontToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, wirelessOrEthernet);

        let queryString;
        let deviceIndicesString: string = "";

        if (wirelessOrEthernet === "ethernet") {
            queryString = `${MODEM_URL_BASE}/html/bbsp/macfilter/del.cgi?x=InternetGatewayDevice.X_HW_Security.MacFilter&RequestFile=html/bbsp/macfilter/macfilter.asp`;
            for (const index of deviceIndicesToRemove) {
                deviceIndicesString += `InternetGatewayDevice.X_HW_Security.MacFilter.${index}=&`;
            }
        } else {
            queryString = `${MODEM_URL_BASE}/html/bbsp/wlanmacfilter/del.cgi?x=InternetGatewayDevice.X_HW_Security.WLANMacFilter&RequestFile=html/bbsp/wlanmacfilter/wlanmacfilter.asp`;
            for (const index of deviceIndicesToRemove) {
                deviceIndicesString += `InternetGatewayDevice.X_HW_Security.WLANMacFilter.${index}=&`;
            }
        }




        console.log(queryString);
        console.log(`${deviceIndicesString}x.X_HW_Token=${ontToken}`);

        await axios.post(queryString, `${deviceIndicesString}x.X_HW_Token=${ontToken}`, {
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
    }
};

export const getListOfFilteredDevices: RequestHandler = async (req, res, next) => {
    /* 
        First make a get request to: http://192.168.1.254/html/bbsp/wlanmacfilter/wlanmacfilter.asp
        
        then parse the html for the following variable
    
        var MacFilterSrc = new Array(new stMacFilter("InternetGatewayDevice.X_HW_Security.WLANMacFilter.1","SSID\x2d1","Chromecast","14\x3ac1\x3a4e\x3a0f\x3aba\x3a89"),null);
    
    */
    try {
        const cookies = sessionStore.getAllCookies();

        const responseHtml = await axios.get(`${MODEM_URL_BASE}/html/bbsp/wlanmacfilter/wlanmacfilter.asp`, {
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

        const listOfFilteredDevices = extractMacFilterList(responseHtml.data);
        res.json(listOfFilteredDevices);
    } catch (error) {
        next(error);
    }
};
