// Library Imports
import { View, TextInput, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleInputChange from "../handleInputChange";
// Types
import { UrlSettings } from "@/screens/Settings";
// CSS
import { inputFieldStyles } from "@/styles/component-specific/input-fields";
import { colors } from "@/styles/variables";

/**
 * Renders the input fields for the settings page.
 * @param urlSettings The URL settings.
 * @param setUrlSettings The function to set the URL settings.
 * @param translate The function to translate the text.
 * @returns {JSX.Element} The rendered input fields.
*/

interface RenderInputFieldsProps {
  urlSettings: UrlSettings;
  setUrlSettings: React.Dispatch<React.SetStateAction<UrlSettings>>;
  translate: (key: string) => string;
}

const renderInputFields = ({
  urlSettings,
  setUrlSettings,
  translate,
}: RenderInputFieldsProps) => {
  return (
    <>
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("serverUrl")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("serverUrl")}
          value={urlSettings.serverUrl}
          onChangeText={handleInputChange(
            "serverUrl",
            urlSettings,
            setUrlSettings
          )}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="serverUrl"
        />
      </View>

      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("modemUrl")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("modemUrl")}
          value={urlSettings.modemUrl}
          onChangeText={handleInputChange(
            "modemUrl",
            urlSettings,
            setUrlSettings
          )}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="modemUrl"
        />
      </View>
    </>
  );
};

export default renderInputFields;
