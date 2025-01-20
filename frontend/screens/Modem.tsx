// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Functions, Helpers, Utils, and Hooks
import { useAuth } from "../components/auth/authContext";
import getModemStatus, {
  ModemStatus,
} from "../functions/network/modem/getModemStatus";
// Components
import Button from "../components/Button";
import Alert from "../components/Alert";

import { useLocalization } from "../components/localization/LocalizationContext";

// CSS
import { colors } from "../styles/variables";
import modemStyles from "../styles/page-specific/index";

const Modem: React.FC = () => {
  //const { authCookie } = useAuth();
  const { translate } = useLocalization();

  const [modemStatus, setModemStatus] = useState<ModemStatus | null>(null);

  useEffect(() => {
    const fetchModemStatus = async () => {
      const status = await getModemStatus(/* authCookie */);
      setModemStatus(status);
    };
    fetchModemStatus();
  }, []);

  useEffect(() => {
    console.log(modemStatus);
  }, [modemStatus]);

  return <View style={modemStyles.container}></View>;
};

export default Modem;
