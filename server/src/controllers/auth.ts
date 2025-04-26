// Library Imports
import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
// Auth
import sessionStore from "../session/sessionStore";
// Functions, Helpers, and Utils
import runCurlCommand from "../util/runCurlCommand";
import getModemUrl from "../util/getModemUrl";
// Types
import OntToken from "@shared/types/OntToken";
// Environment Variables
const USER_AGENT = env.USER_AGENT;

/* 
    ? x.X_HW_Token is used for logging in, but it also changes for certain requests.
    ? These requests are on pages that have additional .asp files with a hidden input field
    ? with a name of onttoken and an id of "hwonttoken". Grabbing the value attribute from
    ? this field should allow the request to go through.
    ? https://medium.com/@nikowahyufitrianto28/are-you-still-manually-reboot-the-router-lets-automate-it-using-python-python-study-case-41e817098f5a
    
    
    ? For example, in parentalctrlmac.asp, the token is stored in the hidden input field as such:
    ? <input type="hidden" name="onttoken" id="hwonttoken" value="f02a7a5399d7e2521c8cf1117524f99d43b50792149af218">
*/

const handleGetToken = async (MODEM_URL_BASE: string): Promise<String | null> => {
    try {

        const response = await axios.post(`${MODEM_URL_BASE}/asp/GetRandCount.asp`, null, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        return response.data;
    } catch (error) {
        return null
    }
}


export const getToken: RequestHandler = async (req, res, next) => {
    try {
        const MODEM_URL_BASE = getModemUrl(req);
        const response = await handleGetToken(MODEM_URL_BASE);
        
        res.json(response);
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
    try {
      const MODEM_URL_BASE = getModemUrl(req);
      const { UserName, PassWord, x_X_HW_Token } = req.body;
      const url = `${MODEM_URL_BASE}/login.cgi`;
  
      const curlCommand = `
        curl -i -s -X POST "${url}" \
        -H "User-Agent: ${USER_AGENT}" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -H "Accept: */*" \
        -H "Accept-Language: en-US,en;q=0.5" \
        -H "X-Requested-With: XMLHttpRequest" \
        -H "Cookie: body:Language:english:id=-1" \
        --data-urlencode "UserName=${UserName}" \
        --data-urlencode "PassWord=${PassWord}" \
        --data-urlencode "x.X_HW_Token=${x_X_HW_Token}" \
        -D - 
      `;
  
      const responseOutput = await runCurlCommand(curlCommand);
  
      // Extract SID from headers
      const sidMatch = responseOutput.match(/sid=([^\s;]+)/);
      if (!sidMatch) {
        throw new Error("Failed to retrieve SID from headers");
      }
  
      const rawCookieString = sidMatch[0];
      const cookieString = `Cookie=${rawCookieString}`;
  
      sessionStore.setCookie("loginToken", cookieString);
  
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };
  

export const logout: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        /* 
            ? For some reason in order to hit the logout endpoint, we need to make a request to 
            ? GetRandCount.asp first even though the response data from it is not even used.
        */
        const MODEM_URL_BASE = getModemUrl(req);
        await handleGetToken(MODEM_URL_BASE);
        const ontTokenSource = await axios.post(`${MODEM_URL_BASE}/html/ssmp/common/GetRandToken.asp`, null, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": cookies,
            },
        });

        const ontToken: OntToken = ontTokenSource.data;
        await axios.post(`${MODEM_URL_BASE}/logout.cgi?RequestFile=html/logout.html`, `x.X_HW_Token=${ontToken}`, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                Referer: `${MODEM_URL_BASE}/index.asp`,
                "Content-Type": "application/x-www-form-urlencoded",
                "Priority": "u=0, i",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                mode: "cors",
                "Cookie": cookies,
            },
        });
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
    try {
        const cookies: string = sessionStore.getAllCookies();
        const MODEM_URL_BASE = getModemUrl(req);
        await axios.get(`${MODEM_URL_BASE}/html/ssmp/common/refreshTime.asp`, {
            headers: {
                Host: MODEM_URL_BASE,
                "User-Agent": USER_AGENT,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                referrer: `${MODEM_URL_BASE}/refresh.asp`,
                "Connection": "keep-alive",
                "Cookie": cookies,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                mode: "cors",
            },
        });
        res.json(true);
    } catch (error) {
        next(error);
    }
};

