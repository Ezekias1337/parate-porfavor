// Functions, Helpers, Utils, and Hooks
import wakeDevice from "@/functions/network/wake-on-lan/wakeDevice";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";

/**
 * Render the button to wake a device via wake-on-lan
 * @param {Device} device - The device to add to wake
 * @param {Function} translate - The function to translate the text
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state
 * @returns {ButtonProps | null} The rendered button or null if the device is not eligible to be woken
 */

interface renderButtonArguments {
  device: Device;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  translate: (key: string) => string;
}

const renderDeviceCardButton3 = ({
  device,
  setLoading,
  translate,
}: renderButtonArguments): ButtonProps | null => {
  if (device.connectionType === "ETH" && device.onlineStatus === "Offline") {
    return {
      text: translate("wakeOnLan"),
      variant: "success",
      icon: "power-off",
      onClickHandler: async () => {
        try {
          setLoading(true);
          await wakeDevice(device.macAddr);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      },
    };
  } else {
    return null;
  }
};

export default renderDeviceCardButton3;
