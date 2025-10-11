// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// Components
import Card from "../../Card";
// Functions, Helpers, and Utils
import renderSubmitButton from "@/functions/page-specific/login/render/renderSubmitButton";
// Types and Interfaces
import { Account } from "../../../../shared/types/Account";
// CSS
import { colors } from "../../../styles/colors";
import cardStyles from "../../../styles/component-specific/card";

interface LoginCardProps {
  account: Account;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorMsg: string | null;
  setErrorMsg: (errorMsg: string | null) => void;
  authenticate: (token: string) => Promise<void>;
  translate: (key: string) => string;
}

const LoginCard: FC<LoginCardProps> = ({
  account,
  loading,
  setLoading,
  errorMsg,
  setErrorMsg,
  authenticate,
  translate,
}) => {
  return (
    <Card>
      <FontAwesome name={"user"} size={32} color={colors.primary500} />

      <View style={cardStyles.cardTextWrapper}>
        <Text style={cardStyles.headerText}>{account.description}</Text>
      </View>
      <View style={cardStyles.buttonWrapper}>
        {renderSubmitButton(
          {
            loading,
            setLoading,
            errorMsg,
            setErrorMsg,
            account,
            authenticate,
          },
          translate
        )}
      </View>
    </Card>
  );
};

export default LoginCard;
