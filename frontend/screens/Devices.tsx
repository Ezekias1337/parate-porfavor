// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Switch, Text, Modal } from "react-native";
// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import getDeviceListFiltered from "@/functions/network/mac-filter/getFilteredDeviceList";
import addDevicetoMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
import removeDeviceFromMacFilter from "@/functions/network/mac-filter/removeDeviceFromMacFilter";
import getOntToken from "@/functions/network/mac-filter/getOntToken";
// Components
import { useAuth } from "../components/auth/authContext";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Card from "../components/Card";
// Types
import { ButtonProps } from "../components/Button";
import { Device } from "../../shared/types/Device";
import {
  MacFilter,
  BlacklistOrWhitelist,
  MacFilterEnabledOrDisabled,
  OntToken,
} from "../../shared/types/MacFilter";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import deviceStyles from "../styles/page-specific/device";

const Devices: React.FC = () => {
  const { translate } = useLocalization();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ontToken, setOntToken] = useState<OntToken>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderErrorMsg = (errorMsg: string | null) => {
    if (errorMsg) {
      return (
        <View style={deviceStyles.alertContainer}>
          <Alert
            bodyText={errorMsg}
            variant="error"
            icon="exclamation-triangle"
          />
        </View>
      );
    }
  };

  const renderRefreshButton = () => {
    return (
      <View style={deviceStyles.buttonContainer}>
        <Button
          variant="primary"
          buttonSize="small"
          text={`${translate("refresh")} ${translate("devices")}`}
          onClickHandler={fetchDevices}
          icon="refresh"
          leftIcon
        />
      </View>
    );
  };

  const renderDeviceCards = () => {
    return (
      <View style={deviceStyles.devicesContainer}>
        {devices.map((device) => {
          const buttons: ButtonProps[] = [];

          buttons.push({
            text: translate("blockInternetIndefinitely"),
            variant: "primary",
            icon: "hourglass",
            onClickHandler: async () => {
              await addDeviceToMacFilter(device);
            },
          });
          buttons.push({
            text: translate("blockInternetOnSchedule"),
            variant: "primaryDark",
            icon: "calendar",
            onClickHandler: () => {
              displayParentalControlsModal();
            },
          });

          return (
            <Card
              key={device.macAddr}
              headerText={
                device.hostName !== "" ? device.hostName : device.macAddr
              }
              bodyText={device.macAddr}
              cardIcon={device.connectionType === "WIFI" ? "wifi" : "desktop"}
              buttons={buttons}
              imageSource=""
            />
          );
        })}

        {filteredDevices.map((filteredDevice, index) => {
          const buttons: ButtonProps[] = [];

          buttons.push({
            text: translate("unblockDevice"),
            variant: "success",
            icon: "unlock",
            onClickHandler: async () => {
              await removeDeviceFromMacFilter(
                [index + 1],
                filteredDevice.connectionType,
                ontToken
              );
              const filteredDevicesCopy = [...filteredDevices];
              const devicesCopy = [...devices];

              filteredDevicesCopy.splice(index, 1);
              devicesCopy.push(filteredDevice);

              setDevices(devicesCopy);
              setFilteredDevices(filteredDevicesCopy);
            },
          });

          return (
            <Card
              key={filteredDevice.macAddr}
              headerText={
                filteredDevice.hostName !== ""
                  ? filteredDevice.hostName
                  : filteredDevice.macAddr
              }
              bodyText={filteredDevice.macAddr}
              cardIcon={
                filteredDevice.connectionType === "WIFI" ? "wifi" : "desktop"
              }
              buttons={buttons}
              imageSource=""
            />
          );
        })}
      </View>
    );
  };

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    const devicesToSet = await getDeviceList();
    const filteredDevicesToSet = await getDeviceListFiltered();

    if (!devicesToSet || devicesToSet.length === 0) {
      setErrorMsg(translate("serverError"));
      setDevices([]);
      setFilteredDevices([]);
    } else {
      setErrorMsg(null);
      setDevices(devicesToSet);

      if (filteredDevicesToSet) {
        setFilteredDevices(filteredDevicesToSet);
      }
    }
    setLoading(false);
  }, [setLoading, setErrorMsg]);

  const addDeviceToMacFilter = async (device: Device) => {
    const ontTokenToUse = await getOntToken(
      device.connectionType === "WIFI" ? "WIFI" : "ETH",
      ontToken
    );
    setOntToken(ontTokenToUse);
    await addDevicetoMacFilter(
      device.macAddr,
      device.hostName,
      device.ssid,
      device.connectionType === "WIFI" ? "WIFI" : "ETH",
      ontTokenToUse
    );

    /* 
                  
      At the End the function needs to remove the device from the devices state array
      and be added to the filteredDevices state array
    */
  };

  const displayParentalControlsModal = () => {};

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <View style={deviceStyles.container}>
      {loading && !errorMsg ? (
        <ActivityIndicator color={colors.primary500} size="large" />
      ) : (
        <>
          {renderErrorMsg(errorMsg)}
          {renderRefreshButton()}
          {renderDeviceCards()}
        </>
      )}
    </View>
  );
};

export default Devices;
