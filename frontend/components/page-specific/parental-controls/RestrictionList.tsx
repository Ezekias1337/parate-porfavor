// Library Imports
import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
// Components
import RestrictionDisplay from "./RestrictionDisplay";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
// Functions, Helpers, Utils, and Hooks
import handleRemoveTimePeriod from "@/functions/page-specific/parental-controls/handleRemoveTimePeriod";
// Types
import {
  Restriction,
  Template,
  ParentalControlsData,
} from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";
// CSS
import utilityStyles from "../../../styles/utilities";
import cardStyles from "../../../styles/component-specific/card";
import { fontSizes } from "@/styles/variables";
import parentalControlsStyles from "../../../styles/page-specific/parentalControls";
interface RestrictionListProps {
  template: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  ontToken: OntToken;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setParentalControls: React.Dispatch<
    React.SetStateAction<ParentalControlsData>
  >;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  translate: (key: string) => string;
  setRestrictionToEdit: React.Dispatch<
    React.SetStateAction<Restriction | null>
  >;
  setShowSchedulePeriodSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestrictionList: React.FC<RestrictionListProps> = ({
  template,
  setSelectedTemplate,
  ontToken,
  setLoading,
  setParentalControls,
  setErrorMsg,
  translate,
  setRestrictionToEdit,
  setShowSchedulePeriodSelector,
  setModalVisible,
}) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [maxTemplatesReached, setMaxTemplatesReached] =
    useState<boolean>(false);

  useEffect(() => {
    if (template.restrictions.length >= 4) {
      setMaxTemplatesReached(true);
    } else {
      setMaxTemplatesReached(false);
    }
  }, [template.restrictions]);

  return (
    <ScrollView>
      <View style={parentalControlsStyles.buttonContainer}>
        {!maxTemplatesReached && (
          <Button
            text={translate("addNewSchedule")}
            variant="success"
            leftIcon
            icon="plus"
            onClickHandler={() => {
              setRestrictionToEdit(null);
              setShowSchedulePeriodSelector(true);
            }}
          />
        )}

        <Button
          text={translate("cancel")}
          variant="neutral"
          leftIcon
          icon="ban"
          onClickHandler={() => {
            setSelectedTemplate(null);
            setModalVisible(false);
          }}
        />
      </View>
      
      {maxTemplatesReached && (
        <Alert
          variant="warning"
          bodyText={translate("tooManySchedules")}
          icon="exclamation-triangle"
        />
      )}

      {template.restrictions.map((restriction, index) => (
        <View key={index} style={cardStyles.card}>
          <Text
            style={[
              parentalControlsStyles.title,
              utilityStyles.marginTop10,
              { fontSize: fontSizes.header3 },
            ]}
          >{`${translate("scheduledRestriction")} ${index + 1}`}</Text>
          <RestrictionDisplay restriction={restriction} translate={translate} />
          <View style={parentalControlsStyles.buttonContainer}>
            <Button
              text={translate("edit")}
              variant="primary"
              leftIcon
              icon="pencil"
              onClickHandler={() => {
                setRestrictionToEdit(restriction);
                setShowSchedulePeriodSelector(true);
              }}
            />

            <Button
              text={translate("delete")}
              variant="error"
              leftIcon
              icon="trash"
              loading={deleteLoading}
              onClickHandler={async () => {
                await handleRemoveTimePeriod({
                  template,
                  restriction,
                  setSelectedTemplate,
                  setLoading,
                  setParentalControls,
                  setErrorMsg,
                  translate,
                  setDeleteLoading,
                  ontToken,
                });
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RestrictionList;
