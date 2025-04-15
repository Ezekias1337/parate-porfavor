// Library Imports
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
// Functions, Helpers, Utils, and Hooks
import fetchDevicesAndParentalControls from "@/functions/page-specific/devices/fetchDevicesAndParentalControls";
import handleTokenSwap from "@/functions/page-specific/devices/handleTokenSwap";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
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
  Template,
} from "../../shared/types/ParentalControls";
import OntToken from "../../shared/types/OntToken";
// CSS
import { colors } from "../styles/variables";
import deviceStyles from "../styles/page-specific/device";

/* 
  TODO:  
  - If device is online, show a badge that states so,
    otherwise show offline/blocked badge inside the card
  - Add cleanup for page so if page unmounts all device data is cleaned up
  
  
  ? Should be three buttons at top of page, one for refresh, one for creating a parental controls filter
  ? and one for adjusting the parental controls filter
  
  When button is pressed to add device to parental controls, it should display dropdown of available templates
*/

export interface ListOfStateSetters {
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<ParentalControlsData>;
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
    fetchDevicesAndParentalControls(
      {
        setDevices,
        setParentalControls,
        setLoading,
        setErrorMsg,
      },
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

  return (
    <View style={deviceStyles.container}>
      {loading && !errorMsg ? (
        <ActivityIndicator color={colors.primary500} size="large" />
      ) : (
        <>
          {renderErrorMsg(errorMsg)}
          {renderButtons(
            {
              setDevices,
              setParentalControls,
              setLoading,
              setErrorMsg,
            },
            translate
          )}
          {renderDeviceCards(
            ontToken,
            devices,
            {
              setModalVisible,
              setDevices,
              parentalControls,
              setParentalControls,
              setLoading,
              setErrorMsg,
              setModalDevice,
              setOntToken,
            },
            translate
          )}
          {renderModal({
            modalVisible,
            setModalVisible,
            modalDevice,
            parentalControls,
            ontToken,
            setOntToken,
            translate,
            selectedTemplate,
            setSelectedTemplate,
            setLoading,
          })}
        </>
      )}
    </View>
  );
};

export default Devices;
