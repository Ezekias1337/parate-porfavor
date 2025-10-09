// Library Imports
import { FC } from "react";
import { View } from "react-native";
// Components
import PageSelector from "./PageSelector";
import PageArrowButton from "./PageArrowButton";
// Interfaces and Types
import { Device } from "../../../shared/types/Device";
// CSS
import { paginationStyles } from "@/styles/component-specific/pagination";

interface PaginationProps {
  devices: Device[][];
  paginationIndex: number;
  setPaginationIndex: React.Dispatch<React.SetStateAction<number>>;
  paginationSize: number;
  setPaginationSize: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({
  devices,
  paginationIndex,
  setPaginationIndex,
  paginationSize,
  setPaginationSize,
}) => {
  if (devices?.length < paginationSize || !devices) {
    return <></>;
  }
  
  return (
    <View style={paginationStyles.paginationWrapper}>
      <PageArrowButton
        isActive={paginationIndex > 0}
        paginationIndex={paginationIndex}
        direction="left"
        onPress={() => {
          setPaginationIndex(paginationIndex - 1);
        }}
      />

      {devices.map((d, index) => {
        return (
          <PageSelector
            key={index}
            pageNumber={index + 1}
            isActive={index === paginationIndex}
            setPaginationIndex={setPaginationIndex}
          />
        );
      })}

      <PageArrowButton
        isActive={paginationIndex < devices.length - 1}
        paginationIndex={paginationIndex}
        direction="right"
        onPress={() => {
          setPaginationIndex(paginationIndex + 1);
        }}
      />
    </View>
  );
};

export default Pagination;
