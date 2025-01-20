import TOKEN_ENDPOINT from "../../../constants/TokenEndpoint";
import fetchData from "./fetchData";

const getToken = async (): Promise<string | null> => {
  try {
    const response = await fetchData(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (response.ok) {
      const token = await response.text();
      console.log("Token:", token);
      return token;
    } else {
      //Alert.alert("Failed to retrieve token.");
      return null;
    }
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
};

export default getToken;