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

import extractParentalControlsDevicesFromTemplates from "../extractParentalControlsDevicesFromTemplates"
// Components
import Card from "@/components/Card";
import ParentalControlsTemplateCard from "@/components/page-specific/parental-controls/ParentalControlsTemplateCard";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "@/components/Button";
import OntToken from "../../../../../shared/types/OntToken";
import {
  ParentalControlsData,
  ParentalControlsDevice,
  Template,
} from "../../../../../shared/types/ParentalControls";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Functions, Helpers, Utils, and Hooks

interface RenderParentalControlsTemplateCardsProps {
  parentalControlsData: ParentalControlsData;
  modalDevice: Device | null;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  ontToken: OntToken;
  translate: (key: string) => string;
}

const renderParentalControlsTemplateCards = ({
  parentalControlsData,
  modalDevice,
  selectedTemplate,
  setSelectedTemplate,
  ontToken,
  translate,
}: RenderParentalControlsTemplateCardsProps) => {
  const parentalControlsDevices = extractParentalControlsDevicesFromTemplates(parentalControlsData);

  return (
    <View style={deviceStyles.devicesContainer}>
      {selectedTemplate === null &&
        parentalControlsData.templates.map((template) => {
          return (
            <ParentalControlsTemplateCard
              key={template.id}
              template={template}
              devices={parentalControlsDevices}
              modalDevice={modalDevice}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              ontToken={ontToken}
            />
          );
        })}

      {selectedTemplate !== null && (
        <ParentalControlsTemplateCard
          template={selectedTemplate}
          devices={parentalControlsDevices}
          modalDevice={modalDevice}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          ontToken={ontToken}
        />
      )}
    </View>
  );
};

export default renderParentalControlsTemplateCards;
