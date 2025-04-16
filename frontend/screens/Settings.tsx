// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
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
import { colors, fontSizes } from "../styles/variables";
import settingsStyles from "../styles/page-specific/settings";
import { inputFieldStyles } from "../styles/component-specific/input-fields";

interface SettingsProps {
  isFirstLoad?: boolean;
  setUrlIsSet?: (urlIsSet: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({isFirstLoad = false, setUrlIsSet}) => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [urlSettings, setUrlSettings] = useState({
    serverUrl: "",
    modemUrl: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleInputChange =
    (field: "serverUrl" | "modemUrl") => (text: string) => {
      const newUrlSettings = {
        ...urlSettings,
        [field]: text,
      };

      setUrlSettings(newUrlSettings);
    };

  useEffect(() => {
    const loadCreds = async () => {
      const stored = await loadEncrypted("urlSettings");
      if (stored) {
        setUrlSettings(stored);
      }
    };
    loadCreds();
  }, []);

  useEffect(() => {
    if (!settingsSaved) return;

    const timeout = setTimeout(() => {
      setSettingsSaved(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [settingsSaved]);

  return (
    <View
      style={[
        settingsStyles.container,
        { padding: screenWidth < 500 ? 20 : screenWidth * 0.2 },
      ]}
    >
      <Text style={{ fontSize: fontSizes.header1, color: colors.primary200 }}>
        {translate("settings")}
      </Text>

      {isFirstLoad && (
        <View style={settingsStyles.alertContainer}>
          <Alert
            bodyText={translate("serverUrlNeeded")}
            variant="info"
            icon="info-circle"
          />
        </View>
      )}

      {errorMsg !== null && (
        <View style={settingsStyles.alertContainer}>
          <Alert
            bodyText={translate("authError")}
            variant="error"
            icon="exclamation-triangle"
          />
        </View>
      )}

      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("serverUrl")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("serverUrl")}
          value={urlSettings.serverUrl}
          onChangeText={handleInputChange("serverUrl")}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="serverUrl"
        />
      </View>
      
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("modemUrl")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("modemUrl")}
          value={urlSettings.modemUrl}
          onChangeText={handleInputChange("modemUrl")}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="modemUrl"
        />
      </View>

      <View style={settingsStyles.buttonContainer}>
        <Button
          text={translate("saveChanges")}
          variant="primary"
          buttonSize="medium"
          loading={loading}
          onClickHandler={async () => {
            try {
              setLoading(true);
              setErrorMsg(null);
              if (settingsSaved) {
                setSettingsSaved(false);
              }
              
              await saveEncrypted("urlSettings", urlSettings);
              setLoading(false);
              setSettingsSaved(true);
              
              if(isFirstLoad && setUrlIsSet) {
                setUrlIsSet(true);
              }
            } catch (error) {
              setErrorMsg(translate("settingsError"));
            }
          }}
          icon="floppy-o"
          leftIcon
        />
      </View>

      {settingsSaved && (
        <View style={settingsStyles.alertContainer}>
          <Alert
            bodyText={translate("settingsSaved")}
            variant="success"
            icon="check-circle"
          />
        </View>
      )}
    </View>
  );
};

export default Settings;
