import fetchData from "../auth/fetchData";
import { Device } from "../../../../shared/types/Device";

const getDeviceList = async (): Promise<Device[] | null> => {
  try {
    const response = await fetchData("/api/mac-filter/get-device-list", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add device to mac filter, status: ${response.status}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error adding device to mac filter, status", error);
    return null
  }
};

export default getDeviceList;
