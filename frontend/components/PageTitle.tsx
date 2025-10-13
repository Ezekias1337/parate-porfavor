// Library Imports
import { FC } from "react";
import { Text } from "react-native";
// CSS
import utilityStyles from "@/styles/utilities";

interface PageTitleProps {
  text: string;
}

const PageTitle: FC<PageTitleProps> = ({ text }) => {
  return <Text style={utilityStyles.pageTitle}>{text}</Text>;
};

export default PageTitle;
