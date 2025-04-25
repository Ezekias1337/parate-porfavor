// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
// Auth
import sessionStore from "../session/sessionStore";
// Functions, Helpers, and Utils
import fetchOntToken from "../util/fetchOntToken";
import extractParentalControlsData from "../util/extractParentalControlsData";
import getModemUrl from "../util/getModemUrl";
// Types
import { ParentalControlsData, startTime, endTime, repeatDays } from "../../../shared/types/ParentalControls";
import OntToken from "@shared/types/OntToken";
// Environment Variables
const USER_AGENT = env.USER_AGENT;


/*        
        Parental Control Help
            The parental control function allows parents to set different constraints for the network surfing time and website access on working days and holidays. In this way, their children are allowed to access networks in specified time segments and free from age inappropriate contents. Configure multiple parental control policy templates as required, use MAC addresses to identify children web devices (such as a PC or Pad), and associate different web devices with different templates.
            Template
            On the Template tab page, click Add. Enter the template name, for example, kids. Then configure the parental control template step by step based on the configuration wizard.
            Note:
            1.A maximum of four time segments during which network surfing is allowed can be configured in each template.
            2.The whitelist and blacklist are mutually exclusive in a template when you configure the website filtering policy.
            3.A maximum of 128 websites can be configured for the filtering policy in each template.
            4.A maximum of eight templates can be configured.
            Overview
            On the Overview tab page, bind web devices with the template configured (the kids template is used as an example here). If Apply on all devices is selected, all the web devices will perform network access control based on the kids template. If Apply on specified devices is selected, only the specified web devices will perform network access control based on the kids template.
            Note:
            1.A web device can be associated with only one template.
            2.To change the template with which a device is associated, delete the device from the template, and click Add to bind a new template to this device.
*/

export const fetchOntTokenSourceHandler = async (ontToken: OntToken, cookies: string, MODEM_URL_BASE: string): Promise<string | null> => {
    try {
        if (ontToken === null) {
            const ontTokenSource = await axios.get(`${MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrlmac.asp`, {
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
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        let ontToken: OntToken = req.body.ontToken;
        const tokenToReturn: OntToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);
        res.json(tokenToReturn);
    } catch (error) {
        next(error);
    }
}

export const getParentalControlsData: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);
        const responseHtml = await axios.get(`${MODEM_URL_BASE}/html/bbsp/common/parentalctrlinfo.asp`, {
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

        const parentalControlsData: ParentalControlsData = extractParentalControlsData(responseHtml.data);
        res.json(parentalControlsData);
    } catch (error) {
        next(error);
    }
};


export const addDeviceToParentalControls: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const { deviceMac, deviceDescription, templateInst } = req.body.deviceToAdd;
        let ontToken: OntToken = req.body.ontToken;


        // Refresh the ontToken if needed
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        const url = `${process.env.MODEM_URL_BASE}/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC&RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`;
        const queryString = `x.MACAddress=${deviceMac}&x.Description=${deviceDescription}&x.TemplateInst=${templateInst}&x.X_HW_Token=${ontToken}`;

        await axios.post(url, queryString, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "Referer": `${process.env.MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrlmac.asp`,
                "Origin": `${process.env.MODEM_URL_BASE}`,
                "Cookie": cookies,
            },
        });
        res.json(true);
    } catch (error) {
        next(error);
    }
};


export const addTimePeriodToParentalControls: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const startTime: startTime = req.body.startTime;
        const endTime: endTime = req.body.endTime;
        const repeatDays: repeatDays = req.body.repeatDays;
        const templateNumber: number = req.body.templateNumber;
        const durationNumber: number | null = req.body.durationNumber;
        const usedIds: number[] = req.body.usedIds;
        const isEditingRestriction: boolean = req.body.isEditingRestriction;

        if (usedIds.length >= 4) {
            throw new Error("There is a maximum of 4 scheduled restrictions that can be added to each template.");
        }

        let ontToken: OntToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        let isFirstTemplate = false;
        if (durationNumber === null) {
            isFirstTemplate = true;
        }

        const urlString = `${MODEM_URL_BASE}/html/bbsp/parentalctrl/${isFirstTemplate || isEditingRestriction ? "set" : "add"}.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.${templateNumber}.Duration${isEditingRestriction ? `.${durationNumber}` : ""}&y=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.${templateNumber}&RequestFile=html/ipv6/not_find_file.asp`;
        const queryString = `x.StartTime=${startTime}&x.EndTime=${endTime}&x.RepeatDay=${repeatDays.join(",")}&y.DurationRight=0&y.DurationPolicy=0&x.X_HW_Token=${ontToken}`;

        console.log("urlString: ", urlString);
        console.log("queryString: ", queryString);

        const response = await axios.post(urlString, queryString, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                Priority: "u=0",
                referrer: `${MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrltime.asp?TemplateId=${templateNumber}&FlagStatus=EditTemplate`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        if (response.status === 200) {
            res.json(true);
        } else {
            console.error("Failed to add time period to parental controls template, status:", response.status);
            throw new Error(
                `Failed to add time period to parental controls template, status: ${response.status}`
            );
        }
    } catch (error) {
        next(error);
    }
};

