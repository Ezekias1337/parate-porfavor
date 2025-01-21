// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import createHttpError from "http-errors";
import env from "../util/validateEnv";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;

/* 
    x.X_HW_Token is used for logging in, but it also changes for certain requests.
    These requests are on pages that have additional .asp files with a hidden input field
    with a name of onttoken and an id of "hwonttoken". Grabbing the value attribute from
    this field should allow the request to go through.
    https://medium.com/@nikowahyufitrianto28/are-you-still-manually-reboot-the-router-lets-automate-it-using-python-python-study-case-41e817098f5a
    
    
    For example, in parentalctrlmac.asp, the token is stored in the hidden input field as such:
    <input type="hidden" name="onttoken" id="hwonttoken" value="f02a7a5399d7e2521c8cf1117524f99d43b50792149af218">
*/

export const getToken: RequestHandler = async (req, res, next) => {
    try {
        const response = await axios.post(`${MODEM_URL_BASE}/asp/GetRandCount.asp`, null, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        res.json({ token: response.data });
    } catch (error) {
        next(error);
    }
};

/* 
    The session cookie from logging in needs to be stored and used for subsequent requests.
*/

export const login: RequestHandler = async (req, res, next) => {
    const { username, password, token } = req.body;
    let sessionCookie = "";

    try {
        const response = await axios.post(`${MODEM_URL_BASE}/login.cgi`, null, {
            params: {
                UserName: username,
                PassWord: password,
                "x.X_HW_Token": token,
            },
            headers: {
                "User-Agent":
                    USER_AGENT,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                Connection: "keep-alive",
                "X-Requested-With": "XMLHttpRequest",
                "Upgrade-Insecure-Requests": "1",
                Pragma: "no-cache",
                "Cache-Control": "no-cache",
            },
        });

        console.log("response:", response.data);

        const cookies = response.headers["set-cookie"];
        sessionCookie = (cookies && cookies.join("; ")) || "";
        console.log("cookies:", cookies);
        console.log("sessionCookie:", sessionCookie);

        res.json({ token: response.data });

        //res.status(200).json(websiteOrAppFromDB);
    } catch (error) {
        next(error);
    }
};

export const turnOffModem: RequestHandler = async (req, res, next) => {
    try {
        const token = req.body.token;
        const response = await axios.post(`${MODEM_URL_BASE}/html/ssmp/reset/set.cgi?x=InternetGatewayDevice.X_HW_DEBUG.SMP.DM.ResetBoard&RequestFile=html/ssmp/reset/reset.asp`, null, {
            method: "POST",
            //credentials: "include", // Ensure authentication is handled with cookies
            headers: {
                "User-Agent":
                    USER_AGENT,
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                Priority: "u=4",
            },
            params: {
                "x.X_HW_Token": token,
            },
            //referrer: `${env.ORIGIN_URL_BASE}/html/ssmp/reset/reset.asp`,
           
        });
        res.json({ token: response.data });
    } catch (error) {
        next(error);
    }
};

