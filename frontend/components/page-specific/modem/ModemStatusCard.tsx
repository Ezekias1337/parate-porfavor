// Library Imports
import React, { FC } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "../../localization/LocalizationContext";
// Interfaces and Types
import { ModemStatus } from "../../../../shared/types/Modem";
// CSS
import modemStatusCardStyles from "../../../styles/component-specific/modem-status-card";

const ModemStatusCard: FC<ModemStatus> = ({ cpuUsed, memUsed, systemTime }) => {
  const { translate } = useLocalization();

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

export default ModemStatusCard;
