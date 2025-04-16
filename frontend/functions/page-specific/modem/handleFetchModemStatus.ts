// Functions, Helpers, Utils, and Hooks
import getModemStatus from "@/functions/network/modem/getModemStatus";
// Types
import { ModemStatus } from "../../../../shared/types/Modem";

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