// Library Imports
import { View, TextInput, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleInputChange from "../handleInputChange";
// Types
import { LoginCredentials } from "@/screens/Login";
// CSS
import { inputFieldStyles } from "@/styles/component-specific/input-fields";
import { colors } from "@/styles/variables";

interface RenderInputFieldsProps {
  loginCredentials: LoginCredentials;
  setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>;
}

const renderInputFields = (
  { loginCredentials, setLoginCredentials }: RenderInputFieldsProps,
  translate: (key: string) => string
) => {
  return (
    <>
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("username")}
          </Text>
        </View>
        <TextInput
          placeholder={translate("username")}
          value={loginCredentials.username}
          onChangeText={handleInputChange(
            "username",
            loginCredentials,
            setLoginCredentials
          )}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="username"
        />
      </View>

      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("password")}
          </Text>
        </View>
        <TextInput
          placeholder={translate("password")}
          value={loginCredentials.password}
          onChangeText={handleInputChange(
            "password",
            loginCredentials,
            setLoginCredentials
          )}
          secureTextEntry
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="password"
        />
      </View>
    </>
  );
};

export default renderInputFields;
