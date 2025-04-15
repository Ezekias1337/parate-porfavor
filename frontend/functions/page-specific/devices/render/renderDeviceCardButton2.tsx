// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "../../../../components/Button";
import { Template, ParentalControlsData } from "../../../../../shared/types/ParentalControls";

interface renderButtonArguments {
  device: Device;
  setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  displayParentalControlsModal: (
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  translate: (key: string) => string;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<Template[]>;
  setParentalControlsFullData: React.Dispatch<
    ParentalControlsData
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const renderDeviceCardButton2 = ({
  device,
  setModalDevice,
  setModalVisible,
  displayParentalControlsModal,
  translate,
  setDevices,
  setParentalControls,
  setParentalControlsFullData,
  setLoading,
  setErrorMsg,
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
        /* await addDeviceToMacFilterHandler({
          device,
          index: index,
          ontToken,
          setOntToken,
          devices,
          setDevices,
          filteredDevices,
          setFilteredDevices,
          
          await fetchDevicesAndParentalControls(
          {
            setDevices,
            setParentalControls,
            setParentalControlsFullData,
            setLoading,
            setErrorMsg,
          },
          translate
        );
        }); */
      },
    };
  } else {
    return {
      text: translate("blockInternetOnSchedule"),
      variant: "primaryDark",
      icon: "calendar",
      onClickHandler: () => {
        console.log("showing modal")
        
        setModalDevice(device);
        displayParentalControlsModal(setModalVisible);
      },
    };
  }
};

export default renderDeviceCardButton2;
