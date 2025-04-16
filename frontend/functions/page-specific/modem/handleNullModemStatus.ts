// Types
import { ModemStatus } from "../../../../shared/types/Modem";

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