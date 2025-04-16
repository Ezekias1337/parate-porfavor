import { Request } from "express";
import env from "../util/validateEnv";
const MODEM_URL_BASE = env.MODEM_URL_BASE;

const getModemUrl = (req: Request, logUrl: boolean = false): string => {
    const modemUrl = req.headers['x-modem-url'] as string;

    if (logUrl) {
        console.log(`Modem URL: ${modemUrl}`);
    }
    return modemUrl ?? MODEM_URL_BASE;
};

export default getModemUrl;