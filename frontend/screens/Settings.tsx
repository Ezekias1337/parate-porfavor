// Library Imports
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { saveEncrypted, loadEncrypted } from "@/utils/secureStorage";
// Functions, Helpers, Utils, and Hooks
import login from "@/functions/network/auth/login";
import useRefreshToken from "@/hooks/useRefreshToken";
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

const Settings: React.FC = () => {
  const { translate } = useLocalization();
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [urlSettings, setUrlSettings] = useState({
    serverUrl: "",
    modemUrl: "",
  });
  const { login: authenticate } = useAuth();

  const handleInputChange =
    (field: "serverUrl" | "modemUrl") => (text: string) => {
      const newUrlSettings = {
        ...urlSettings,
        [field]: text,
      };

      setUrlSettings(newUrlSettings);
    };

 /*  const handleLogin = async () => {
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
  }; */

  useEffect(() => {
    if (urlSettings.serverUrl !== "") {
      saveEncrypted("urlSettings", urlSettings);
    }
  }, [urlSettings]);

  useEffect(() => {
    const loadCreds = async () => {
      const stored = await loadEncrypted("urlSettings");
      if (stored) {
        setUrlSettings(stored);
      }
    };
    loadCreds();
  }, []);

  return (
    <View style={loginStyles.container}>
      {errorMsg !== null && (
        <View style={loginStyles.alertContainer}>
          <Alert
            bodyText={translate("authError")}
            variant="error"
            icon="exclamation-triangle"
          />
        </View>
      )}

      <TextInput
        placeholder={translate("serverUrl")}
        value={urlSettings.serverUrl}
        onChangeText={handleInputChange("serverUrl")}
        style={inputFieldStyles.textInput}
        placeholderTextColor={colors.primary300}
        id="serverUrl"
      />
      <TextInput
        placeholder={translate("modemUrl")}
        value={urlSettings.modemUrl}
        onChangeText={handleInputChange("modemUrl")}
        secureTextEntry
        style={inputFieldStyles.textInput}
        placeholderTextColor={colors.primary300}
        id="modemUrl"
      />
      <View style={loginStyles.buttonContainer}>
        <Button
          text={translate("saveChanges")}
          variant="primary"
          buttonSize="medium"
          loading={loading}
          onClickHandler={async () => {
            //await handleLogin();
          }}
          icon="floppy-o"
          leftIcon
        />
      </View>
    </View>
  );
};

export default Settings;
