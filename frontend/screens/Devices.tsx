// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Switch, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import addDevicetoMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
import getOntToken from "@/functions/network/mac-filter/getOntToken";
// Components
import { useAuth } from "../components/auth/authContext";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Card from "../components/Card";
// Types
import { Device } from "../../shared/types/Device";
import { MacFilter, BlacklistOrWhitelist, MacFilterEnabledOrDisabled, OntToken  } from "../../shared/types/MacFilter";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import deviceStyles from "../styles/page-specific/device";

const Devices: React.FC = () => {
  const { translate } = useLocalization();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [ontToken, setOntToken] = useState<OntToken>(null);

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    const devicesToSet = await getDeviceList();

    if (!devicesToSet || devicesToSet.length === 0) {
      setErrorMsg(translate("serverError"));
      setDevices([]);
    } else {
      setErrorMsg(null);
      setDevices(devicesToSet);
    }
    setLoading(false);
  }, [setLoading, setErrorMsg]);
  

  useEffect(() => {
    fetchDevices();
  }, []);
  
  return (
    <View style={deviceStyles.container}>
      {/* Show only one loading indicator */}
      {loading && !errorMsg ? (
        <ActivityIndicator color={colors.primary500} size="large" />
      ) : (
        <>
          {errorMsg && (
            <View style={deviceStyles.alertContainer}>
              <Alert bodyText={errorMsg} variant="error" icon="exclamation-triangle" />
            </View>
          )}

          {/* <View style={deviceStyles.switchWrapper}>
            <View style={deviceStyles.switchContainer}>
              <Text style={deviceStyles.text}>{`${translate("macFilter")}: ${translate(filterConfig.macFilterEnabledOrDisabled === "enabled" ? "enabled" : "disabled")}`}</Text>
              <Switch
                trackColor={{ false: colors.neutral100, true: colors.primary500 }}
                thumbColor={filterConfig.macFilterEnabledOrDisabled === "enabled" ? colors.neutral300 : colors.primary300}
                style={deviceStyles.switch}
                value={filterConfig.macFilterEnabledOrDisabled === "enabled"}
                onValueChange={(value) => {
                  setFilterConfig({
                    ...filterConfig,
                    macFilterEnabledOrDisabled: value ? "enabled" : "disabled",
                  });
                }}
              />
            </View>
            <View style={deviceStyles.switchContainer}>
              <Text style={deviceStyles.text}>{`${translate("filterMode")}: ${translate(filterConfig.blacklistOrWhitelist === "blacklist" ? "blacklist" : "whitelist")}`}</Text>
              <Switch
                trackColor={{ false: colors.neutral100, true: colors.primary500 }}
                thumbColor={filterConfig.blacklistOrWhitelist === "whitelist" ? colors.neutral300 : colors.primary300}
                style={deviceStyles.switch}
                value={filterConfig.blacklistOrWhitelist === "whitelist"}
                onValueChange={(value) => {
                  setFilterConfig({
                    ...filterConfig,
                    blacklistOrWhitelist: value ? "whitelist" : "blacklist",
                  });
                }}
              />
            </View>
            <View style={deviceStyles.buttonContainer}>
              <Button variant="primary" buttonSize="small" text={translate("saveChanges")} onClickHandler={() => console.log(filterConfig)} />
              <Button variant="primaryDark" buttonSize="small" text={`${translate("refresh")} ${translate("devices")}`} onClickHandler={fetchDevices} />
            </View>
          </View> */}
          
          <View style={deviceStyles.buttonContainer}>
              {/* <Button variant="primary" buttonSize="small" text={translate("saveChanges")} onClickHandler={() => console.log(filterConfig)} /> */}
              <Button variant="primary" buttonSize="small" text={`${translate("refresh")} ${translate("devices")}`} onClickHandler={fetchDevices} icon="refresh" leftIcon />
            </View>

          <View style={deviceStyles.devicesContainer}>
            {devices.map((device) => (
              <Card
                key={device.macAddr}
                headerText={device.hostName !== "" ? device.hostName : device.macAddr}
                bodyText={device.macAddr}
                buttonCount={2}
                button1Text={translate("blockInternetIndefinitely")}
                button1Variant="primary"
                button1Icon="hourglass"
                button1OnClick={async() => {
                  const ontTokenToUse = await getOntToken(device.connectionType === "WIFI" ? "wifi" : "ethernet", ontToken);
                  console.log("ontTokenToUse:", ontTokenToUse);
                  setOntToken(ontTokenToUse);
                  await addDevicetoMacFilter(device.macAddr, device.hostName, device.ssid, device.connectionType === "WIFI" ? "wifi" : "ethernet", ontTokenToUse);
                }}
                button2Text={translate("blockInternetOnSchedule")}
                button2Variant="primaryDark"
                button2Icon="calendar"
                button2OnClick={() => {}}
                imageSource=""
                cardIcon={device.connectionType === "WIFI" ? "wifi" : "desktop"}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default Devices;
                                            