// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import displayParentalControlsModal from "../displayParentalControlsModal";
import renderDeviceCardButton1 from "./renderDeviceCardButton1";
import renderDeviceCardButton2 from "./renderDeviceCardButton2";
import renderDeviceCardButton3 from "./renderDeviceCardButton3";
// Components
import Card from "@/components/Card";
import Alert from "@/components/Alert";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
import { ButtonProps } from "@/components/Button";
import OntToken from "../../../../../shared/types/OntToken";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
import { BadgeProps } from "@/components/Badge";

/**
 * Renders the device cards.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModalVisible - The function to set the modal visible state.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @param {ParentalControlsData} parentalControls - The parental controls data.
 * @param {React.Dispatch<ParentalControlsData>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setErrorMsg - The function to set the error message state.
 * @param {React.Dispatch<React.SetStateAction<Device | null>>} setModalDevice - The function to set the modal device state.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered device cards.
 */

interface ListOfStateSetters {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  parentalControls: ParentalControlsData;
  setParentalControls: React.Dispatch<ParentalControlsData>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
}

const renderDeviceCards = (
  ontToken: OntToken,
  devices: Device[],
  {
    setModalVisible,
    setDevices,
    parentalControls,
    setParentalControls,
    setLoading,
    setErrorMsg,
    setModalDevice,
    setOntToken,
  }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  if (devices.length === 0) {
    return (
      <Alert
        variant="warning"
        bodyText={translate("noResults")}
        icon="info-circle"
      />
    );
  }

  return (
    <View style={deviceStyles.devicesContainer}>
      {devices.map((device, index) => {
        const buttons: ButtonProps[] = [];

        const button1 = renderDeviceCardButton1({
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
        });
        if (button1) {
          buttons.push(button1);
        }

        const button2 = renderDeviceCardButton2({
          device,
          setDevices,
          setModalDevice,
          setModalVisible,
          displayParentalControlsModal,
          index,
          parentalControls,
          setParentalControls,
          setLoading,
          setErrorMsg,
          translate,
        });
        if (button2) {
          buttons.push(button2);
        }

        let button3 = renderDeviceCardButton3({
          device,
          setLoading,
          translate,
        });
        if (button3) {
          buttons.push(button3);
        }

        let headerText: string;
        if (device.hostName && device.hostName !== "") {
          headerText = device.hostName;
        } else if (device.description !== undefined) {
          headerText = device.description;
        } else {
          headerText = device.macAddr;
        }

        let arrayOfBadges: BadgeProps[] = [];

        if (device.onlineStatus === "Online") {
          arrayOfBadges.push({
            text: translate("online"),
            variant: "success",
            icon: "signal",
            size: "small",
          });
        } else if (device.onlineStatus === "Offline") {
          arrayOfBadges.push({
            text: translate("offline"),
            variant: "neutral",
            icon: "signal",
            size: "small",
          });
        }

        if (device.macFiltered || device.parentalControlRestrictionApplied) {
          arrayOfBadges.push({
            text: translate("blocked"),
            variant: "error",
            icon: "ban",
            size: "small",
          });
        }

        if (device.parentalControlRestrictionApplied && device.templateId) {
          const templateName =
            parentalControls.templates[device.templateId - 1].name;

          const badgeText = `${translate(
            "scheduledRestriction"
          )}: ${templateName}`;

          arrayOfBadges.push({
            text: badgeText,
            variant: "info",
            icon: "clock-o",
            size: "small",
          });
        }

        return (
          <Card
            key={device.macAddr + index}
            headerText={headerText}
            bodyText={`${translate("macAddress")}: ${device.macAddr}${
              device?.ipAddress
                ? `\n${translate("ipAddress")}: ${device.ipAddress}`
                : ""
            }${device?.ssid ? `\n${translate("ssid")}: ${device.ssid}` : ""}`}
            cardIcon={device.connectionType === "WIFI" ? "wifi" : "desktop"}
            buttons={buttons}
            badges={arrayOfBadges}
            imageSource=""
          />
        );
      })}
    </View>
  );
};

export default renderDeviceCards;
