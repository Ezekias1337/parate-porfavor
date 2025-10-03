// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Favorite } from "../../../shared/types/Favorite";

/**
 * Loads the favorites from secure storage and sets them to the state.
 * @param setFavorites The function to set the favorites.
 * @returns {Promise<void>} A promise that resolves when the favorites are loaded successfully.
*/

interface LoadFavoritesProps {
    setFavorites: React.Dispatch<Favorite[]>;
    lastUsedProfile: string | null;
}

const loadFavorites = async ({ setFavorites, lastUsedProfile }: LoadFavoritesProps) => {
    const stored = await loadEncrypted("favorites");
    if (stored) {
        const filteredFavorites = stored.filter((favorite: Favorite) => favorite.profileId === lastUsedProfile);
        setFavorites(filteredFavorites);
    }
}

export default loadFavorites;

