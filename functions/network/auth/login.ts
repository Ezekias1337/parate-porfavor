import AsyncStorage from "@react-native-async-storage/async-storage";

import LOGIN_ENDPOINT from "../../../constants/LoginEndpoint";
import CREDENTIALS from "../../../constants/Credentials";

import { SetStateBoolean } from "../../../types/SetState";

import fetchData from "./fetchData";

const login = async (token: string, setIsAuthenticated: SetStateBoolean) => {
  const { USERNAME, PASSWORD } = CREDENTIALS;

  try {
    const response = await fetchData(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `UserName=${USERNAME}&PassWord=${PASSWORD}&x.X_HW_Token=${token}`,
    });

    if (response.ok) {
      const cookie = response.headers.get("Set-Cookie");
      console.log("Response Headers:", Array.from(response.headers.entries()));

      console.log("Cookie:", cookie);
      if (cookie) {
        await AsyncStorage.setItem("authCookie", cookie);
      }

      setIsAuthenticated(true);
      console.log("Token:", token);
    }
  } catch (error) {
    console.error("Failed to login:", error);
    return null;
  }
};

export default login;
