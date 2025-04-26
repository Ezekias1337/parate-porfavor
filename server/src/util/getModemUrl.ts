// Library Imports
import { Request } from "express";
// Constants
import env from "../util/validateEnv";

/**
 * Gets the modem url from the request headers or the environment variable
 * @param {Request} req - The request object
 * @param {boolean} logUrl - Whether or not to log the modem url
 * @returns {string} - The modem url
*/

const MODEM_URL_BASE = env.MODEM_URL_BASE;

const getModemUrl = (req: Request, logUrl: boolean = false): string => {
    const modemUrl = req.headers['x-modem-url'] as string;

    if (logUrl) {
        console.log(`Modem URL: ${modemUrl}`);
    }
    return modemUrl ?? MODEM_URL_BASE;
};

export default getModemUrl;