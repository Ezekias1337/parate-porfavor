import fetchData from "./fetchData";

const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await fetchData("/api/auth/refresh-token", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Token fetch error:", error);
    return false;
  }
};

export default refreshToken;
