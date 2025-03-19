// Library Imports
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
// Functions, Helpers, Utils, and Hooks
import fetchDevices from "@/functions/page-specific/modem/fetchDevices";
import renderErrorMsg from "@/functions/page-specific/modem/render/renderErrorMsg";
import renderButtons from "@/functions/page-specific/modem/render/renderButtons";
import renderDeviceCards from "@/functions/page-specific/modem/render/renderDeviceCards";
import renderModal from "@/functions/page-specific/modem/render/renderModal";
// Components
import { useAuth } from "@/components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
// Types
import { Device } from "../../shared/types/Device";
import {
  MacFilter,
  BlacklistOrWhitelist,
  MacFilterEnabledOrDisabled,
  OntToken,
} from "../../shared/types/MacFilter";
// CSS
import { colors } from "../styles/variables";
import deviceStyles from "../styles/page-specific/device";

/* 
  TODO:
  - When clicking on block indefinitely need to update state arrays to instantly reflect change without refresh
  - Need to add logic to card rendering to handle when a device is filtered and or parental controls list
  - Need to add add modal
  - Need to add logic for refreshing ont token on failure.
  - Remove parental controls from tabs on bottom and delete screen
  - Add cleanup for page so if page unmounts all device data is cleaned up
  - Move ModemStatusCard.tsx styles to its own file
  
  
  ? Should be three buttons at top of page, one for refresh, one for creating a parental controls filter
  and one for adjusting the parental controls filter
  
  When button is pressed to add device to parental controls, it should display dropdown of available templates
*/

export interface ListOfStateSetters {
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const Devices: React.FC = () => {
  const { translate } = useLocalization();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ontToken, setOntToken] = useState<OntToken>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDevices(
      { setDevices, setFilteredDevices, setLoading, setErrorMsg },
      translate
    );
  }, []);

  return (
    <View style={deviceStyles.container}>
      {loading && !errorMsg ? (
        <ActivityIndicator color={colors.primary500} size="large" />
      ) : (
        <>
          {renderErrorMsg(errorMsg)}
          {renderButtons(
            { setDevices, setFilteredDevices, setLoading, setErrorMsg },
            translate
          )}
          {renderDeviceCards(
            ontToken,
            devices,
            filteredDevices,
            {
              setModalVisible,
              setDevices,
              setFilteredDevices,
              setOntToken,
            },
            translate
          )}
          {renderModal(modalVisible, setModalVisible)}
        </>
      )}
    </View>
  );
};

export default Devices;
