import fetchData from "./fetchData";

const getToken = async (): Promise<string | null> => {
  try {
    const response = await fetchData("/api/auth/get-token", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (response.ok) {
      const token = await response.text();
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
};

export default getToken;