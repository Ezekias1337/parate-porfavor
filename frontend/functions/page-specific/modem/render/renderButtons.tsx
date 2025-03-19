// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import fetchDevices from "../fetchDevices";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Types
import { ListOfStateSetters } from "../../../../screens/Devices";

const renderButtons = (
  {
    setDevices,
    setFilteredDevices,
    setLoading,
    setErrorMsg,
  }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  return (
    <View style={deviceStyles.buttonContainer}>
      <Button
        variant="primary"
        buttonSize="small"
        text={`${translate("refresh")} ${translate("devices")}`}
        onClickHandler={() =>
          fetchDevices(
            { setDevices, setFilteredDevices, setLoading, setErrorMsg },
            translate
          )
        }
        icon="refresh"
        leftIcon
      />
    </View>
  );
};

export default renderButtons;
