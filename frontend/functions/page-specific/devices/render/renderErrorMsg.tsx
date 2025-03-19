// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";

const renderErrorMsg = (errorMsg: string | null) => {
  if (errorMsg) {
    return (
      <View style={deviceStyles.alertContainer}>
        <Alert
          bodyText={errorMsg}
          variant="error"
          icon="exclamation-triangle"
        />
      </View>
    );
  }
};

export default renderErrorMsg;