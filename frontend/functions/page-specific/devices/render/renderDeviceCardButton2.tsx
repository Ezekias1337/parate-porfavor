// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import {
  Template,
  ParentalControlsData,
} from "../../../../../shared/types/ParentalControls";
// Functions, Helpers, Utils, and Hooks
import removeDeviceFromParentalControlsTemplate from "@/functions/network/parental-controls/removeDeviceFromParentalControlsTemplate";
import getOntToken from "@/functions/network/parental-controls/getOntToken";
import fetchDevicesAndParentalControls from "../fetchDevicesAndParentalControls";
interface renderButtonArguments {
  device: Device;
  devices: Device[];
  setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayParentalControlsModal: (
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  translate: (key: string) => string;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  parentalControls: ParentalControlsData;
  setParentalControls: React.Dispatch<ParentalControlsData>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  index: number;
}

const renderDeviceCardButton2 = ({
  device,
  devices,
  setDevices,
  setModalDevice,
  setModalVisible,
  displayParentalControlsModal,
  translate,
  parentalControls,
  setParentalControls,
  setLoading,
  setErrorMsg,
  index,
}: renderButtonArguments): ButtonProps | null => {
  /* 
    ? - if device is currently restricted, show option to modify
    ? - if modify option is selected user is presented with option to:
    ?     remove the restriction, or change the template, or change the device description
    ?     (Changing the device description would require first removing the device and subsequently
    ?     re-adding, this is a low priority feature)
  */

  if (device.macFiltered !== undefined && device.macFiltered === true) {
    return null;
  } else if (
    device.parentalControlRestrictionApplied !== undefined &&
    device.parentalControlRestrictionApplied === true
  ) {
    return {
      text: translate("removeScheduleRestriction"),
      variant: "warning",
      icon: "calendar-times-o",

      onClickHandler: async () => {
        try {
          let macIndex = 0;

          for (const template of parentalControls.templates) {
            for (const [index, tempDevice] of template.devices.entries()) {
              if (tempDevice.macAddr === device.macAddr) {
                macIndex = index + 1;
                break;
              }
            }
          }

          if (macIndex === 0) {
            throw new Error("Device not found in parental controls templates");
          }

          const ontToken = await getOntToken(null);
          await removeDeviceFromParentalControlsTemplate(macIndex, ontToken);

          await fetchDevicesAndParentalControls(
            {
              setDevices,
              setParentalControls,
              setLoading,
              setErrorMsg,
            },
            translate
          );
        } catch (error) {
          console.error(error);
        }
      },
    };
  } else {
    return {
      text: translate("blockInternetOnSchedule"),
      variant: "primaryDark",
      icon: "calendar",
      onClickHandler: () => {
        console.log("showing modal");

        setModalDevice(device);
        displayParentalControlsModal(setModalVisible);
      },
    };
  }
};

export default renderDeviceCardButton2;
