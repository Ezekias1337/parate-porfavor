// Library Imports
import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
// Components
import RestrictionDisplay from "./RestrictionDisplay";
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks

// Types
import {
  Restriction,
  Template,
} from "../../../../shared/types/ParentalControls";
// CSS
import { fontSizes } from "@/styles/variables";
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
interface RestrictionListProps {
  template: Template;
  translate: (key: string) => string;
}

const RestrictionList: React.FC<RestrictionListProps> = ({
  template,
  translate,
}) => {
  return (
    <ScrollView>
      {template.restrictions.map((restriction, index) => (
        <View key={index}>
          <Text
            style={[
              parentalControlsStyles.title,
              { fontSize: fontSizes.header3, marginTop: 10 },
            ]}
          >{`${translate("scheduledRestriction")} ${index + 1}`}</Text>
          <RestrictionDisplay restriction={restriction} translate={translate} />
          <View style={parentalControlsStyles.buttonContainer}>
            <View style={{ width: "40%" }}>
              <Button
                text={translate("edit")}
                variant="primary"
                leftIcon
                icon="pencil"
              />
            </View>
            <View style={{ width: "40%" }}>
              <Button
                text={translate("delete")}
                variant="error"
                leftIcon
                icon="trash"
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RestrictionList;
