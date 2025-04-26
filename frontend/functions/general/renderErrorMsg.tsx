// Library Imports
import { View } from "react-native";
// Components
import Alert from "@/components/Alert";
// CSS
import deviceStyles from "../../styles/page-specific/device";


/**
 * Renders the error message if it exists.
 * @param {string | null} errorMsg - The error message to be rendered.
 * @returns {ReactNode} jsx - The JSX to be rendered.
*/

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