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

interface AddToFavoritesProps {
    device: Device;
    favorites: Favorite[];
    setFavorites: React.Dispatch<Favorite[]>;
}

const addToFavorites = async ({ device, favorites, setFavorites }: AddToFavoritesProps) => {
    if (!device.profileId) {
        throw new Error("Device does not have a profileId. Cannot add to favorites.");
    }

    const newFavorite: Favorite = {
        profileId: device.profileId,
        device: device,
    };
    const updatedFavorites = [...favorites, newFavorite];

    await saveEncrypted("favorites", updatedFavorites);
    setFavorites(updatedFavorites);
}

export default addToFavorites;