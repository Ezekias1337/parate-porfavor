// Library Imports
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import Button from "@/components/Button";
import Badge from "@/components/Badge";
// Functions, Helpers, Utils, and Hooks
import renderBadges from "@/functions/component-specific/template-card/renderBadges";
import parseParentalControlsDataForDisplay from "@/functions/general/parseParentalControlsDataForDisplay";
import deleteParentalControlsTemplate from "@/functions/network/parental-controls/deleteParentalControlsTemplate";
import getOntToken from "@/functions/network/parental-controls/getOntToken";
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
import handleDeleteParentalControls from "@/functions/page-specific/parental-controls/handleDeleteParentalControls";
// Types
import { Template } from "../../../../shared/types/ParentalControls";
import { ParentalControlsData } from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";
// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";

interface TemplateCardProps {
  template: Template;
  translate: (key: string) => string;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateCard = ({
  template,
  translate,
  ontToken,
  setOntToken,
  setErrorMsg,
  setLoading,
  setParentalControls,
  setSelectedTemplate,
  setModalVisible,
}: TemplateCardProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <View style={templateCardStyles.card}>
      {parseParentalControlsDataForDisplay({
        template,
        translate,
      })}

      {renderBadges(template, translate)}
      <View style={templateCardStyles.buttonRow}>
        <Button
          text={translate("edit")}
          variant="primary"
          icon="pencil"
          leftIcon
          onClickHandler={() => {
            setSelectedTemplate(template);
            setModalVisible(true);
          }}
        />
        <Button
          text={translate("delete")}
          variant="error"
          loading={deleteLoading}
          icon="trash"
          leftIcon
          onClickHandler={async () => {
            await handleDeleteParentalControls({
              templateId: template.id,
              translate,
              ontToken,
              setErrorMsg,
              setLoading,
              setParentalControls,
              setDeleteLoading,
            });
          }}
        />
      </View>
    </View>
  );
};

export const templateCardStyles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "column",
    alignContent: "stretch",
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
  badgeRow: {
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
  },
});

export default TemplateCard;
