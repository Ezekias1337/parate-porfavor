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
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
import renderControlButtons from "@/functions/page-specific/parental-controls/render/renderControlButtons";
import renderTemplateCards from "@/functions/page-specific/parental-controls/render/renderTemplateCards";
// Components
import { useAuth } from "../components/auth/authContext";
// Types
import { ParentalControlsData } from "../../shared/types/ParentalControls";
import { useLocalization } from "../components/localization/LocalizationContext";
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  return loading ? (
    <View style={[parentalControlsStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[
        parentalControlsStyles.container,
        { padding: screenWidth < 500 ? 20 : screenWidth * 0.2 },
      ]}
    >
      <>
        <Text style={{ fontSize: fontSizes.header1, color: colors.primary200 }}>
          {translate("parentalControls")}
        </Text>

        {renderErrorMsg(errorMsg)}
        {renderControlButtons({
          setLoading,
          setParentalControls,
          setErrorMsg,
          translate,
        })}

        {renderTemplateCards({
          templates: parentalControls.templates,
          translate,
        })}
      </>
    </ScrollView>
  );
};

export default ParentalControls;
