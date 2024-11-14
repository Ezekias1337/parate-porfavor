import TWO_G_ENDPOINT from "../../constants/2gEndpoint";
import fetchData from "./fetchData";

const view2G = async (): Promise<string | null> => {
  try {
    const response = await fetchData(TWO_G_ENDPOINT, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        Priority: "u=4",
      },
      referrer: "http://192.168.1.254/index.asp",
      mode: "cors",
    });

    console.log("FULL RESPONSE:", response);
    
    if (response.ok) {
      const token = await response.text();
      console.log("responseFromTest:", token);
      return token;
    } else {
      //Alert.alert("Failed to retrieve token.");
      console.log("responseFromTestError:", response);
      return null;
    }
  } catch (error) {
    console.error("Test fetch error:", error);
    return null;
  }
};

export default view2G;



await fetch("http://192.168.1.254/html/bbsp/common/GetLanUserDevInfo.asp", {
  "credentials": "include",
  "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "X-Requested-With": "XMLHttpRequest"
  },
  "referrer": "http://192.168.1.254/html/bbsp/userdevinfo/userdevinfo.asp",
  "method": "POST",
  "mode": "cors"
});