// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";
import addDeviceToMacFilter from "../addDeviceToMacFilterHandler";
import displayParentalControlsModal from "../displayParentalControlsModal";

import renderDeviceCardButton1 from "./renderDeviceCardButton1";
import renderDeviceCardButton2 from "./renderDeviceCardButton2";
import extractParentalControlsDevicesFromTemplates from "../extractParentalControlsDevicesFromTemplates";
// Components
import Card from "@/components/Card";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ParentalControlsData, ParentalControlsDevice } from "../../../../../shared/types/ParentalControls";
import { ButtonProps } from "@/components/Button";
import OntToken from "../../../../../shared/types/OntToken";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Functions, Helpers, Utils, and Hooks

interface ListOfStateSetters {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
}

const renderDeviceCards = (
  ontToken: OntToken,
  devices: Device[],
  filteredDevices: Device[],
  parentalControls: ParentalControlsData,
  {
    setModalVisible,
    setDevices,
    setFilteredDevices,
    setModalDevice,
    setOntToken,
  }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  const arrayOfParentalControlDevices =
    extractParentalControlsDevicesFromTemplates(parentalControls);
  const mergedDeviceArray: ParentalControlsDevice[] = [
    ...arrayOfParentalControlDevices,
    ...filteredDevices,
    ...devices,
  ];

  return (
    <View style={deviceStyles.devicesContainer}>
      {mergedDeviceArray.map((device, index) => {
        const buttons: ButtonProps[] = [];

        const button1 = renderDeviceCardButton1({
          device,
          devices,
          setDevices,
          filteredDevices,
          setFilteredDevices,
          index,
          ontToken,
          setOntToken,
          translate,
        });
        buttons.push(button1);

        const button2 = renderDeviceCardButton2({
          device,
          setModalDevice,
          setModalVisible,
          displayParentalControlsModal,
          translate,
        });
        buttons.push(button2);
        
        let headerText = device.macAddr;
        if (device.hostName !== "") {
          headerText = device.hostName;
        } else if(device.description !== undefined) {
          headerText = device.description;
        } 

        return (
          <Card
            key={device.macAddr + index}
            headerText={
              headerText
            }
            bodyText={device.macAddr}
            cardIcon={device.connectionType === "WIFI" ? "wifi" : "desktop"}
            buttons={buttons}
            imageSource=""
          />
        );
      })}
    </View>
  );
};

export default renderDeviceCards;
