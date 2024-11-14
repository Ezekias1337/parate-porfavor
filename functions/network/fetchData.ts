import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import ORIGIN_URL_BASE from "../../constants/RouterIp";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const url = `${ORIGIN_URL_BASE}${input}`;
  const authCookie = await AsyncStorage.getItem("authCookie");

  const response = await fetch(url, {
    ...init,
    credentials: "include",
    redirect: "follow",
    headers: {
      ...(init?.headers || {}),
      Cookie: authCookie || "", // Add the cookie to headers if available
    },
  });

  if (response.ok || response.redirected) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.message;
    const consoleError = errorBody.error;

    console.log(errorBody);
    console.log(errorMessage);
    console.log(consoleError);

    // Throwing a custom error object that preserves the original error details
    throw { message: errorMessage, error: consoleError };
  }
};

export default fetchData;
