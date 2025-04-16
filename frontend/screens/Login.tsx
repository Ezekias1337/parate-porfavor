// Library Imports
import React, { useEffect, useState } from "react";
import { View, Image, Dimensions } from "react-native";
// Functions, Helpers, Utils, and Hooks
import loadCreds from "@/functions/page-specific/login/loadCreds";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderInputFields from "@/functions/page-specific/login/render/renderInputFields";
import renderSubmitButton from "@/functions/page-specific/login/render/renderSubmitButton";
// Components
import { useAuth } from "../components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import loginStyles from "../styles/page-specific/login";
// Assets
const appIcon = require("../assets/images/app-icon.png");

export interface LoginCredentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const { login: authenticate } = useAuth();

  useEffect(() => {
    loadCreds(setLoginCredentials);
  }, []);

  return (
    <View
      style={[
        loginStyles.container,
        { padding: screenWidth < 500 ? 20 : screenWidth * 0.2 },
      ]}
    >
      {renderErrorMsg(errorMsg)}
      <Image
        source={appIcon}
        style={{
          width: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
          height: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
        }}
      />
      
      {renderInputFields({ loginCredentials, setLoginCredentials }, translate)}
      {renderSubmitButton(
        {
          loading,
          setLoading,
          errorMsg,
          setErrorMsg,
          loginCredentials,
          authenticate,
        },
        translate
      )}
    </View>
  );
};

export default Login;
