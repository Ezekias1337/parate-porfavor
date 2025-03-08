// Library Imports
import React, { useState } from "react";
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import login from "@/functions/network/auth/login";
// Components
import { useAuth } from "../components/auth/authContext";
import { TextInput } from "react-native";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import loginStyles from "../styles/page-specific/login";
import { inputFieldStyles } from "../styles/component-specific/input-fields";

const Login: React.FC = () => {
  const { translate } = useLocalization();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authenticate } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await login(username, password);
      if (token === null) {
        setErrorMsg(translate("authError"));
        setLoading(false);
      } else if (token != null) {
        if (errorMsg !== null) {
          setErrorMsg(null);
        }
        setLoading(false);
        await authenticate(token);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg(translate("authError"));
      console.error("Login error:", error);
    }
  };

  return (
    <View style={loginStyles.container}>
      {errorMsg !== null && (
        <View style={loginStyles.alertContainer}>
          <Alert
            bodyText={translate("authError")}
            variant="error"
            icon="exclamation-triangle"
          />
        </View>
      )}

      <TextInput
        placeholder={translate("username")}
        value={username}
        onChangeText={setUsername}
        style={inputFieldStyles.textInput}
        placeholderTextColor={colors.primary300}
      />
      <TextInput
        placeholder={translate("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={inputFieldStyles.textInput}
        placeholderTextColor={colors.primary300}
      />
      <View style={loginStyles.buttonContainer}>
        <Button
          text={translate("login")}
          variant="primary"
          buttonSize="medium"
          loading={loading}
          onClickHandler={async () => {
            await handleLogin();
          }}
          icon="sign-in"
          leftIcon
        />
      </View>
    </View>
  );
};

export default Login;
