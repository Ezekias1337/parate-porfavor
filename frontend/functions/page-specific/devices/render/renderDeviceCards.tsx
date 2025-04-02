// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";
import addDeviceToMacFilter from "../addDeviceToMacFilterHandler";
import displayParentalControlsModal from "../displayParentalControlsModal";
// Components
import Card from "@/components/Card";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "@/components/Button";
import { OntToken } from "../../../../../shared/types/MacFilter";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Functions, Helpers, Utils, and Hooks

interface ListOfStateSetters {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
}

const renderDeviceCards = (
  ontToken: OntToken,
  devices: Device[],
  filteredDevices: Device[],
  {
    setModalVisible,
    setDevices,
    setFilteredDevices,
    setOntToken,
  }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  return (
    <View style={deviceStyles.devicesContainer}>
      {devices.map((device, index) => {
        const buttons: ButtonProps[] = [];

        buttons.push({
          text: translate("blockInternetIndefinitely"),
          variant: "primary",
          icon: "hourglass",
          onClickHandler: async () => {
            await addDeviceToMacFilter({
              device,
              index: index,
              ontToken,
              setOntToken,
              devices,
              setDevices,
              filteredDevices,
              setFilteredDevices,
            });
          },
        });
        buttons.push({
          text: translate("blockInternetOnSchedule"),
          variant: "primaryDark",
          icon: "calendar",
          onClickHandler: () => {
            displayParentalControlsModal(setModalVisible);
          },
        });

        return (
          <Card
            key={device.macAddr}
            headerText={
              device.hostName !== "" ? device.hostName : device.macAddr
            }
            bodyText={`${device.ipAddress}/n${device.macAddr}`}
            cardIcon={device.connectionType === "WIFI" ? "wifi" : "desktop"}
            buttons={buttons}
            imageSource=""
          />
        );
      })}

      {filteredDevices.map((filteredDevice, index) => {
        const buttons: ButtonProps[] = [];

        buttons.push({
          text: translate("unblockDevice"),
          variant: "success",
          icon: "unlock",
          onClickHandler: async () => {
            await removeDeviceFromMacFilterHandler({
              ontToken,
              setOntToken,
              filteredDevices,
              setFilteredDevices,
              index,
              filteredDevice,
              devices,
              setDevices,
            });
          },
        });

        buttons.push({
          text: translate("blockInternetOnSchedule"),
          variant: "primaryDark",
          icon: "calendar",
          onClickHandler: () => {
            displayParentalControlsModal(setModalVisible);
          },
        });

        return (
          <Card
            key={filteredDevice.macAddr}
            headerText={
              filteredDevice.hostName !== ""
                ? filteredDevice.hostName
                : filteredDevice.macAddr
            }
            bodyText={filteredDevice.macAddr}
            cardIcon={
              filteredDevice.connectionType === "WIFI" ? "wifi" : "desktop"
            }
            buttons={buttons}
            imageSource=""
          />
        );
      })}
    </View>
  );
};

export default renderDeviceCards;
