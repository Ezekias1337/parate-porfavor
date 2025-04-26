// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

/**
 * Renders the settings saved message if the settings are saved.
 * @param {boolean} settingsSaved - The state of the settings saved.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered settings saved message.
*/

interface RenderSettingsSavedMsgProps {
  settingsSaved: boolean;
  translate: (key: string) => string;
}

const renderSettingsSavedMsg = ({
  settingsSaved,
  translate,
}: RenderSettingsSavedMsgProps) => {
  if (settingsSaved) {
    return (
      <View style={settingsStyles.alertContainer}>
        <Alert
          bodyText={translate("settingsSaved")}
          variant="success"
          icon="check-circle"
        />
      </View>
    );
  }
};

export default renderSettingsSavedMsg;
