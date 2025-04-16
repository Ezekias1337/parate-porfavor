// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import rebootModem from "@/functions/network/modem/rebootModem";
import handleFetchModemStatus from "@/functions/page-specific/modem/handleFetchModemStatus";
// Components
import Button from "@/components/Button";
// Types
import { ModemStatus } from "../../../../../shared/types/Modem";
// CSS
import modemStyles from "@/styles/page-specific/modem";

interface RenderButtonsTypes {
  setLoading: React.Dispatch<boolean>;
  setModemStatus: React.Dispatch<ModemStatus>;
  setErrorMsg: React.Dispatch<string>;
  modemRebooting: boolean;
  setModemRebooting: React.Dispatch<boolean>;
  translate: (key: string) => string;
}

const renderButtons = ({
  setLoading,
  setModemStatus,
  setErrorMsg,
  translate,
  modemRebooting,
  setModemRebooting,
}: RenderButtonsTypes) => {
  return (
    <View style={modemStyles.buttonContainer}>
      <Button
        text={translate("rebootModem")}
        variant="primary"
        onClickHandler={async () => {
          await rebootModem();
          setModemRebooting(true);
        }}
        loading={modemRebooting}
        icon="power-off"
        leftIcon
      />
      <Button
        variant="primaryDark"
        text={translate("refresh")}
        onClickHandler={async () =>
          handleFetchModemStatus({
            setLoading,
            setModemStatus,
            setErrorMsg,
            translate,
          })
        }
        icon="refresh"
        leftIcon
      />
    </View>
  );
};

export default renderButtons;
