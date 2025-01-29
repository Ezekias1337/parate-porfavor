// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
// Functions, Helpers, and Utils
import sessionStore from "../session/sessionStore";
import runCurlCommand from "../util/runCurlCommand";

const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;


/* 
    ? x.X_HW_Token is used for logging in, but it also changes for certain requests.
    ? These requests are on pages that have additional .asp files with a hidden input field
    ? with a name of onttoken and an id of "hwonttoken". Grabbing the value attribute from
    ? this field should allow the request to go through.
    ? https://medium.com/@nikowahyufitrianto28/are-you-still-manually-reboot-the-router-lets-automate-it-using-python-python-study-case-41e817098f5a
    
    
    ? For example, in parentalctrlmac.asp, the token is stored in the hidden input field as such:
    ? <input type="hidden" name="onttoken" id="hwonttoken" value="f02a7a5399d7e2521c8cf1117524f99d43b50792149af218">
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
        res.json(response.data);
    } catch (error) {
        next(error);
    }
};


/* 
    ! The reason that CURL commands are being used here for login is because of security   
    ! limitations javascript not exposing the set-cookie header. As a result in order to get the
    ! sid cookie which is used for all subsequent requests (unchanging per session and different from
    ! the x.X_HW_Token cookie)
    
    ! The session cookie from logging in needs to be stored and used for subsequent requests.
*/

export const login: RequestHandler = async (req, res, next) => {
    const { UserName, PassWord, x_X_HW_Token } = req.body;
    const url = `${process.env.MODEM_URL_BASE}/login.cgi`;
    const curlCommand = `
        curl -s -X POST "${url}" \
        -H "User-Agent: ${USER_AGENT}" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -H "Accept: */*" \
        -H "Accept-Language: en-US,en;q=0.5" \
        -H "X-Requested-With: XMLHttpRequest" \
        -H "Cookie: body:Language:english:id=-1" \
        --data-urlencode "UserName=${UserName}" \
        --data-urlencode "PassWord=${PassWord}" \
        --data-urlencode "x.X_HW_Token=${x_X_HW_Token}" \
        -c cookies.txt
    `;

    try {
        await runCurlCommand(curlCommand);

        const fs = require("fs");
        const cookieFile = fs.readFileSync("cookies.txt", "utf8");
        const sidMatch = cookieFile.match(/sid=([^\s;]+)/);
        if (!sidMatch) {
            throw new Error("Failed to retrieve SID from cookies");
        }

        const rawCookieString = sidMatch[0];
        const cookieString = `Cookie=${rawCookieString}`;

        /* 
            ! Now that I successfully have retrieved the cookie string, I just need to store it in the sessionStore
            ! so that all subsequent requests can use it.
        */
        sessionStore.setCookie("loginToken", cookieString);

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
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

