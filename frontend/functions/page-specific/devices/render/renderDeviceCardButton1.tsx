// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import fetchDevices from "../fetchDevices";
import addDeviceToMacFilterHandler from "../addDeviceToMacFilterHandler";
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";

// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import OntToken from "../../../../../shared/types/OntToken";
import { ListOfStateSetters } from "../../../../screens/Devices";

interface renderButtonArguments {
  device: Device;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  filteredDevices: Device[];
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  index: number;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  translate: (key: string) => string;
}

const renderDeviceCardButton1 = ({
  device,
  devices,
  setDevices,
  filteredDevices,
  setFilteredDevices,
  index,
  ontToken,
  setOntToken,
  translate,
}: renderButtonArguments): ButtonProps => {
  if (device.domain !== "") {
    return {
      text: translate("blockInternetIndefinitely"),
      variant: "primary",
      icon: "hourglass",

      onClickHandler: async () => {
        await addDeviceToMacFilterHandler({
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
    };
  } else {
    return {
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
          filteredDevice: device,
          devices,
          setDevices,
        });
      },
    };
  }
};

export default renderDeviceCardButton1;
