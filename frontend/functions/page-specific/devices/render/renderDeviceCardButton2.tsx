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
import { ParentalControlsDevice } from "../../../../../shared/types/ParentalControls";

interface renderButtonArguments {
  device: ParentalControlsDevice;
  setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayParentalControlsModal: (setModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
  translate: (key: string) => string;
}

const renderDeviceCardButton2 = ({
  device,
  setModalDevice,
  setModalVisible,
  displayParentalControlsModal,
  translate,
}: renderButtonArguments): ButtonProps => {
  /* 
    ? - if device is currently restricted, show option to modify
    ? - if modify option is selected user is presented with option to:
    ?     remove the restriction, or change the template, or change the device description
    ?     (Changing the device description would require first removing the device and subsequently
    ?     re-adding, this is a low priority feature)
  */
  
  
  
  
  if (device.templateId) {
    return {
      text: translate("modify"),
      variant: "warning",
      icon: "pencil",

      onClickHandler: async () => {
        /* await addDeviceToMacFilterHandler({
          device,
          index: index,
          ontToken,
          setOntToken,
          devices,
          setDevices,
          filteredDevices,
          setFilteredDevices,
        }); */
      },
    };
  } else {
    return {
      text: translate("blockInternetOnSchedule"),
      variant: "primaryDark",
      icon: "calendar",
      onClickHandler: () => {
        setModalDevice(device);
        displayParentalControlsModal(setModalVisible);
      },
    }
  }
};

export default renderDeviceCardButton2;
