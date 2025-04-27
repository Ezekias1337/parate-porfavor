// Library Imports
import { TextInput, View } from "react-native";
// Functions, Helpers, Utils, and Hooks
import handleInputChange from "../../../functions/page-specific/devices/handleInputChange";
// CSS
import { colors } from "../../../styles/variables";
import { inputFieldStyles } from "../../../styles/component-specific/input-fields";
import utilityStyles from "@/styles/utilities";

interface FilterInputProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  translate: (key: string) => string;
}

const FilterInput = ({ filter, setFilter, translate }: FilterInputProps) => {
  return (
    <View style={[utilityStyles.fullWidth, utilityStyles.padding20]}>
      <TextInput
        placeholder={translate("search")}
        value={filter}
        onChangeText={handleInputChange(setFilter)}
        style={inputFieldStyles.textInput}
        placeholderTextColor={colors.primary300}
        id="filter-input"
      />
    </View>
  );
};

export default FilterInput;
