// Functions, Helpers, Utils, and Hooks
import addDeviceToMacFilterHandler from "../addDeviceToMacFilterHandler";
import removeDeviceFromMacFilterHandler from "../removeDeviceFromMacFilterHandler";
import fetchDevicesAndParentalControls from "../fetchDevicesAndParentalControls";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import OntToken from "../../../../../shared/types/OntToken";
import {
  ParentalControlsData,
} from "../../../../../shared/types/ParentalControls";

/**
 * Renders the buttons to block a device's internet access.
 * @param {Device} device - The device to block internet access for.
 * @param {Device[]} devices - The list of devices.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @param {React.Dispatch<ParentalControlsData>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setErrorMsg - The function to set the error message state.
 * @param {number} index - The index of the device in the list.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {Function} translate - The function to translate the text.
 * @returns {ButtonProps | null} The rendered button or null if the device is already blocked.
*/

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
