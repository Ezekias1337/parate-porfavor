// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { saveEncrypted, loadEncrypted } from "@/utils/secureStorage";
// Functions, Helpers, Utils, and Hooks
import login from "@/functions/network/auth/login";
// Components
import { useAuth } from "../components/auth/authContext";
import { TextInput } from "react-native";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import loginStyles from "../styles/page-specific/login";
import { inputFieldStyles } from "../styles/component-specific/input-fields";
// Assets
const appIcon = require("../assets/images/app-icon.png");

const Login: React.FC = () => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const { login: authenticate } = useAuth();

  const handleInputChange =
    (field: "username" | "password") => (text: string) => {
      const newCredentials = {
        ...loginCredentials,
        [field]: text,
      };

      setLoginCredentials(newCredentials);
    };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await login(
        loginCredentials.username,
        loginCredentials.password
      );
      if (token === null) {
        setErrorMsg(translate("authError"));
        setLoading(false);
      } else if (token != null) {
        if (errorMsg !== null) {
          setErrorMsg(null);
        }
        setLoading(false);
        await authenticate(token);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg(translate("authError"));
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (loginCredentials.username && loginCredentials.password) {
      saveEncrypted("loginCreds", loginCredentials);
    }
  }, [loginCredentials]);

  useEffect(() => {
    const loadCreds = async () => {
      const stored = await loadEncrypted("loginCreds");
      if (stored) {
        setLoginCredentials(stored);
      }
    };
    loadCreds();
  }, []);

  return (
    <View
      style={[
        loginStyles.container,
        { padding: screenWidth < 500 ? 20 : screenWidth * 0.2 },
      ]}
    >
      {errorMsg !== null && (
        <View style={loginStyles.alertContainer}>
          <Alert
            bodyText={translate("authError")}
            variant="error"
            icon="exclamation-triangle"
          />
        </View>
      )}

      <Image
        source={appIcon}
        style={{
          width: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
          height: screenWidth < 500 ? screenWidth * 0.75 : screenWidth * 0.2,
        }}
      />

      <View style={loginStyles.formRow}>
        <View style={loginStyles.formLabelContainer}>
          <Text style={loginStyles.formLabel}>{translate("username")}</Text>
        </View>

        <TextInput
          placeholder={translate("username")}
          value={loginCredentials.username}
          onChangeText={handleInputChange("username")}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="username"
        />
      </View>

      <View style={loginStyles.formRow}>
        <View style={loginStyles.formLabelContainer}>
          <Text style={loginStyles.formLabel}>{translate("password")}</Text>
        </View>

        <TextInput
          placeholder={translate("password")}
          value={loginCredentials.password}
          onChangeText={handleInputChange("password")}
          secureTextEntry
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="password"
        />
      </View>

      <View style={loginStyles.buttonContainer}>
        <Button
          text={translate("login")}
          variant="primary"
          buttonSize="medium"
          loading={loading}
          onClickHandler={async () => {
            await handleLogin();
          }}
          icon="sign-in"
          leftIcon
        />
      </View>
    </View>
  );
};

export default Login;
