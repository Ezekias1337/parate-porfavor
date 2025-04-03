import fetchData from "../auth/fetchData";
import OntToken from "../../../../shared/types/OntToken";

const getOntToken = async (
  ontToken: OntToken
): Promise<OntToken> => {
  try {
    if (typeof ontToken === "string") {
      return ontToken;
    }
    const response = await fetchData("/api/parental-controls/get-ont-token", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ontToken),
    });

    const responseJson = await response.json();
    if (!response.ok || responseJson === null) {
      throw new Error(
        `Failed to fetch ontToken, status: ${response.status}`
      );
    }
    console.log("responseJson for ONT Token", responseJson);

    return responseJson;
  } catch (error) {
    console.error("Error fetching ontToken:", error);
    return null;
  }
};

export default getOntToken;
