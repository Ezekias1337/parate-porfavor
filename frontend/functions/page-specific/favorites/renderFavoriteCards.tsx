// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import renderDeviceCardButton from "./renderFavoriteCardButton";
// Components
import DeviceCard from "@/components/page-specific/devices/DeviceCard";
import Alert from "@/components/Alert";
// Types
import { Device } from "../../../../shared/types/Device";
import { ButtonProps } from "@/components/Button";
import { Favorite } from "../../../../shared/types/Favorite";
// CSS
import deviceStyles from "../../../styles/page-specific/device";
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
 * @param {React.Dispatch<React.SetStateAction<Favorite[]>>} setFavorites - The function to set the favorites state.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered device cards.
 */

interface ListOfStateSetters {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

const renderFavoriteCards = (
  lastUsedProfile: string | null,
  favorites: Favorite[],
  { setLoading, setFavorites }: ListOfStateSetters,
  translate: (key: string) => string
) => {
  if (favorites.length === 0) {
    return (
      <Alert
        variant="warning"
        bodyText={translate("noFavorites")}
        icon="info-circle"
      />
    );
  }

  return (
    <View style={deviceStyles.devicesContainer}>
      {favorites.map((favorite, index) => {
        const device = favorite.device;
        const buttons: ButtonProps[] = [];

        let button = renderDeviceCardButton({
          device,
          setLoading,
          translate,
        });
        if (button) {
          buttons.push(button);
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

        if (device.macFiltered || device.parentalControlRestrictionApplied) {
          arrayOfBadges.push({
            text: translate("blocked"),
            variant: "error",
            icon: "ban",
            size: "small",
          });
        }

        const isFavorite = favorites.some(
          (favorite) => favorite.device.macAddr === device.macAddr
        );
        const deviceWithProfileId: Device = {
          ...device,
          profileId: lastUsedProfile || "",
        };

        return (
          <DeviceCard
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
            profileId={lastUsedProfile}
            isFavorite={isFavorite}
            favorites={favorites}
            setFavorites={setFavorites}
            device={deviceWithProfileId}
          />
        );
      })}
    </View>
  );
};

export default renderFavoriteCards;
