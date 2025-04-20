// Library Imports
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import useRefreshToken from "@/hooks/useRefreshToken";
import handleFetchOntToken from "@/functions/page-specific/parental-controls/handleFetchOntToken";

import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderControlButtons from "@/functions/page-specific/parental-controls/render/renderControlButtons";
import renderTemplateCards from "@/functions/page-specific/parental-controls/render/renderTemplateCards";
import renderModal from "@/components/page-specific/parental-controls/ParentalControlsModal";
// Components
import { useAuth } from "../components/auth/authContext";
import ParentalControlsModal from "@/components/page-specific/parental-controls/ParentalControlsModal";
// Types
import { ParentalControlsData } from "../../shared/types/ParentalControls";
import { useLocalization } from "../components/localization/LocalizationContext";
import OntToken from "../../shared/types/OntToken";
import { Template } from "../../shared/types/ParentalControls";
// CSS
import { colors, fontSizes } from "../styles/variables";
import parentalControlsStyles from "../styles/page-specific/parentalControls";

/* 
  ! THERE ARE VALIDATION RULES WRITTEN IN THE SERVER FILES, MAKE SURE TO ENFORCE THIS
  ! IN THE FRONT END

  This screen should display two buttons at the top,
  one for refreshing the data, and one for creating NEW templates.
  
  Below that, it should display the list of templates in the form of cards
  
  Each card should display the name, description, 
  a button to edit the template, and one to delete the template
  
  When creating a template there are several different steps:
  
   ? 1. Create a new template (Enter the template name)
   ? 2. Select the array of time periods: 
    ?  a. Whole day or specific time periods
    ?  b. Everday or specific days
   ? 3. Finish the template
   
  If a template is only partially created there should be a badge notifying the user
  that the template is not complete.
  
  When editing a non finished template it should display the sections based off the data the
  user has already entered.
  
  When editing a finished template it should display the current config and place separate edit buttons
  for each section.
*/

const ParentalControls: React.FC = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const { translate } = useLocalization();
  const { isAuthenticated } = useAuth();
  useRefreshToken(isAuthenticated);

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ontToken, setOntToken] = useState<OntToken>(null);

  const [templateName, setTemplateName] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [parentalControls, setParentalControls] =
    useState<ParentalControlsData>({
      templates: [],
      connectionAttempts: 0,
    });

  useEffect(() => {
    handleFetchParentalControls({
      setLoading,
      setParentalControls,
      setErrorMsg,
      translate,
    });
  }, []);

  useEffect(() => {
    handleFetchOntToken({ ontToken, setOntToken });
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      setSelectedTemplate(null);
    }
  }, [modalVisible]);

  return loading ? (
    <View style={[parentalControlsStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[
        parentalControlsStyles.container,
        {
          paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
          paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
        },
      ]}
    >
      <Text style={parentalControlsStyles.title}>
        {translate("parentalControls")}
      </Text>

      {renderErrorMsg(errorMsg)}
      {renderControlButtons({
        setLoading,
        setParentalControls,
        setModalVisible,
        setSelectedTemplate,
        setErrorMsg,
        translate,
      })}
      {renderTemplateCards({
        templates: parentalControls.templates,
        translate,
        ontToken,
        setOntToken,
        setErrorMsg,
        setLoading,
        setParentalControls,
        setSelectedTemplate,
        setModalVisible,
      })}

      <ParentalControlsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        parentalControls={parentalControls}
        setParentalControls={setParentalControls}
        ontToken={ontToken}
        setOntToken={setOntToken}
        translate={translate}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        setLoading={setLoading}
        modalLoading={modalLoading}
        setModalLoading={setModalLoading}
        templateName={templateName}
        setTemplateName={setTemplateName}
        setErrorMsg={setErrorMsg}
      />
    </ScrollView>
  );
};

export default ParentalControls;
