// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks

// Components
import { useAuth } from "../components/auth/authContext";
import Button from "../components/Button";
import Alert from "../components/Alert";
// Types
import { ModemStatus } from "../../shared/types/Modem";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import parentalControlsStyles from "../styles/page-specific/parentalControls";

const Modem: React.FC = () => {
  const { translate } = useLocalization();




  

  return (
    <View style={parentalControlsStyles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default Modem;