export const createParentalControlsTemplate: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const templateName: string = req.body.templateName;
        const templateStartDate: startTime = req.body.templateStartDate; // 2025-03-21 from modem's frontend gui should be sent as 20250321
        const templateEndDate: endTime = req.body.templateEndDate;

        let ontToken: OntToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        const queryString = `x_SAVE_A.Name=${templateName}&x_SAVE_A.StartDate=${templateStartDate === 0 ? "" : templateStartDate}&x_SAVE_A.EndDate=${templateEndDate === 0 ? "" : templateEndDate}&x.X_HW_Token=${ontToken}`;

        const response = await axios.post(`${MODEM_URL_BASE}/html/bbsp/parentalctrl/add.cgi?x_SAVE_A=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates&RequestFile=html/bbsp/parentalctrl/parentalctrltime.asp`, queryString, {
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

        if (response.status === 200) {
            res.json(true);
        } else {
            console.error("Failed to create parental controls template, status:", response.status);
            throw new Error(
                `Failed to create parental controls template, status: ${response.status}`
            );
        }
    } catch (error) {
        next(error);
    }
};



export const removeDeviceFromParentalControls: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const macIndex: number = req.body.macIndex;

        let ontToken: OntToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        const queryString = `InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC.${macIndex}=&x.X_HW_Token=${ontToken}`;

        const response = await axios.post(`${MODEM_URL_BASE}/html/bbsp/parentalctrl/del.cgi?RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`, queryString, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Priority": "u=4",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC&RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        if (response.status === 200) {
            res.json(true);
        } else {
            console.error("Failed to remove device from parental controls template, status:", response.status);
            throw new Error(
                `Failed to remove device from parental controls template, status: ${response.status}`
            );
        }
    } catch (error) {
        next(error);
    }
};

export const deleteParentalControlsTemplate: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const templateIndex: number = req.body.templateIndex;
        let ontToken: OntToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        const queryString = `InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.${templateIndex}=&x.X_HW_Token=${ontToken}`;


        const response = await axios.post(`${MODEM_URL_BASE}/html/bbsp/parentalctrl/del.cgi?&RequestFile=/html/bbsp/parentalctrl/parentalctrlstatus.asp`, queryString, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Priority": "u=0",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrltemplate.asp`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        /* 
            ? For some reason even when making this request directly from the modem control panel
            ? the response code is 404 even when it is successful
        */
        if (response.status === 404) {
            res.json(true);
        } else {
            console.error("Failed to remove device from parental controls template, status:", response.status);
            throw new Error(
                `Failed to remove device from parental controls template, status: ${response.status}`
            );
        }

    } catch (error) {
        next(error);
    }
}

export const removeTimePeriodFromParentalControls: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);

        const templateNumber: number = req.body.templateNumber;
        const durationNumber: number = req.body.durationNumber;
        let ontToken: OntToken = req.body.ontToken;
        ontToken = await fetchOntTokenSourceHandler(ontToken, cookies, MODEM_URL_BASE);

        const queryString = `InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.${templateNumber}.Duration.${durationNumber}=&x.X_HW_Token=${ontToken}`;

        const response = await axios.post(`${MODEM_URL_BASE}/html/bbsp/parentalctrl/del.cgi?&RequestFile=html/ipv6/not_find_file.asp`, queryString, {
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Priority": "u=0",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                referrer: `${MODEM_URL_BASE}/html/bbsp/parentalctrl/parentalctrltime.asp?TemplateId=${templateNumber}&FlagStatus=EditTemplate`,
                mode: "cors",
                "Cookie": cookies,
            },
        });

        /* 
            ? For some reason even when making this request directly from the modem control panel
            ? the response code is 404 even when it is successful
        */
        if (response.status === 404) {
            res.json(true);
        } else {
            console.error("Failed to remove time period from parental controls template, status:", response.status);
            throw new Error(
                `Failed to remove time period from parental controls template, status: ${response.status}`
            );
        }

    } catch (error) {
        next(error);
    }
}


