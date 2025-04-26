// Library Imports
import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  BACKEND_PORT: port(),
  ORIGIN_URL_BASE: str(),
  MODEM_URL_BASE: str(),
  IS_DEV: str(),
  USER_AGENT: str(),
});