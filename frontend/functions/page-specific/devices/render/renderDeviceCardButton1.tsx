import addDeviceToMacFilterHandler from "../addDeviceToMacFilterHandler";
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";
import fetchDevicesAndParentalControls from "../fetchDevicesAndParentalControls";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import OntToken from "../../../../../shared/types/OntToken";
import {
  Template,
  ParentalControlsData,
} from "../../../../../shared/types/ParentalControls";

interface renderButtonArguments {
  device: Device;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<ParentalControlsData>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  index: number;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  translate: (key: string) => string;
}

const renderDeviceCardButton1 = ({
  device,
  devices,
  setDevices,
  setParentalControls,
  setLoading,
  setErrorMsg,
  index,
  ontToken,
  setOntToken,
  translate,
}: renderButtonArguments): ButtonProps | null => {
  if (
    device.parentalControlRestrictionApplied !== undefined &&
    device.parentalControlRestrictionApplied === true
  ) {
    return null;
  } else if (device.macFiltered === undefined || device.macFiltered === false) {
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
        });

        await fetchDevicesAndParentalControls(
          {
            setDevices,
            setParentalControls,
            setLoading,
            setErrorMsg,
          },
          translate
        );
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
          devices,
          setDevices,
          index,
          device,
        });
        await fetchDevicesAndParentalControls(
          {
            setDevices,
            setParentalControls,
            setLoading,
            setErrorMsg,
          },
          translate
        );
      },
    };
  }
};

export default renderDeviceCardButton1;
