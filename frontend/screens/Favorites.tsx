// Library Imports
import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import renderFavoriteCards from "@/functions/page-specific/favorites/renderFavoriteCards";;
import useFavoritesAndLastUsedProfile from "@/hooks/useFavoritesAndLastUsedProfile";
// Components
import Alert from "../components/Alert";
// Types
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/variables";
import modemStyles from "../styles/page-specific/modem";

const Favorites: React.FC = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const { translate } = useLocalization();

  const [loading, setLoading] = useState(false);
  const { lastUsedProfile, favorites, setFavorites } =
    useFavoritesAndLastUsedProfile();

  return loading ? (
    <View style={[modemStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[
        modemStyles.container,
        {
          paddingLeft: screenWidth < 500 ? 10 : screenWidth * 0.1,
          paddingRight: screenWidth < 500 ? 10 : screenWidth * 0.1,
        },
      ]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <Text style={modemStyles.title}>{translate("modem")}</Text>
      {favorites.length > 0 && lastUsedProfile !== null && (
        <Alert
          bodyText={translate("favoritesExplanation")}
          variant="info"
          icon="info-circle"
        />
      )}
      {renderFavoriteCards(
        lastUsedProfile,
        favorites,
        { setLoading, setFavorites },
        translate
      )}
    </ScrollView>
  );
};

export default Favorites;
