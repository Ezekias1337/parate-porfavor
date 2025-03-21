import fetchData from "../auth/fetchData";


const createParentalControlsTemplate = async (
  name: string,
  startDate: string,
  endDate: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await fetchData("/api/parental-controls/create-parental-controls-template", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(infoOfDeviceToAdd),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create parental controls template, status: ${response.status}`
      );
    }
    return true
  } catch (error) {
    console.error("Failed to create parental controls template, status", error);
    return false;
  }
};

export default createParentalControlsTemplate;
