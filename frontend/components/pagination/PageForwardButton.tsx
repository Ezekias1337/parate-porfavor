// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
// CSS
import { paginationStyles } from "@/styles/component-specific/pagination";

interface PageSelectorProps {
  isActive: boolean;
  additionalClassNames?: string;
  pageNumber: number;
}

const PageSelector: FC<PageSelectorProps> = ({
  isActive,
  additionalClassNames,
  pageNumber,
}) => {
  const activeClass = isActive
    ? paginationStyles.pageSelectorActive
    : paginationStyles.pageSelectorInactive;

  return (
    <View
      style={[
        paginationStyles.pageSelector,
        activeClass,
        additionalClassNames && (paginationStyles as any)[additionalClassNames],
      ]}
    >
      <Text style={isActive ? paginationStyles.pageSelectorActiveText : ""}>
        {pageNumber}
      </Text>
    </View>
  );
};

export default PageSelector;
