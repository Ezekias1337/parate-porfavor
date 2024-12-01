import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { LocalizationProvider } from "./components/localization/LocalizationContext";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("IN APP") 
  }, [])
  
  return (
    <LocalizationProvider>
      <RootNavigator />
    </LocalizationProvider>
  );
}
