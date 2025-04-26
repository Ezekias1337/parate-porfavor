// Library Imports
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
// Components
import RestrictionDisplay from "./RestrictionDisplay";
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import removeTimePeriodFromParentalControlsTemplate from "@/functions/network/parental-controls/removeTimePeriodFromParentalControlsTemplate";
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
// Types
import {
  Restriction,
  Template,
  ParentalControlsData,
} from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";
// CSS
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
  setRestrictionToEdit: React.Dispatch<React.SetStateAction<Restriction | null>>;
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

  return (
    <ScrollView>
      
      <View style={parentalControlsStyles.buttonContainer}>
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
      
      {template.restrictions.map((restriction, index) => (
        <View key={index} style={cardStyles.card}>
          <Text
            style={[
              parentalControlsStyles.title,
              { fontSize: fontSizes.header3, marginTop: 10 },
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
                try {
                  setDeleteLoading(true);
                  await removeTimePeriodFromParentalControlsTemplate({
                    templateNumber: template.id,
                    durationNumber: restriction.id,
                    ontToken: ontToken,
                  });
                  setDeleteLoading(false);
                  const newParentalControlsData = await handleFetchParentalControls({
                    setLoading,
                    setParentalControls,
                    setErrorMsg,
                    translate,
                  });
                  const newTemplate = newParentalControlsData.templates.find(
                    (t) => t.id === template.id
                  )
                  if (newTemplate) {
                    setSelectedTemplate(newTemplate);
                  }
                  
                  /* 
                    ! Need to reset selectedTemplate variable so modal reflects deleted restriction
                  */
                } catch (error) {
                  setErrorMsg(translate("serverError"));
                  setDeleteLoading(false);
                }
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RestrictionList;
