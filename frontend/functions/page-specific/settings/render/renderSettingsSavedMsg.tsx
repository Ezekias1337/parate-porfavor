// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

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
