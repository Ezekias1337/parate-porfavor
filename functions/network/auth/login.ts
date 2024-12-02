import AsyncStorage from "@react-native-async-storage/async-storage";

import LOGIN_ENDPOINT from "../../../constants/LoginEndpoint";
import CREDENTIALS from "../../../constants/Credentials";

import { SetStateBoolean } from "../../../types/SetState";

import fetchData from "./fetchData";
import base64EncodeString from "@/utils/strings/base64EncodeString";
import urlEncodeString from "@/utils/strings/urlEncodeString";

const login = async (token: string, password: string) => {
  const { USERNAME } = CREDENTIALS;
  const hashedPasswordPreEncoding = base64EncodeString(password);
  const hashedPassword = urlEncodeString(hashedPasswordPreEncoding);

  try {
    const response = await fetchData(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `UserName=${USERNAME}&PassWord=${hashedPassword}&x.X_HW_Token=${token}`,
    });

    if (response.ok) {
      console.log("Login successful!");
      return true;
    }

    console.error("Login failed:", response.status);
    return false; // Indicate login failure
  } catch (error) {
    console.error("Failed to login:", error);
    return false;
  }
};

export default login;
