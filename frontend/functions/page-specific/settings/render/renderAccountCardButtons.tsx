// Library Imports
import { View } from "react-native";
// Components
import Button from "@/components/Button";
// Functions, Helpers, Utils, and Hooks
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import settingsStyles from "@/styles/page-specific/settings";

/**
 * Renders the control buttons for the Settings page.
 * @param {Account} account - The current account.
 * @param {Account[]} accounts - The list of all accounts.
 * @param {Function} setAccounts - The function to update the accounts state.
 * @param {Function} setSelectedAccount - The function to set the selected account for editing.
 * @param {Function} setModalVisible - The function to control the visibility of the modal.
 * @param {Function} translate - The function to translate text keys.
 * @returns {JSX.Element} The rendered control buttons.
 */

interface RenderAccountCardButtonsProps {
  account: Account;
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  translate: (key: string) => string;
}

const renderAccountCardButtons = ({
  account,
  accounts,
  setAccounts,
  setSelectedAccount,
  setModalVisible,
  translate,
}: RenderAccountCardButtonsProps) => {
  return (
    <View style={settingsStyles.buttonContainer}>
      <Button
        text={translate("editProfile")}
        variant="success"
        icon="plus"
        leftIcon
        onClickHandler={() => {
          setSelectedAccount(account);
          setModalVisible(true);
        }}
      />
      <Button
        text={translate("deleteProfile")}
        variant="error"
        icon="trash"
        leftIcon
        onClickHandler={async () => {
          const updatedAccounts = accounts.filter((a) => a.id !== account.id);
          await saveEncrypted("accounts", updatedAccounts);
          setAccounts(updatedAccounts);
        }}
      />
    </View>
  );
};

export default renderAccountCardButtons;
