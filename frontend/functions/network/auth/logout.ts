// Functions, Helpers, Utils, and Hooks
import fetchData from "./fetchData";

/**
 * Logs out the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the logout was successful, false otherwise.
*/

const logout = async (): Promise<boolean> => {
  try {
    const response = await fetchData("/api/auth/logout", {
      method: "POST",
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

export default logout;
