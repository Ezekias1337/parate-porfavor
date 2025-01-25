// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// Functions, Helpers, Utils, and Hooks
import handleLogin from "../functions/component-specific/index/handleLogin";
import view2G from "@/functions/network/view2G";
import fetchData from "../functions/network/auth/fetchData";
// Components
import Button from "../components/Button";
import Alert from "../components/Alert";

import { useLocalization } from "../components/localization/LocalizationContext";

// CSS
import { colors } from "../styles/variables";
import homeStyles from "../styles/page-specific/index";

const Home: React.FC = () => {
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { translate, language } = useLocalization();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  const testAuth  = async () => {
    try {
      /* 
        First fetch html of parentalctrlmac.asp and parse the token from input#hwonttoken's value
      */
     
      /* 
        Then make a request to: http://192.168.1.254/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC&RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp
        include x.MACAddress as the identifier for the device
        include x.Description as the description for the device
        include x.TemplateInst as the template to add the device to (1 based index)
        include x.X_HW_Token as the token from the previous request
      */
     
        
      /* 
        After making the request to add.cgi the server responds with another html document that includes
        the next token. In order to make the next request on the same page, we need to update the token in the input#hwonttoken's value
      */
     
      // Placeholder MAC for now: 02:0f:b5:f1:7f:82
      
      
      
      try {
        const response = await fetchData("/api/modem/get-device-list", {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
            Accept: "*/*",
          },
        });
    
        if (response.ok) {
          const token = await response.text();
          console.log("Token:", token);
          return token;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Token fetch error:", error);
        return null;
      }
    } catch (error) {
      
      console.error("Login error:", error);
    }
  };

  return (
    <View style={homeStyles.container}>
      {/* <StatusBar style="light" backgroundColor={colors.primary500} /> */}
      <Text>Hello</Text>
      <Button
          text={translate("login")}
          variant="primary"
          buttonSize="medium"
          onClickHandler={async () => {
            await testAuth();
          }}
          icon="sign-in"
          leftIcon
        />
    </View>
  );
};

export default Home;
