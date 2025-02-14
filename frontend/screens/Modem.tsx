// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
// Functions, Helpers, Utils, and Hooks
import getModemStatus from "../functions/network/modem/getModemStatus";
// Components
import Button from "../components/Button";
import Alert from "../components/Alert";
import ModemStatusCard from "../components/page-specific/modem/ModemStatusCard";
// Types
import { ModemStatus } from "../../shared/types/Modem";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import modemStyles from "../styles/page-specific/index";

const Modem: React.FC = () => {
  const { translate } = useLocalization();
  const [modemStatus, setModemStatus] = useState<ModemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchModemStatus = useCallback(async () => {
    setLoading(true);
    const status = await getModemStatus();

    if (status === null) {
      setErrorMsg(translate("serverError"));
      setLoading(false);
    } else {
      setModemStatus(status);
      setLoading(false);
    }
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

  return (
    <View style={modemStyles.container}>
      {loading && <ActivityIndicator color={colors.primary500} size="large" />}
      {errorMsg && <Alert bodyText={errorMsg} variant="error" />}
      {errorMsg === translate("errorGettingModemStatus") && (
        <Button
          variant="primary"
          text={translate("refresh")}
          onClickHandler={fetchModemStatus}
        />
      )}
      {modemStatus !== null && (
        <ModemStatusCard
          cpuUsed={modemStatus.cpuUsed}
          memUsed={modemStatus.memUsed}
          systemTime={modemStatus.systemTime}
        />
      )}
    </View>
  );
};

export default Modem;
