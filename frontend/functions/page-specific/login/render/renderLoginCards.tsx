// Components
import LoginCard from "@/components/page-specific/login/LoginCard";
// Types
import { Account } from "../../../../../shared/types/Account";

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
    <>
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
    </>
  );
};

export default renderLoginCards;
