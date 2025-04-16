// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks
import useRefreshToken from "@/hooks/useRefreshToken";
// Components
import { useAuth } from "../components/auth/authContext";
import Button from "../components/Button";
import Alert from "../components/Alert";
// Types
import { ModemStatus } from "../../shared/types/Modem";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors, fontSizes } from "../styles/variables";
import parentalControlsStyles from "../styles/page-specific/parentalControls";

const ParentalControls: React.FC = () => {
  const { translate } = useLocalization();
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);
  
  return <></>

  /* return loading && !errorMsg ? (
    <View style={[deviceStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={deviceStyles.container}>
      <>
        <Text style={{ fontSize: fontSizes.header1, color: colors.primary200 }}>{translate("parentalControls")}</Text>
        
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
          setParentalControls,
          setDevices,
        })}
      </>
    </ScrollView>
  ); */
};

export default ParentalControls;
