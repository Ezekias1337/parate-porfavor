// Functions, Helpers, Utils, and Hooks
import renderCreateProfileMsg from "@/functions/page-specific/settings/render/renderCreateProfileMsg";
import renderInputFields from "@/functions/page-specific/settings/render/renderInputFields";
import renderSubmitButton from "@/functions/page-specific/settings/render/renderSubmitButton";
import renderErrorMsg from "@/functions/general/renderErrorMsg";
// Components
import Modal from "@/components/Modal";
// Types
import { Account } from "../../../../shared/types/Account";

interface RenderModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  accounts: Account[];
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMsg: string | null;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  settingsSaved: boolean;
  setSettingsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstLaunch: boolean;
  setIsFirstLaunch: React.Dispatch<React.SetStateAction<boolean | null>>;
  translate: (key: string) => string;
}

export interface SelectedDays {
  [key: number]: boolean;
}

const SettingsModal: React.FC<RenderModalProps> = ({
  modalVisible,
  setModalVisible,
  accounts,
  selectedAccount,
  setSelectedAccount,
  loading,
  setLoading,
  errorMsg,
  setErrorMsg,
  settingsSaved,
  setSettingsSaved,
  isFirstLaunch,
  setIsFirstLaunch,
  translate,
}: RenderModalProps) => {
  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {renderCreateProfileMsg({ translate })}
      {renderInputFields({
        selectedAccount,
        setSelectedAccount,
        translate,
      })}
      {renderErrorMsg(errorMsg)}
      {renderSubmitButton(
        {
          loading,
          setLoading,
          setErrorMsg,
          accounts,
          selectedAccount,
          settingsSaved,
          setSettingsSaved,
          isFirstLaunch,
          setIsFirstLaunch,
          setModalVisible,
        },
        translate
      )}
    </Modal>
  );
};

export default SettingsModal;
