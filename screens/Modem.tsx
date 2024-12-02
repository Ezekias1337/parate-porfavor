// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// Functions, Helpers, Utils, and Hooks
import handleLogin from "../functions/component-specific/index/handleLogin";
import view2G from "@/functions/network/view2G";
// Components
import Button from "../components/Button";
import Alert from "../components/Alert";

import { useLocalization } from "../components/localization/LocalizationContext";

// CSS
import { colors } from "../styles/variables";
import homeStyles from "../styles/page-specific/index";

const Modem: React.FC = () => {
  const { translate, language } = useLocalization();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  return <></>;

  return (
    <View style={homeStyles.container}>
      <StatusBar style="light" backgroundColor={colors.primary500} />
      {isAuthenticated ? (
        <View>
          <Alert
            bodyText={translate("authSuccess")}
            variant="success"
            icon="check-circle"
            additionalClassNames="authSuccess"
          />
          <Button
            text={translate("Test")}
            variant="primary"
            onClickHandler={async () => {
              await view2G();
            }}
          />
        </View>
      ) : (
        <View>
          <Button
            text={translate("login")}
            variant="primary"
            onClickHandler={async () => {
              await handleLogin(setIsAuthenticated, setAuthError);
            }}
          />

          <Alert
            bodyText={translate("authError")}
            variant="error"
            icon="exclamation-triangle"
            additionalClassNames="authError"
          />
        </View>
      )}
    </View>
  );
};

export default Modem;
