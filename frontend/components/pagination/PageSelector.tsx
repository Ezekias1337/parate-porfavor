// Library Imports
import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
// CSS
import { paginationStyles } from "@/styles/component-specific/pagination";

interface PageSelectorProps {
  isActive: boolean;
  additionalClassNames?: string;
  pageNumber: number;
  setPaginationIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PageSelector: FC<PageSelectorProps> = ({
  isActive,
  additionalClassNames,
  pageNumber,
  setPaginationIndex,
}) => {
  const activeClass = isActive
    ? paginationStyles.pageSelectorActive
    : paginationStyles.pageSelectorInactive;

  return (
    <TouchableOpacity
      onPress={() => setPaginationIndex(pageNumber - 1)}
      style={[
        paginationStyles.pageSelector,
        activeClass,
        additionalClassNames && (paginationStyles as any)[additionalClassNames],
      ]}
    >
      <Text
        style={
          isActive
            ? paginationStyles.pageSelectorActiveText
            : paginationStyles.pageSelectorInactiveText
        }
      >
        {pageNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default PageSelector;
