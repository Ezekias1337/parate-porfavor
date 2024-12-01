// app/index.tsx
import React from "react";
import { LocalizationProvider } from "../components/localization/LocalizationContext";
import Home from "./Home"; 

const App = () => {
  return (
    <LocalizationProvider>
      <Home />
    </LocalizationProvider>
  );
};

export default App;
