// Library Imports
import React, { FC, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "../../localization/LocalizationContext";

// Interfaces and Types
import FontAwesomeIconNames from "../../../types/FontAwesome";
import { ModemStatus } from "../../../../shared/types/Modem";

// Components

// CSS
import { colors, fontSizes, borderRadius } from "../../../styles/variables";

const ModemStatusCard: FC<ModemStatus> = ({ cpuUsed, memUsed, systemTime }) => {
  const { translate, language } = useLocalization();

  return (
    <View style={modemStatusCardStyles.card}>
      <View style={modemStatusCardStyles.row}>
        <FontAwesome
          name="server"
          size={35}
          style={modemStatusCardStyles.icon}
        />
        <Text style={modemStatusCardStyles.text}>{`${translate(
          "cpuUsed"
        )}: ${cpuUsed}`}</Text>
      </View>

      <View style={modemStatusCardStyles.row}>
        <FontAwesome
          name="database"
          size={35}
          style={modemStatusCardStyles.icon}
        />
        <Text style={modemStatusCardStyles.text}>{`${translate(
          "ramUsed"
        )}: ${memUsed}`}</Text>
      </View>

      <View style={modemStatusCardStyles.row}>
        <FontAwesome
          name="clock-o"
          size={35}
          style={modemStatusCardStyles.icon}
        />
        <Text style={modemStatusCardStyles.text}>{`${translate(
          "systemTime"
        )}: ${systemTime}`}</Text>
      </View>
    </View>
  );
};

const modemStatusCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.borderRadius,
    padding: 20,
    margin: 10,
    backgroundColor: colors.neutral700,
    borderColor: colors.neutral100,
    borderWidth: 1,
    shadowColor: colors.neutral100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: "85%",
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.neutral100,
  },
  icon: {
    marginRight: 10,
    color: colors.neutral100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ModemStatusCard;
