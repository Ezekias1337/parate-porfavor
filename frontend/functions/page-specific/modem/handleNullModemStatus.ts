// Types
import { ModemStatus } from "../../../../shared/types/Modem";

/**
 * Handles the case where the modem status is null.
 * @param {ModemStatus | null} modemStatus - The modem status.
 * @param {Function} setErrorMsg - The function to set the error message.
 * @param {Function} translate - The function to translate the text.
 * @returns {void}
*/

interface handleNullModemStatusProps {
    modemStatus: ModemStatus | null;
    setErrorMsg: React.Dispatch<string | null>;
    translate: (key: string) => string;
}

const handleNullModemStatus = ({ modemStatus, setErrorMsg, translate }: handleNullModemStatusProps) => {
    if (
        modemStatus?.cpuUsed === null ||
        modemStatus?.memUsed === null ||
        modemStatus?.systemTime === null
    ) {
        setErrorMsg(translate("errorGettingModemStatus"));
    }
}

export default handleNullModemStatus;