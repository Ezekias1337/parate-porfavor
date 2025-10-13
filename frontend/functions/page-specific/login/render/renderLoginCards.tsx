// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
// Components
import LoginCard from "@/components/page-specific/login/LoginCard";
// Types
import { Account } from "../../../../../shared/types/Account";
// CSS
import utilityStyles from "@/styles/utilities";

interface RenderLoginCardsProps {
  accounts: Account[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorMsg: string | null;
  setErrorMsg: (errorMsg: string | null) => void;
  authenticate: (token: string) => Promise<void>;
  translate: (key: string) => string;
}

const renderLoginCards = ({
  accounts,
  loading,
  setLoading,
  errorMsg,
  setErrorMsg,
  authenticate,
  translate,
}: RenderLoginCardsProps) => {
  return (
    <View style={[utilityStyles.gap20, utilityStyles.fullWidth]}>
      {accounts.map((account) => (
        <LoginCard
          key={account.id}
          account={account}
          loading={loading}
          setLoading={setLoading}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          authenticate={authenticate}
          translate={translate}
        />
      ))}
    </View>
  );
};

export default renderLoginCards;
