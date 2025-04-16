// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// Styles
import modemStyles from "@/styles/page-specific/modem";

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
