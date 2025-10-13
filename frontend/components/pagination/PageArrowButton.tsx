// Library Imports
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// CSS
import { paginationStyles } from "@/styles/component-specific/pagination";

interface PageArrowButtonProps {
  isActive: boolean;
  additionalClassNames?: string;
  paginationIndex: number;
  direction: "left" | "right";
  onPress: React.Dispatch<React.SetStateAction<number>>;
}

const PageArrowButton: FC<PageArrowButtonProps> = ({
  isActive,
  additionalClassNames,
  paginationIndex,
  direction,
  onPress,
}) => {
  const activeClass = isActive
    ? paginationStyles.pageSelectorActive
    : paginationStyles.pageSelectorInactive;

  return (
    <TouchableOpacity
      style={[
        paginationStyles.pageSelectorArrow,
        activeClass,
        additionalClassNames && (paginationStyles as any)[additionalClassNames],
      ]}
      onPress={() => {
        if (isActive) {
          onPress(paginationIndex);
        }
      }}
    >
      <FontAwesome
        name={direction === "left" ? "arrow-left" : "arrow-right"}
        size={20}
        color={
          isActive
            ? paginationStyles.pageSelectorActiveText.color
            : paginationStyles.pageSelectorInactiveText.color
        }
      />
    </TouchableOpacity>
  );
};

export default PageArrowButton;
