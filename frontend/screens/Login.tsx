// Library Imports
import React, { useEffect, useState } from "react";
import { ScrollView, Image, Dimensions } from "react-native";
// Functions, Helpers, Utils, and Hooks
import loadCreds from "@/functions/general/loadCreds";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderLoginCards from "@/functions/page-specific/login/render/renderLoginCards";
// Components
import { useAuth } from "../components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
// Types
import { Account } from "../../shared/types/Account";
// CSS
import loginStyles from "../styles/page-specific/login";
// Assets
const appLogo = require("../assets/images/splash.png");

export interface LoginCredentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { login: authenticate } = useAuth();

  useEffect(() => {
    loadCreds({ setAccounts });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        loginStyles.container,
        {
          paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
          paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
        },
      ]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Image
        source={appLogo}
        style={{
          width: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
          height: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
        }}
      />

      {renderErrorMsg(errorMsg)}
      {renderLoginCards({
        accounts,
        loading,
        setLoading,
        errorMsg,
        setErrorMsg,
        authenticate,
        translate,
      })}
    </ScrollView>
  );
};

export default Login;
