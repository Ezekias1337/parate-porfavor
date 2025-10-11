// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Components
import Card from "../../Card";
// Functions, Helpers, and Utils
import renderAccountCardButtons from "@/functions/page-specific/settings/render/renderAccountCardButtons";
import obscureSensitiveText from "../../../utils/strings/obscureSensitiveText";
// Types and Interfaces
import { Account } from "../../../../shared/types/Account";
// CSS
import { colors } from "../../../styles/colors";
import cardStyles from "../../../styles/component-specific/card";

interface AccountCardProps {
  account: Account;
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  translate: (key: string) => string;
}

const AccountCard: FC<AccountCardProps> = ({
  account,
  accounts,
  setAccounts,
  setSelectedAccount,
  setModalVisible,
  translate,
}) => {
  return (
    <Card>
      <FontAwesome name={"user"} size={32} color={colors.primary500} />

      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.headerText}>{account.description}</Text>
      </View>
      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.bodyText}>
          {translate("username")}: {account.username}
        </Text>
        <Text style={cardStyles.bodyText}>
          {translate("password")}: {obscureSensitiveText(account.password)}
        </Text>
        <Text style={cardStyles.bodyText}>
          {translate("serverUrl")}: {account.serverUrl}
        </Text>
        <Text style={cardStyles.bodyText}>
          {translate("modemUrl")}: {account.modemUrl}
        </Text>
      </View>

      {renderAccountCardButtons({
        account,
        accounts,
        setAccounts,
        setSelectedAccount,
        setModalVisible,
        translate,
      })}
    </Card>
  );
};

export default AccountCard;
