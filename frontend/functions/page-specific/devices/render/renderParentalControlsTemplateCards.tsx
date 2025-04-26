// Library Imports
import { ScrollView } from "react-native";
// Components
import ParentalControlsTemplateCard from "@/components/page-specific/devices/ParentalControlsTemplateCard";
// Types
import { Device } from "../../../../../shared/types/Device";
import OntToken from "../../../../../shared/types/OntToken";
import {
  ParentalControlsData,
  Template,
} from "../../../../../shared/types/ParentalControls";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";

/**
 * Renders the Parental Controls Template Cards.
 * @param {ParentalControlsData} parentalControls - The parental controls data.
 * @param {Device | null} modalDevice - The device to display in the modal.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @param {React.Dispatch<ParentalControlsData>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<Template | null>>} setSelectedTemplate - The function to set the selected template state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModalVisible - The function to set the modal visible state.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @returns {JSX.Element} The rendered Parental Controls Template Cards.
*/

interface RenderParentalControlsTemplateCardsProps {
  parentalControls: ParentalControlsData;
  modalDevice: Device | null;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setParentalControls: React.Dispatch<
    ParentalControlsData
  >;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ontToken: OntToken;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderParentalControlsTemplateCards = ({
  parentalControls,
  modalDevice,
  setDevices,
  setParentalControls,
  selectedTemplate,
  setSelectedTemplate,
  setModalVisible,
  ontToken,
  setLoading,
}: RenderParentalControlsTemplateCardsProps) => {

  return (
    <ScrollView contentContainerStyle={deviceStyles.devicesContainer}>
      {selectedTemplate === null &&
        parentalControls.templates.map((template) => {
          return (
            <ParentalControlsTemplateCard
              key={template.id}
              template={template}
              setParentalControls={setParentalControls}
              setDevices={setDevices}
              modalDevice={modalDevice}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              ontToken={ontToken}
              setModalVisible={setModalVisible}
              setLoading={setLoading}
            />
          );
        })}

      {selectedTemplate !== null && (
        <ParentalControlsTemplateCard
          template={selectedTemplate}
          setParentalControls={setParentalControls}
          setDevices={setDevices}
          modalDevice={modalDevice}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          ontToken={ontToken}
          setModalVisible={setModalVisible}
          setLoading={setLoading}
        />
      )}
    </ScrollView>
  );
};

export default renderParentalControlsTemplateCards;
