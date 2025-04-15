// Library Imports
import { View, Dimensions } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import fetchDevicesAndParentalControls from "@/functions/page-specific/devices/fetchDevicesAndParentalControls";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Types
import { ListOfStateSetters } from "../../../../screens/Devices";

const renderButtons = (
  {
    setDevices,
    setParentalControls,
    setLoading,
    setErrorMsg,
  }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  const { width: screenWidth } = Dimensions.get("window");
  
  return (
    <View style={[deviceStyles.buttonContainer,  { width: screenWidth < 500 ? "85%" : "25%" },]}>
      <Button
        variant="primary"
        buttonSize="small"
        text={`${translate("refresh")} ${translate("devices")}`}
        onClickHandler={async () => {
          await fetchDevicesAndParentalControls(
            { setDevices, setParentalControls, setLoading, setErrorMsg },
            translate
          );
        }}
        icon="refresh"
        leftIcon
      />
    </View>
  );
};

export default renderButtons;
