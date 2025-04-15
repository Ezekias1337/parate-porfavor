// Library Imports
import React, { FC, Fragment, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "../../localization/LocalizationContext";
// Constants
import daysMap from "../../../constants/Days";
// Functions, Helpers, Utils, and Hooks
import convertTo12HourFormat from "@/helpers/convertTo12HourFormat";
import addDeviceToParentalControlsTemplate from "@/functions/network/parental-controls/addDeviceToParentalControlsTemplate";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
// Interfaces and Types
import {
/*   ParentalControlsData,
  ParentalControlsDevice, */
  Template,
} from "../../../../shared/types/ParentalControls";
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";
// Components
import Button from "../../Button";
// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";
import { inputFieldStyles } from "@/styles/component-specific/input-fields";

interface ParentalControlsTemplateCardProps {
  template: Template;
  devices: Device[];
  modalDevice: Device | null;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ontToken: OntToken;
}

const ParentalControlsTemplateCard: FC<ParentalControlsTemplateCardProps> = ({
  template,
  devices,
  modalDevice,
  selectedTemplate,
  setSelectedTemplate,
  setModalVisible,
  ontToken,
}) => {
  const { translate } = useLocalization();
  const [deviceDescription, setDeviceDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const devicesBelongingToTemplate: Device[] = devices.filter(
    (device) => device.templateId === template.id
  );
  let arrayOfDays: string[] = [];

  for (const day in template.repeatDays) {
    let dayName = daysMap.get(parseInt(day));
    if (dayName) {
      arrayOfDays.push(translate(dayName));
    }
  }

  return (
    <View style={templateCardStyles.card}>
      <View style={templateCardStyles.row}>
        <Text style={templateCardStyles.title}>{template.name}</Text>
      </View>

      <View style={templateCardStyles.row}>
        <FontAwesome name="clock-o" size={40} color={colors.primary300} />
        <Text style={templateCardStyles.text}>
          {`${convertTo12HourFormat(
            template.startTime
          )} - ${convertTo12HourFormat(template.endTime)} `}
        </Text>
      </View>

      <View style={templateCardStyles.row}>
        <FontAwesome name="calendar" size={35} color={colors.primary300} />
        <Text style={templateCardStyles.text}>{arrayOfDays.join(", ")}</Text>
      </View>
      <View style={templateCardStyles.row}>
        <FontAwesome name="desktop" size={30} color={colors.primary300} />
        <Text style={templateCardStyles.text}>
          {translate("devicesUnderRestriction")}:{" "}
          {devicesBelongingToTemplate.map((device) => (
            <Fragment key={device.macAddr}>
              {device.description}
              {", "}
            </Fragment>
          ))}
          {devicesBelongingToTemplate.length === 0 && translate("noDevices")}
        </Text>
      </View>

      {selectedTemplate !== template && (
        <View style={templateCardStyles.row}>
          <Button
            text={translate("applyRestriction")}
            onClickHandler={() => {
              setSelectedTemplate(template);
            }}
            variant="primary"
            leftIcon
            icon="lock"
          />
        </View>
      )}

      {selectedTemplate === template && (
        <View>
          <View style={templateCardStyles.row}>
            <TextInput
              placeholder={translate("description")}
              value={deviceDescription}
              onChangeText={setDeviceDescription}
              style={[inputFieldStyles.textInput, templateCardStyles.input]}
              placeholderTextColor={colors.primary300}
            />
          </View>
          <View style={templateCardStyles.buttonRow}>
            <Button
              text={translate("saveChanges")}
              onClickHandler={async () => {
                try {
                  setLoading(true);
                  await addDeviceToParentalControlsTemplate(
                    modalDevice!.macAddr,
                    deviceDescription,
                    template.id,
                    ontToken
                  );
                  setErrorMsg(null);
                  setLoading(false);
                  
                  /* 
                    Need to give device.templateId a value in order to update the state
                    without refreshing the page
                  */
                  
                  setModalVisible(false);
                } catch (error) {
                  setErrorMsg(translate("failedToAddParentalControls"));
                  setLoading(false);
                }

                /* 
                  Need to show some loading state
                  and then update the device list array to reflect
                  the button change
                  
                  Need to dismiss the modal as well and
                  reset stateful values (need to check which ones)
                */
              }}
              variant="success"
              leftIcon
              icon="save"
              loading={loading}
            />
            <Button
              text={translate("cancel")}
              onClickHandler={() => {
                setSelectedTemplate(null);
              }}
              variant="neutral"
              leftIcon
              icon="ban"
            />
          </View>
          {renderErrorMsg(errorMsg)}
        </View>
      )}
    </View>
  );
};

const templateCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral700,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: fontSizes.header2,
    color: colors.primary100,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: fontSizes.header3,
    color: colors.neutral100,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
  },
});

export default ParentalControlsTemplateCard;
