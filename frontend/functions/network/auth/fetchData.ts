import { loadEncrypted } from "@/utils/secureStorage";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  let url: string;

  const urlSettings = await loadEncrypted("urlSettings");

  if (!urlSettings || !urlSettings.serverUrl || urlSettings.serverUrl === "") {
    url = `${process.env.EXPO_PUBLIC_SERVER_IP}:${process.env.EXPO_PUBLIC_BACKEND_PORT}${input}`;
  } else {
    url = `${urlSettings.serverUrl}${input}`;
  }


  console.log("fetchData URL: ", url);


  const response = await fetch(url, {
    ...init,
    credentials: "include",
    redirect: "follow",
    headers: {
      ...(init?.headers || {}),
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
