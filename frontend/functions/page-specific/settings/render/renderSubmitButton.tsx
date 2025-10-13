// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
import generateRandomId from "@/utils/strings/generateRandomId";
// Components
import Button from "@/components/Button";
// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import settingsStyles from "@/styles/page-specific/settings";
import utilityStyles from "@/styles/utilities";

/**
 * Renders the submit button for the settings page.
 * @param {boolean} loading - The state of the loading.
 * @param {Function} setLoading - The function to set the loading state.
 * @param {Function} setErrorMsg - The function to set the error message.
 * @param {Account} selectedAccount - The selected account.
 * @param {boolean} settingsSaved - The state of the settings saved.
 * @param {Function} setSettingsSaved - The function to set the settings saved state.
 * @param {boolean} isFirstLaunch - The state of the first load.
 * @param {Function} setIsFirstLaunch - The function to set the first load state.
 * @param {Function} setModalVisible - The function to set the modal visible state.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered submit button.
 */

interface RenderSubmitButtonProps {
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  setErrorMsg: (errorMsg: string | null) => void;
  accounts: Account[];
  selectedAccount: Account;
  settingsSaved: boolean;
  setSettingsSaved: React.Dispatch<boolean>;
  isFirstLaunch: boolean;
  setIsFirstLaunch: React.Dispatch<React.SetStateAction<boolean | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderSubmitButton = (
  {
    loading,
    setLoading,
    setErrorMsg,
    accounts,
    selectedAccount,
    settingsSaved,
    setSettingsSaved,
    isFirstLaunch,
    setIsFirstLaunch,
    setModalVisible,
  }: RenderSubmitButtonProps,
  translate: (key: string) => string
) => {
  return (
    <View style={utilityStyles.buttonWrapper}>
      <Button
        text={translate("saveChanges")}
        variant="primary"
        buttonSize="large"
        loading={loading}
        onClickHandler={async () => {
          try {
            setLoading(true);
            setErrorMsg(null);
            if (settingsSaved) {
              setSettingsSaved(false);
            }

            const failedConditions = [
              selectedAccount.description.trim() === "",
              selectedAccount.username.trim() === "",
              selectedAccount.password.trim() === "",
              selectedAccount.serverUrl.trim() === "",
            ];
            if (failedConditions.some((condition) => condition)) {
              setLoading(false);
              throw new Error("Failed to save settings due to empty fields.");
            }

            const oldAccountIndex = accounts.findIndex(
              (acc) => acc.id === selectedAccount.id
            );
            if (oldAccountIndex !== -1) {
              accounts[oldAccountIndex] = selectedAccount;
            } else {
              selectedAccount.id = generateRandomId();
              accounts.push(selectedAccount);
            }

            await saveEncrypted("accounts", accounts);
            setLoading(false);
            setSettingsSaved(true);
            setModalVisible(false);
            if (isFirstLaunch) {
              setIsFirstLaunch(false);
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
