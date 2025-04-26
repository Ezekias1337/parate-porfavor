// Functions, Helpers, Utils, and Hooks
import fetchData from "./fetchData";
import getToken from "./getToken";
import base64EncodeString from "@/utils/strings/base64EncodeString";

/**
 * Logs in the user.
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {Promise<string | null>} - The authentication token or null if not found.
*/

const login = async (username: string, password: string): Promise<string | null> => {
  const hashedPasswordPreEncoding = base64EncodeString(password);

  try {
    const token = await getToken();
    if(token === null) {
      throw new Error("Failed to get token");
    }
    const response = await fetchData("/api/auth/login", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ UserName: username, PassWord: hashedPasswordPreEncoding, x_X_HW_Token: token }),
      credentials: "include",
    });

    if (response.ok) {
      return token;
    } else {
      console.error("Login failed:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Failed to login:", error);
    return null;
  }
};

export default login;
