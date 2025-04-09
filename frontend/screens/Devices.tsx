// Library Imports
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
// Functions, Helpers, Utils, and Hooks
import fetchDevices from "@/functions/page-specific/devices/fetchDevices";
import fetchParentalControlsData from "@/functions/page-specific/devices/fetchParentalControlsData";
import handleTokenSwap from "@/functions/page-specific/devices/handleTokenSwap";
import renderErrorMsg from "@/functions/page-specific/devices/render/renderErrorMsg";
import renderButtons from "@/functions/page-specific/devices/render/renderButtons";
import renderDeviceCards from "@/functions/page-specific/devices/render/renderDeviceCards";
import renderModal from "@/functions/page-specific/devices/render/renderModal";
import useRefreshToken from "@/hooks/useRefreshToken";
// Components
import { useAuth } from "@/components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
// Types
import { Device } from "../../shared/types/Device";
import {
  ParentalControlsData,
  ParentalControlsDevice,
  Template,
} from "../../shared/types/ParentalControls";
import OntToken from "../../shared/types/OntToken";
// CSS
import { colors } from "../styles/variables";
import deviceStyles from "../styles/page-specific/device";

/* 
  TODO:
  - When switching between parental controls and mac filtering need to reset value of ontToken to null
  - Need to check if device can be on mac filtering and parental controls at the same time
    ! SOLVED: DEVICE CAN BE ON BOTH
  
  - If device is online, show a badge that states so,
    otherwise show offline/blocked badge inside the card
  - Add cleanup for page so if page unmounts all device data is cleaned up
  
  
  ? Should be three buttons at top of page, one for refresh, one for creating a parental controls filter
  ? and one for adjusting the parental controls filter
  
  When button is pressed to add device to parental controls, it should display dropdown of available templates
*/

export interface ListOfStateSetters {
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ListOfParentalControlsStateSetters {
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const Devices: React.FC = () => {
  const { translate } = useLocalization();
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ontToken, setOntToken] = useState<OntToken>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [parentalControls, setParentalControls] =
    useState<ParentalControlsData>({
      templates: [],
      connectionAttempts: 0,
    });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDevice, setModalDevice] = useState<Device | null>(null);

  useEffect(() => {
    fetchDevices(
      { setDevices, setFilteredDevices, setLoading, setErrorMsg },
      translate
    );

    fetchParentalControlsData(
      { setParentalControls, setLoading, setErrorMsg },
      translate
    );
  }, []);

  useEffect(() => {
    handleTokenSwap({
      modalVisible,
      setOntToken,
      setModalDevice,
    });
  }, [modalVisible]);

  useEffect(() => {
    console.log("ontToken changed:", ontToken);
  }, [ontToken]);

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
            parentalControls,
            {
              setModalVisible,
              setDevices,
              setFilteredDevices,
              setModalDevice,
              setOntToken,
            },
            translate
          )}
          {renderModal({
            modalVisible,
            setModalVisible,
            modalDevice,
            parentalControlsData: parentalControls,
            ontToken,
            setOntToken,
            translate,
            selectedTemplate,
            setSelectedTemplate,
          })}
        </>
      )}
    </View>
  );
};

export default Devices;
