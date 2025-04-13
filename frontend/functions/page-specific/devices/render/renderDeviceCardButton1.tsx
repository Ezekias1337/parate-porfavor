import addDeviceToMacFilterHandler from "../addDeviceToMacFilterHandler";
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import OntToken from "../../../../../shared/types/OntToken";

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
  if (device.connectionType === "Unknown" || device.domain !== "") {
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
      variant: "warning",
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
