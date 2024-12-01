// Library Imports
import React from "react";
// Localization
import { LocalizationProvider } from "../components/localization/LocalizationContext";
// Consistent Layout
import BottomTabs from "../navigation/BottomTabs";

const App = () => {
  return (
    <LocalizationProvider>
      <BottomTabs /> 
    </LocalizationProvider>
  );
};

export default App;
