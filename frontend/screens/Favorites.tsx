// Library Imports
import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
// Functions, Helpers, Utils, and Hooks
import renderFavoriteCards from "@/functions/page-specific/favorites/renderFavoriteCards";
import useFavoritesProfilesAndNotes from "@/hooks/useFavoritesProfilesAndNotes";
// Components
import PageTitle from "@/components/PageTitle";
import Alert from "../components/Alert";
// Types
import { useLocalization } from "../components/localization/LocalizationContext";
// CSS
import { colors } from "../styles/colors";
import utilityStyles from "../styles/utilities";
import modemStyles from "../styles/page-specific/modem";

const Favorites: React.FC = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const { translate } = useLocalization();

  const [loading, setLoading] = useState(false);
  const { lastUsedProfile, favorites, setFavorites, notes, setNotes } =
    useFavoritesProfilesAndNotes();

  return loading ? (
    <View style={[modemStyles.loader]}>
      <ActivityIndicator color={colors.primary500} size="large" />
    </View>
  ) : (
    <View style={[utilityStyles.screenContentsContainer]}>
      <View style={utilityStyles.stickyTop}>
        <PageTitle text={translate("favorites")} />
        {favorites?.length > 0 && lastUsedProfile !== null && (
          <Alert
            bodyText={translate("favoritesExplanation")}
            variant="info"
            icon="info-circle"
          />
        )}
      </View>

      <ScrollView
        contentContainerStyle={[
          utilityStyles.scrollableContent,
          utilityStyles.paddingTop20,
          {
            paddingLeft: screenWidth < 500 ? 20 : screenWidth * 0.1,
            paddingRight: screenWidth < 500 ? 20 : screenWidth * 0.1,
          },
        ]}
        automaticallyAdjustKeyboardInsets={true}
      >
        {renderFavoriteCards(
          lastUsedProfile,
          favorites,
          notes,
          { setLoading, setFavorites, setNotes },
          translate
        )}
      </ScrollView>
    </View>
  );
};

export default Favorites;
