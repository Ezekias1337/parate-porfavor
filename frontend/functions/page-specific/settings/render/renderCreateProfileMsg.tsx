// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

/**
 * Renders the first load message if the app is first loaded.
 * @param {boolean} isFirstLoad - The state of the first load.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered first load message.
 */

interface RenderCreateProfileMsgProps {
  translate: (key: string) => string;
}
const renderCreateProfileMsg = ({ translate }: RenderCreateProfileMsgProps) => {
  return (
    <View style={settingsStyles.alertContainer}>
      <Alert
        bodyText={translate("createProfileInstructions")}
        variant="info"
        icon="info-circle"
      />
    </View>
  );
};

export default renderCreateProfileMsg;
