// Functions, Helpers, Utils, and Hooks
import getParentalControlsData from "@/functions/network/parental-controls/getParentalControlsData";
// Types
import { ParentalControlsData } from "../../../../shared/types/ParentalControls";

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