import { CookieJar } from "tough-cookie";

const jar = new CookieJar();

export const getCookieJar = () => jar;

export default jar;
