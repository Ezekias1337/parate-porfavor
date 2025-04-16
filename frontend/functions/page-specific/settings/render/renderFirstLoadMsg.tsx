// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

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