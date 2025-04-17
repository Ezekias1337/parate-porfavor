import { loadEncrypted } from "@/utils/secureStorage";

const fetchData = async (input: RequestInfo, init?: RequestInit, logUrl?: boolean) => {
  const urlSettings = await loadEncrypted("urlSettings");

  if (!urlSettings || !urlSettings.serverUrl || urlSettings.serverUrl.trim() === "") {
    throw new Error("Missing server URL in secure storage.");
  }

  const url = `${urlSettings.serverUrl}${input}`;

  if (logUrl) {
    console.log("fetchData URL: ", url);
  }

  const response = await fetch(url, {
    ...init,
    credentials: "include",
    redirect: "follow",
    headers: {
      ...(init?.headers || {}),
      "x-modem-url": urlSettings.modemUrl ?? "",
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

    throw { message: errorMessage, error: consoleError };
  }
};

export default fetchData;
