// Library Imports
import { View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import getDeviceListFiltered from "@/functions/network/mac-filter/getFilteredDeviceList";
import addDevicetoMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
import removeDeviceFromMacFilter from "@/functions/network/mac-filter/removeDeviceFromMacFilter";
import getOntToken from "@/functions/network/mac-filter/getOntToken";

import addDeviceToMacFilter from "../addDeviceToMacFilterHandler";
import displayParentalControlsModal from "../displayParentalControlsModal";

import extractParentalControlsDevicesFromTemplates from "../extractParentalControlsDevicesFromTemplates";
// Components
import Card from "@/components/Card";
import ParentalControlsTemplateCard from "@/components/page-specific/parental-controls/ParentalControlsTemplateCard";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "@/components/Button";
import OntToken from "../../../../../shared/types/OntToken";
import {
  ParentalControlsData,
  Template,
} from "../../../../../shared/types/ParentalControls";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Functions, Helpers, Utils, and Hooks

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
  translate: (key: string) => string;
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
  translate,
}: RenderParentalControlsTemplateCardsProps) => {
  const parentalControlsDevices =
    extractParentalControlsDevicesFromTemplates(parentalControls);

  return (
    <View style={deviceStyles.devicesContainer}>
      {selectedTemplate === null &&
        parentalControls.templates.map((template) => {
          return (
            <ParentalControlsTemplateCard
              key={template.id}
              template={template}
              devices={parentalControlsDevices}
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
          devices={parentalControlsDevices}
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
    </View>
  );
};

export default renderParentalControlsTemplateCards;
