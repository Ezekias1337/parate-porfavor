// Library Imports
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useLocalization } from "../../localization/LocalizationContext";
// Functions, Helpers, Utils, and Hooks
import fetchDevicesAndParentalControls from "@/functions/page-specific/devices/fetchDevicesAndParentalControls";
import parseParentalControlsDataForDisplay from "@/functions/general/parseParentalControlsDataForDisplay";
import addDeviceToParentalControlsTemplate from "@/functions/network/parental-controls/addDeviceToParentalControlsTemplate";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderBadges from "@/functions/component-specific/template-card/renderBadges";
// Interfaces and Types
import { Template } from "../../../../shared/types/ParentalControls";
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";
// Components
import Button from "../../Button";
// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";
import { inputFieldStyles } from "@/styles/component-specific/input-fields";

interface ParentalControlsTemplateCardProps {
  template: Template;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<React.SetStateAction<any>>;
  modalDevice: Device | null;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ontToken: OntToken;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParentalControlsTemplateCard: FC<ParentalControlsTemplateCardProps> = ({
  template,
  setDevices,
  setParentalControls,
  modalDevice,
  selectedTemplate,
  setSelectedTemplate,
  setModalVisible,
  ontToken,
  setLoading,
}) => {
  const { translate } = useLocalization();
  const [deviceDescription, setDeviceDescription] = useState<string>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!template.restrictions.length) {
    return <></>;
  }

  return (
    <View style={templateCardStyles.card}>
      {parseParentalControlsDataForDisplay({
        template,
        translate,
      })}

      {selectedTemplate !== template && (
        <>
          {renderBadges(template, translate)}
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
        </>
      )}

      {selectedTemplate === template && (
        <View>
          <View style={templateCardStyles.row}>
            <Text
              style={[
                templateCardStyles.text,
                templateCardStyles.bold,
                {
                  color: colors.primary100,
                  fontSize: fontSizes.general,
                  marginTop: 10,
                },
              ]}
            >
              {translate("deviceDescription")}:{" "}
            </Text>
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
                  setLoadingButton(true);
                  await addDeviceToParentalControlsTemplate(
                    modalDevice!.macAddr,
                    deviceDescription,
                    template.id,
                    ontToken
                  );
                  setErrorMsg(null);
                  setLoadingButton(false);
                  setModalVisible(false);

                  await fetchDevicesAndParentalControls(
                    {
                      setDevices,
                      setParentalControls,
                      setLoading,
                      setErrorMsg,
                    },
                    translate
                  );
                } catch (error) {
                  setErrorMsg(translate("failedToAddParentalControls"));
                  setLoadingButton(false);
                }
              }}
              variant="success"
              leftIcon
              icon="save"
              loading={loadingButton}
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
    backgroundColor: colors.neutral800,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    display: "flex",
    flexDirection: "column",
    maxWidth: "95%",
    width: "100%",
  },

  title: {
    fontSize: fontSizes.header2,
    color: colors.primary100,
    fontWeight: "bold",
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
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
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
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
