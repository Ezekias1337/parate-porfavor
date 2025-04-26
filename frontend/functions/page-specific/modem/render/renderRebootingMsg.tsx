// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// Styles
import modemStyles from "@/styles/page-specific/modem";

/**
 * Renders the rebooting message if the modem is rebooting.
 * @param {number} secondsBeforeLogout - The number of seconds before the logout.
 * @param {boolean} modemRebooting - The state of the modem rebooting.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered rebooting message.
*/

interface RenderRebootingMsgProps {
  secondsBeforeLogout: number;
  modemRebooting: boolean;
  translate: (key: string) => string;
}

const renderRebootingMsg = ({
  secondsBeforeLogout,
  modemRebooting,
  translate,
}: RenderRebootingMsgProps) => {
  if (modemRebooting) {
    return (
      <View style={modemStyles.alertContainer}>
        <Alert
          bodyText={`${translate(
            "modemIsRebooting"
          )} ${secondsBeforeLogout} ${translate("seconds")}`}
          variant="info"
          icon="info-circle"
        />
      </View>
    );
  }
};

export default renderRebootingMsg;
