// Functions, Helpers, Utils, and Hooks
import getParentalControlsData from "@/functions/network/parental-controls/getParentalControlsData";
// Types
import { ListOfParentalControlsStateSetters } from "../../../screens/Devices";

const fetchParentalControlsData = async (
    { setParentalControls, setLoading, setErrorMsg }: ListOfParentalControlsStateSetters,
    translate: (key: string) => string
): Promise<void> => {
    setLoading(true);

    try {
        const parentalControlsToSet = await getParentalControlsData();

        if (!parentalControlsToSet) {
            setErrorMsg(translate("serverError"));
            setParentalControls({
                templates: [],
                connectionAttempts: 0,
                devices: [],
                timeRestrictions: {},
            })
        } else {
            setErrorMsg(null);
            setParentalControls(parentalControlsToSet);
        }
    } catch (error) {
        setErrorMsg(translate("fetchError"));
    }

    setLoading(false);
};

export default fetchParentalControlsData;