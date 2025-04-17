// Library Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import useRefreshToken from "@/hooks/useRefreshToken";
import loadCreds from "@/functions/page-specific/settings/loadCreds";
import hideSuccessAlert from "@/functions/page-specific/settings/hideSuccessAlert";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderFirstLoadMsg from "@/functions/page-specific/settings/render/renderFirstLoadMsg";
import renderSettingsSavedMsg from "@/functions/page-specific/settings/render/renderSettingsSavedMsg";
import renderInputFields from "@/functions/page-specific/settings/render/renderInputFields";
import renderSubmitButton from "@/functions/page-specific/settings/render/renderSubmitButton";
// Components
import { useAuth } from "../components/auth/authContext";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors, fontSizes } from "../styles/variables";
import settingsStyles from "../styles/page-specific/settings";

interface SettingsProps {
  isFirstLoad?: boolean;
  setUrlIsSet?: (urlIsSet: boolean) => void;
}

export interface UrlSettings {
  serverUrl: string;
  modemUrl: string;
}

const Settings: React.FC<SettingsProps> = ({
  isFirstLoad = false,
  setUrlIsSet,
}) => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [urlSettings, setUrlSettings] = useState<UrlSettings>({
    serverUrl: "",
    modemUrl: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    loadCreds({ setUrlSettings });
  }, []);

  useEffect(() => {
    hideSuccessAlert({ settingsSaved, setSettingsSaved });
  }, [settingsSaved]);

  return loading ? (
    <View style={[settingsStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <View style={settingsStyles.wrapper}>
      <Text
        style={[
          settingsStyles.title,
          {
            paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
            paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
            justifyContent: "center",
            alignSelf: "center",
          },
        ]}
      >
        {translate("settings")}
      </Text>

      <ScrollView
        contentContainerStyle={[
          settingsStyles.container,
          {
            paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
            paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
          },
        ]}
      >
        {renderFirstLoadMsg({
          isFirstLoad,
          translate,
        })}
        {renderErrorMsg(errorMsg)}
        {renderInputFields({
          urlSettings,
          setUrlSettings,
          translate,
        })}
        {renderSubmitButton(
          {
            loading,
            setLoading,
            setErrorMsg,
            urlSettings,
            settingsSaved,
            setSettingsSaved,
            isFirstLoad,
            setUrlIsSet,
          },
          translate
        )}
        {renderSettingsSavedMsg({
          settingsSaved,
          translate,
        })}
      </ScrollView>
    </View>
  );
};

export default Settings;
