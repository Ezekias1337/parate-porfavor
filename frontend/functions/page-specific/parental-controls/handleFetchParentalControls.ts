// Functions, Helpers, Utils, and Hooks
import getParentalControlsData from "@/functions/network/parental-controls/getParentalControlsData";
// Types
import { ParentalControlsData } from "../../../../shared/types/ParentalControls";

/**
 * Fetches the parental controls data and sets it in the state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ParentalControlsData>>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setErrorMsg - The function to set the error message state.
 * @param {Function} translate - The function to translate the text.
 * @returns {Promise<ParentalControlsData>} A promise that resolves to the parental controls data.
*/

interface handleFetchParentalControlsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setParentalControls: React.Dispatch<React.SetStateAction<ParentalControlsData>>
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
    translate: (key: string) => string;
}

const handleFetchParentalControls = async ({ setLoading, setParentalControls, setErrorMsg, translate }: handleFetchParentalControlsProps): Promise<ParentalControlsData> => {
    let parentalControlsData: ParentalControlsData = {
        templates: [],
        connectionAttempts: 0,
    }

    try {
        setLoading(true);
        parentalControlsData = await getParentalControlsData();
        setParentalControls(parentalControlsData);
        setLoading(false);

    } catch (error) {
        console.error("Error fetching parental controls data:", error);
        setErrorMsg(translate("serverError"));
        setLoading(false);
    }

    return parentalControlsData
}

export default handleFetchParentalControls