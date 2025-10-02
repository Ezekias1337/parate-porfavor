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
import loadCreds from "@/functions/general/loadCreds";
import hideSuccessAlert from "@/functions/page-specific/settings/hideSuccessAlert";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderFirstLoadMsg from "@/functions/page-specific/settings/render/renderFirstLoadMsg";
import renderSettingsSavedMsg from "@/functions/page-specific/settings/render/renderSettingsSavedMsg";
import renderControlButtons from "@/functions/page-specific/settings/render/renderControlButtons";
// Types
import { Account } from "../../shared/types/Account";
// Components
import { useAuth } from "@/components/auth/authContext";
import { useLocalization } from "@/components/localization/LocalizationContext";
import SettingsModal from "@/components/page-specific/settings/SettingsModal";
import AccountCard from "@/components/page-specific/settings/AccountCard";
// CSS
import { colors } from "../styles/variables";
import settingsStyles from "../styles/page-specific/settings";

interface SettingsProps {
  isFirstLaunch?: boolean;
  setIsFirstLaunch?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Settings: React.FC<SettingsProps> = ({
  isFirstLaunch = false,
  setIsFirstLaunch = () => {},
}) => {
  const { translate } = useLocalization();
  const { width: screenWidth } = Dimensions.get("window");
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [selectedAccount, setSelectedAccount] = useState<Account>({
    id: "",
    username: "",
    password: "",
    description: "",
    serverUrl: "",
    modemUrl: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    loadCreds({ setAccounts });
  }, []);

  useEffect(() => {
    hideSuccessAlert({ settingsSaved, setSettingsSaved });
  }, [settingsSaved]);

  useEffect(() => {
    if (!modalVisible) {
      setSelectedAccount({
        id: "",
        username: "",
        password: "",
        description: "",
        serverUrl: "",
        modemUrl: "",
      });
      setErrorMsg(null);
    }
  }, [modalVisible]);

  return loading ? (
    <View style={[settingsStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[settingsStyles.container]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={settingsStyles.container}>
        <Text style={settingsStyles.title}>{translate("settings")}</Text>

        <View
          style={[
            settingsStyles.wrapper,
            {
              paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
              paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
            },
          ]}
        >
          {renderControlButtons({ setModalVisible, translate })}
          {renderFirstLoadMsg({
            isFirstLaunch,
            translate,
          })}
          {renderErrorMsg(errorMsg)}
          {accounts.map((account, index) => (
            <AccountCard
              key={index}
              account={account}
              translate={translate}
              accounts={accounts}
              setAccounts={setAccounts}
              setSelectedAccount={setSelectedAccount}
              setModalVisible={setModalVisible}
            />
          ))}

          {renderSettingsSavedMsg({
            settingsSaved,
            translate,
          })}
        </View>
      </View>

      <SettingsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        settingsSaved={settingsSaved}
        setSettingsSaved={setSettingsSaved}
        isFirstLaunch={isFirstLaunch}
        setIsFirstLaunch={setIsFirstLaunch}
        translate={translate}
      />
    </ScrollView>
  );
};

export default Settings;
