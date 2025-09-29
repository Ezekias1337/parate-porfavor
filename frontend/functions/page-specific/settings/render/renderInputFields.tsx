// Library Imports
import { View, TextInput, Text } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleInputChange from "../handleInputChange";
// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import { inputFieldStyles } from "@/styles/component-specific/input-fields";
import { colors } from "@/styles/variables";

/**
 * Renders the input fields for the settings page.
 * @param selectedAccount The URL settings.
 * @param setSelectedAccount The function to set the URL settings.
 * @param translate The function to translate the text.
 * @returns {JSX.Element} The rendered input fields.
 */

interface RenderInputFieldsProps {
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
  translate: (key: string) => string;
}

const renderInputFields = ({
  selectedAccount,
  setSelectedAccount,
  translate,
}: RenderInputFieldsProps) => {
  return (
    <>
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("profileDescription")}
          </Text>
        </View>
        <TextInput
          placeholder={translate("profileDescription")}
          value={selectedAccount.description}
          onChangeText={handleInputChange(
            "description",
            selectedAccount,
            setSelectedAccount
          )}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="profileDescription"
        />
      </View>
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("username")}
          </Text>
        </View>
        <TextInput
          placeholder={translate("username")}
          value={selectedAccount.username}
          onChangeText={handleInputChange(
            "username",
            selectedAccount,
            setSelectedAccount
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
          value={selectedAccount.password}
          onChangeText={handleInputChange(
            "password",
            selectedAccount,
            setSelectedAccount
          )}
          secureTextEntry
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="password"
        />
      </View>
      <View style={inputFieldStyles.formRow}>
        <View style={inputFieldStyles.formLabelContainer}>
          <Text style={inputFieldStyles.formLabel}>
            {translate("serverUrl")}
          </Text>
        </View>

        <TextInput
          placeholder={translate("serverUrl")}
          value={selectedAccount.serverUrl}
          onChangeText={handleInputChange(
            "serverUrl",
            selectedAccount,
            setSelectedAccount
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
          value={selectedAccount.modemUrl}
          onChangeText={handleInputChange(
            "modemUrl",
            selectedAccount,
            setSelectedAccount
          )}
          style={inputFieldStyles.textInput}
          placeholderTextColor={colors.primary300}
          id="modemUrl"
        />
      </View>

      <View style={inputFieldStyles.formRow}></View>
    </>
  );
};

export default renderInputFields;
