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

interface RenderFirstLoadMsgProps {
  isFirstLoad: boolean;
  translate: (key: string) => string;
}
const renderFirstLoadMsg = ({
  isFirstLoad,
  translate,
}: RenderFirstLoadMsgProps) => {
  if (isFirstLoad) {
    return (
      <View style={settingsStyles.alertContainer}>
        <Alert
          bodyText={translate("serverUrlNeeded")}
          variant="info"
          icon="info-circle"
        />
      </View>
    );
  }
};

export default renderFirstLoadMsg;