// Library Imports
import { View } from "react-native";
// Components
import Modal from "@/components/Modal";
// Types
import {
  ParentalControlsData,
  Template,
} from "../../../../../shared/types/ParentalControls";
import { Device } from "../../../../../shared/types/Device";
import OntToken from "../../../../../shared/types/OntToken";
// Components
import Alert from "@/components/Alert";
// Functions, Helpers, Utils, and Hooks
import renderParentalControlsTemplateCards from "./renderParentalControlsTemplateCards";
// CSS
import utilityStyles from "@/styles/utilities";

/**
 * Renders the modal for the Devices page.
 * @param {boolean} modalVisible - Whether the modal is visible.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModalVisible - The function to set the modal visible state.
 * @param {Device | null} modalDevice - The device to display in the modal.
 * @param {ParentalControlsData | null} parentalControls - The parental controls data.
 * @param {React.Dispatch<ParentalControlsData>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {React.Dispatch<React.SetStateAction<Template | null>>} setSelectedTemplate - The function to set the selected template state.
 * @param {Template | null} selectedTemplate - The selected template.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {Function} translate - The function to translate the text.
 * @returns {JSX.Element} The rendered modal.
 */

interface RenderModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalDevice: Device | null;
  parentalControls: ParentalControlsData | null;
  setParentalControls: React.Dispatch<ParentalControlsData>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  ontToken: OntToken;
  setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  translate: (key: string) => string;
}

const renderModal = ({
  modalVisible,
  setModalVisible,
  parentalControls,
  setParentalControls,
  setDevices,
  modalDevice,
  ontToken,
  selectedTemplate,
  setSelectedTemplate,
  setLoading,
  translate,
}: RenderModalProps) => {
  if (!parentalControls) {
    return <></>;
  }

  return (
    <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      {parentalControls.templates.length === 0 && (
        <View style={[utilityStyles.fullFlex, utilityStyles.fullHeight]}>
          <Alert
            variant="warning"
            bodyText={translate("noParentalControlTemplates")}
            icon="info-circle"
          />
        </View>
      )}

      {renderParentalControlsTemplateCards({
        parentalControls,
        setParentalControls,
        setDevices,
        modalDevice,
        selectedTemplate,
        setSelectedTemplate,
        setModalVisible,
        ontToken,
        setLoading,
      })}
    </Modal>
  );
};

export default renderModal;
