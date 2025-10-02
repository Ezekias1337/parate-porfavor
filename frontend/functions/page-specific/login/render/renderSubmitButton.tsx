// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleLogin from "../handleLogin";
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Components
import Button from "@/components/Button";
// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import loginStyles from "@/styles/page-specific/login";

/**
 * Renders the login submit button
 * @param loading The loading state
 * @param setLoading The function to set the loading state
 * @param errorMsg The error message
 * @param setErrorMsg The function to set the error message
 * @param loginCredentials The login credentials
 * @param authenticate The function to authenticate the user
 * @returns {JSX.Element} The rendered login submit button
 */

interface RenderSubmitButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorMsg: string | null;
  setErrorMsg: (errorMsg: string | null) => void;
  account: Account;
  authenticate: (token: string) => Promise<void>;
}

const renderSubmitButton = (
  {
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
    account,
    authenticate,
  }: RenderSubmitButtonProps,
  translate: (key: string) => string
) => {
  return (
    <View style={loginStyles.buttonContainer}>
      <Button
        text={translate("login")}
        variant="primary"
        buttonSize="medium"
        loading={loading}
        onClickHandler={async () => {
          await saveEncrypted("serverUrl", account.serverUrl);
          await saveEncrypted("modemUrl", account.modemUrl);
          await saveEncrypted("lastUsedProfile", account.id);
          
          await handleLogin({
            account,
            setLoading,
            errorMsg,
            setErrorMsg,
            authenticate,
            translate,
          });
        }}
        icon="sign-in"
        leftIcon
      />
    </View>
  );
};

export default renderSubmitButton;
