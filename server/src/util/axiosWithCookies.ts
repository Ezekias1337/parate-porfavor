import axios from "axios";
import { wrapper } from "axios-cookiejar-support"; // Enables tough-cookie with axios
import { CookieJar } from "tough-cookie";

// Create a shared CookieJar
export const jar = new CookieJar();

// Create axios instance with cookie jar support
const axiosInstance = wrapper(
    axios.create({
        jar, // Attach the shared CookieJar
        withCredentials: true, // Ensure credentials (cookies) are sent with requests
    })
);

export default axiosInstance;
