// Functions, Helpers, Utils, and Hooks
import getModemStatus from "@/functions/network/modem/getModemStatus";
// Types
import { ModemStatus } from "../../../../shared/types/Modem";

/**
 * Handles fetching the modem status.
 * @param setLoading The function to set the loading state.
 * @param setModemStatus The function to set the modem status.
 * @param setErrorMsg The function to set the error message.
 * @param translate The function to translate the text.
 * @returns {Promise<void>} A promise that resolves when the modem status is fetched.
*/

interface handleFetchModemStatusProps {
    setLoading: React.Dispatch<boolean>;
    setModemStatus: React.Dispatch<ModemStatus>;
    setErrorMsg: React.Dispatch<string>;
    translate: (key: string) => string;
}

const handleFetchModemStatus = async ({ setLoading, setModemStatus, setErrorMsg, translate }: handleFetchModemStatusProps) => {
    setLoading(true);
    const status = await getModemStatus();

    if (status === null) {
        setErrorMsg(translate("serverError"));
    } else {
        setModemStatus(status);
    }
    setLoading(false);
}

export default handleFetchModemStatus