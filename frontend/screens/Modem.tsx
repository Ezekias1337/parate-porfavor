// Library Imports
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import useRefreshToken from "@/hooks/useRefreshToken";
import handleFetchModemStatus from "../functions/page-specific/modem/handleFetchModemStatus";
import handleNullModemStatus from "../functions/page-specific/modem/handleNullModemStatus";
import handleCountdownTimer from "../functions/page-specific/modem/handleCountdownTimer";
import renderRebootingMsg from "../functions/page-specific/modem/render/renderRebootingMsg";
import renderButtons from "../functions/page-specific/modem/render/renderButtons";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
// Components
import { useAuth } from "../components/auth/authContext";
import PageTitle from "@/components/PageTitle";
import ModemStatusCard from "../components/page-specific/modem/ModemStatusCard";
// Types
import { ModemStatus } from "../../shared/types/Modem";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/colors";
import utilityStyles from "../styles/utilities";
import modemStyles from "../styles/page-specific/modem";

const Modem: React.FC = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const { translate } = useLocalization();
  const { logout, isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);

  const [modemStatus, setModemStatus] = useState<ModemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [modemRebooting, setModemRebooting] = useState(false);
  const [secondsBeforeLogout, setSecondsBeforeLogout] = useState(0);

  useEffect(() => {
    handleFetchModemStatus({
      setLoading,
      setModemStatus,
      setErrorMsg,
      translate,
    });
  }, [setLoading, setModemStatus, setErrorMsg, translate]);

  useEffect(() => {
    handleNullModemStatus({
      modemStatus,
      setErrorMsg,
      translate,
    });
  }, [modemStatus, setErrorMsg, translate]);

  useEffect(() => {
    handleCountdownTimer({
      modemRebooting,
      setSecondsBeforeLogout,
      logout,
    });
  }, [modemRebooting, logout]);

  return loading ? (
    <View style={[modemStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <View style={[utilityStyles.screenContentsContainer]}>
      <View style={utilityStyles.stickyTop}>
        <PageTitle text={translate("modem")} />
        {renderErrorMsg(errorMsg)}
        {renderRebootingMsg({
          secondsBeforeLogout,
          modemRebooting,
          translate,
        })}
        {renderButtons({
          setLoading,
          setModemStatus,
          setErrorMsg,
          translate,
          modemRebooting,
          setModemRebooting,
        })}
      </View>
      <ScrollView
        contentContainerStyle={[
          utilityStyles.scrollableContent,
          utilityStyles.paddingTop20,
          {
            paddingLeft: screenWidth < 500 ? 20 : screenWidth * 0.1,
            paddingRight: screenWidth < 500 ? 20 : screenWidth * 0.1,
          },
        ]}
        automaticallyAdjustKeyboardInsets={true}
      >
        {modemStatus !== null && (
          <ModemStatusCard
            cpuUsed={modemStatus.cpuUsed}
            memUsed={modemStatus.memUsed}
            systemTime={modemStatus.systemTime}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Modem;
