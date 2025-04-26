// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Components
import Button from "@/components/Button";
// Types
import { UrlSettings } from "@/screens/Settings";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

/**
 * Renders the submit button for the settings page.
 * @param {boolean} loading - The state of the loading.
 * @param {Function} setLoading - The function to set the loading state.
 * @param {Function} setErrorMsg - The function to set the error message.
 * @param {UrlSettings} urlSettings - The url settings.
 * @param {boolean} settingsSaved - The state of the settings saved.
 * @param {Function} setSettingsSaved - The function to set the settings saved state.
 * @param {boolean} isFirstLoad - The state of the first load.
 * @param {Function} setUrlIsSet - The function to set the url is set state.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered submit button.
*/

interface RenderSubmitButtonProps {
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  setErrorMsg: (errorMsg: string | null) => void;
  urlSettings: UrlSettings;
  settingsSaved: boolean;
  setSettingsSaved: React.Dispatch<boolean>;
  isFirstLoad: boolean;
  setUrlIsSet?: (urlIsSet: boolean) => void;
}

const renderSubmitButton = (
  {
    loading,
    setLoading,
    setErrorMsg,
    urlSettings,
    settingsSaved,
    setSettingsSaved,
    isFirstLoad,
    setUrlIsSet,
  }: RenderSubmitButtonProps,
  translate: (key: string) => string
) => {
  return (
    <View style={settingsStyles.buttonContainer}>
      <Button
        text={translate("saveChanges")}
        variant="primary"
        buttonSize="medium"
        loading={loading}
        onClickHandler={async () => {
          try {
            setLoading(true);
            setErrorMsg(null);
            if (settingsSaved) {
              setSettingsSaved(false);
            }

            await saveEncrypted("urlSettings", urlSettings);
            setLoading(false);
            setSettingsSaved(true);

            if (isFirstLoad && setUrlIsSet) {
              setUrlIsSet(true);
            }
          } catch (error) {
            setErrorMsg(translate("settingsError"));
          }
        }}
        icon="floppy-o"
        leftIcon
      />
    </View>
  );
};

export default renderSubmitButton;
