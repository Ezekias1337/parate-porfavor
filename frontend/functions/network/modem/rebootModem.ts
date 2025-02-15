import fetchData from "../auth/fetchData";

const rebootModem = async (): Promise<boolean> => {
  try {
    const response = await fetchData("/api/modem/reboot-modem", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to reboot modem: ${response.status}`
      );
    }
    return true;
  } catch (error) {
    console.error("Error fetching modem status:", error);
    return false;
  }
};

export default rebootModem;
