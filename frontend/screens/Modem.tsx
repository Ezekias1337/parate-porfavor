// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";
// Functions, Helpers, Utils, and Hooks
import getModemStatus from "../functions/network/modem/getModemStatus";
import rebootModem from "../functions/network/modem/rebootModem";
import useRefreshToken from "@/hooks/useRefreshToken";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
// Components
import { useAuth } from "../components/auth/authContext";
import Button from "../components/Button";
import Alert from "../components/Alert";
import ModemStatusCard from "../components/page-specific/modem/ModemStatusCard";
// Types
import { ModemStatus } from "../../shared/types/Modem";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors, fontSizes } from "../styles/variables";
import modemStyles from "../styles/page-specific/modem";

const Modem: React.FC = () => {
  const { translate } = useLocalization();
  const { logout, isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);

  const [modemStatus, setModemStatus] = useState<ModemStatus | null>(null);
  const [displayButtons, setDisplayButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [modemRebooting, setModemRebooting] = useState(false);
  const [secondsBeforeLogout, setSecondsBeforeLogout] = useState(0);

  const fetchModemStatus = useCallback(async () => {
    setLoading(true);
    const status = await getModemStatus();

    if (status === null) {
      setErrorMsg(translate("serverError"));
    }
    setLoading(false);
    setModemStatus(status);
  }, [setLoading, setErrorMsg, setModemStatus]);

  useEffect(() => {
    fetchModemStatus();
  }, []);

  useEffect(() => {
    if (
      modemStatus?.cpuUsed === null ||
      modemStatus?.memUsed === null ||
      modemStatus?.systemTime === null
    ) {
      setErrorMsg(translate("errorGettingModemStatus"));
    }
  }, [modemStatus]);

  useEffect(() => {
    if (!loading) {
      setDisplayButtons(true);
    } else {
      setDisplayButtons(false);
    }
  }, [loading]);

  // Countdown Timer for Logout
  useEffect(() => {
    if (modemRebooting) {
      setSecondsBeforeLogout(5);

      const interval = setInterval(() => {
        setSecondsBeforeLogout((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [modemRebooting, logout]);

  return loading && !errorMsg ? (
    <View style={[modemStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={modemStyles.container}>
      <>
        <Text style={{ fontSize: fontSizes.header1, color: colors.primary200 }}>
          {translate("modem")}
        </Text>

        {renderErrorMsg(errorMsg)}

        {modemRebooting && (
          <View style={modemStyles.alertContainer}>
            <Alert
              bodyText={`${translate(
                "modemIsRebooting"
              )} ${secondsBeforeLogout} ${translate("seconds")}`}
              variant="info"
              icon="info-circle"
            />
          </View>
        )}

        {!loading && modemStatus !== null && errorMsg === null && (
          <ModemStatusCard
            cpuUsed={modemStatus.cpuUsed}
            memUsed={modemStatus.memUsed}
            systemTime={modemStatus.systemTime}
          />
        )}

        {displayButtons && (
          <View style={modemStyles.buttonContainer}>
            <Button
              text={translate("rebootModem")}
              variant="primary"
              onClickHandler={async () => {
                await rebootModem();
                setModemRebooting(true);
              }}
              loading={modemRebooting}
              icon="power-off"
              leftIcon
            />
            <Button
              variant="primaryDark"
              text={translate("refresh")}
              onClickHandler={fetchModemStatus}
              icon="refresh"
              leftIcon
            />
          </View>
        )}
      </>
    </ScrollView>
  );
};

export default Modem;
