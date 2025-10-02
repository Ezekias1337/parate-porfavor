// Functions, Helpers, Utils, and Hooks
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Device } from "../../../shared/types/Device";
import { Favorite } from "../../../shared/types/Favorite";

/**
 * Adds a device to the favorites in secure storage and updates the state.
 * @param device The device to add to favorites.
 * @param favorites The current list of favorites.
 * @param setFavorites The function to set the favorites.
 * @returns {Promise<void>} A promise that resolves when the favorites are updated successfully.
*/

interface RemoveFromFavoritesProps {
    device: Device;
    favorites: Favorite[];
    setFavorites: React.Dispatch<Favorite[]>;
}

const removeFromFavorites = async ({ device, favorites, setFavorites }: RemoveFromFavoritesProps) => {
    const updatedFavorites = favorites.filter(
        (favorite) => favorite.device.macAddr !== device.macAddr /* && favorite.profileId !== device.profileId */
    );

    await saveEncrypted("favorites", updatedFavorites);
    setFavorites(updatedFavorites);
}

export default removeFromFavorites;