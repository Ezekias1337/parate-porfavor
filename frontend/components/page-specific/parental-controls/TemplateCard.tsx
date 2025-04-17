// Library Imports
import { View, Text, StyleSheet } from "react-native";
// Components
import Button from "@/components/Button";
import Badge from "@/components/Badge";
// Functions, Helpers, Utils, and Hooks
import renderBadges from "@/functions/component-specific/template-card/renderBadges";
import parseParentalControlsDataForDisplay from "@/functions/general/parseParentalControlsDataForDisplay";
// Types
import { Template } from "../../../../shared/types/ParentalControls";
import { Device } from "../../../../shared/types/Device";
// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";

interface TemplateCardProps {
  template: Template;
  translate: (key: string) => string;
}

const TemplateCard = ({ template, translate }: TemplateCardProps) => {
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
        />
        <Button
          text={translate("delete")}
          variant="error"
          icon="trash"
          leftIcon
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
