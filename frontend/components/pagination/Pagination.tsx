// Library Imports
import { View } from "react-native";
// Functions, Helpers, and Utils

// Components
import PageSelector from "./PageSelector";
// Constants

// Interfaces and Types

// CSS
import { paginationStyles } from "@/styles/component-specific/pagination";

const Pagination = () => {
  return (
    <View style={paginationStyles.paginationWrapper}>
      <PageSelector pageNumber={1} isActive={true} additionalClassNames="" />
      <PageSelector pageNumber={2} isActive={false} additionalClassNames="ml-10" />
      <PageSelector pageNumber={3} isActive={false} additionalClassNames="ml-10" />
      <PageSelector pageNumber={4} isActive={false} additionalClassNames="ml-10" />
    </View>
  );
};

export default Pagination;
