// Library Imports
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import fetchDevicesAndParentalControls from "@/functions/page-specific/devices/fetchDevicesAndParentalControls";
import handleTokenSwap from "@/functions/page-specific/devices/handleTokenSwap";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderButtons from "@/functions/page-specific/devices/render/renderButtons";
import renderDeviceCards from "@/functions/page-specific/devices/render/renderDeviceCards";
import renderModal from "@/functions/page-specific/devices/render/renderModal";
import useRefreshToken from "@/hooks/useRefreshToken";
import filterDevices from "@/functions/page-specific/devices/filterDevices";
// Components
import { useAuth } from "@/components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
import FilterInput from "@/components/page-specific/devices/FilterInput";
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

export interface ListOfStateSetters {
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<ParentalControlsData>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const Devices: React.FC = () => {
  const { width: screenWidth } = Dimensions.get("window");
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
  const [filter, setFilter] = useState<string>("");

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

    if (!modalVisible) {
      setSelectedTemplate(null);
    }
  }, [modalVisible]);

  useEffect(() => {
    filterDevices({
      devices,
      setFilteredDevices,
      filter,
    });
  }, [devices, filter]);
  
  useEffect(() => {
    setFilteredDevices(devices);
  }, [devices]);

  return loading ? (
    <View style={[deviceStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[
        deviceStyles.container,
        {
          paddingHorizontal: screenWidth < 500 ? 10 : screenWidth * 0.1,
          paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
        },
      ]}
    >
      <Text style={deviceStyles.title}>{translate("devices")}</Text>
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
      <FilterInput
        filter={filter}
        setFilter={setFilter}
        translate={translate}
      />

      {renderDeviceCards(
        ontToken,
        filteredDevices,
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
        selectedTemplate,
        setSelectedTemplate,
        setLoading,
        setParentalControls,
        setDevices,
        translate,
      })}
    </ScrollView>
  );
};

export default Devices;
