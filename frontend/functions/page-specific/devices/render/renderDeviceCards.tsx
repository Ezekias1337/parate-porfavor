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
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
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
  /* 
    Need to have separate function for:
     rendering 1st button
     rendering 2nd button
     
    Both functions need to determine state
    
    For button 1:
      if device is not filtered, display block button
      if device is filtered display unblock button
      
    For button 2:
      if device is currently restricted, show option to modify
      if modify option is selected user is presented with option to:
        remove the restriction, or change the template, or change the device description
        (Changing the device description would require first removing the device and subsequently
        re-adding, this is a low priority feature)
        
        
      ! To distinguish between unfiltered and filtered devices check the domain attribute.
      
      ? If the domain attribute is: "" it is filtered
        */

  const arrayOfParentalControlDevices =
    extractParentalControlsDevicesFromTemplates(parentalControls);
  const mergedDeviceArray = [
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

        return (
          <Card
            key={device.macAddr + index}
            headerText={
              device.hostName !== "" ? device.hostName : device.macAddr
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
