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
// Components
import Card from "@/components/Card";
import ParentalControlsTemplateCard from "@/components/page-specific/parental-controls/ParentalControlsTemplateCard";
// Types
import { Device } from "../../../../../shared/types/Device";
import { ButtonProps } from "@/components/Button";
import { OntToken } from "../../../../../shared/types/MacFilter";
import { ParentalControlsData } from "../../../../../shared/types/ParentalControls";
// CSS
import deviceStyles from "../../../../styles/page-specific/device";
// Functions, Helpers, Utils, and Hooks

const renderParentalControlsTemplateCards = (
  parentalControlsData: ParentalControlsData,
  translate: (key: string) => string
) => {
  return (
    <View style={deviceStyles.devicesContainer}>
      {parentalControlsData.templates.map((template) => {
        return (
          <ParentalControlsTemplateCard
            key={template.id}
            template={template}
            devices={parentalControlsData.devices}
          />
        );
      })}
    </View>
  );
};

export default renderParentalControlsTemplateCards;
