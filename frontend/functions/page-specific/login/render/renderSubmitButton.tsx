// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleLogin from "../handleLogin";
// Components
import Button from "@/components/Button";
// Types
import { LoginCredentials } from "@/screens/Login";
// CSS
import loginStyles from "@/styles/page-specific/login";

interface RenderInputFieldsProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorMsg: string | null;
  setErrorMsg: (errorMsg: string | null) => void;
  loginCredentials: LoginCredentials;
  authenticate: (token: string) => Promise<void>;
}

const renderSubmitButton = (
  {
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
    loginCredentials,
    authenticate,
  }: RenderInputFieldsProps,
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
          await handleLogin({
            loginCredentials,
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
