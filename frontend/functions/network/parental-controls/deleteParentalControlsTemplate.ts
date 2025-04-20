import fetchData from "../auth/fetchData";
import getOntToken from "./getOntToken";
// Types
import OntToken from "../../../../shared/types/OntToken";

const deleteParentalControlsTemplate = async (
  templateIndex: number,
  ontToken: OntToken
): Promise<boolean> => {
  try {
    if (!ontToken) {
      throw new Error("ontToken is null");
    }

    const templateToDelete = {
      templateIndex: templateIndex,
      ontToken: ontToken
    }


    const response = await fetchData("/api/parental-controls/delete-parental-controls-template", {
      method: "DELETE",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateToDelete),
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

export default deleteParentalControlsTemplate;
