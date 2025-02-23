import { RequestHandler } from "express";
import axios from "axios";
import env from "../util/validateEnv";
import sessionStore from "../session/sessionStore";




const USER_AGENT = env.USER_AGENT;
const MODEM_URL_BASE = env.MODEM_URL_BASE;





