import fetchData from "./fetchData";
import base64EncodeString from "@/utils/strings/base64EncodeString";
import urlEncodeString from "@/utils/strings/urlEncodeString";

const login = async (token: string, username: string, password: string): Promise<boolean> => {

  const hashedPasswordPreEncoding = base64EncodeString(password);
  const hashedPassword = urlEncodeString(hashedPasswordPreEncoding);

  try {
    const response = await fetchData("/api/auth/login", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: `UserName=${username}&PassWord=${hashedPassword}&x.X_HW_Token=${token}`,
      credentials: "include",
    });

    console.log("LOGIN RESPONSE:", response);

    if (response.ok) {
      console.log("Login successful!");
      return true;
    } else {
      console.error("Login failed:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Failed to login:", error);
    return false;
  }
};

export default login;
