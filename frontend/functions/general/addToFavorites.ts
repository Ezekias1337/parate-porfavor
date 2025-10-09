// Functions, Helpers, Utils, and Hooks
import loadFavorites from "./loadFavorites";
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Device } from "../../../shared/types/Device";
import { Favorite } from "../../../shared/types/Favorite";

/**
 * Adds a device to the favorites in secure storage and updates the state.
 * @param device The device to add to favorites.
 * @param setFavorites The function to set the favorites.
 * @returns {Promise<void>} A promise that resolves when the favorites are updated successfully.
*/

interface AddToFavoritesProps {
    device: Device;
    setFavorites: React.Dispatch<Favorite[]>;
}

const addToFavorites = async ({ device, setFavorites }: AddToFavoritesProps) => {
    if (!device.profileId) {
        throw new Error("Device does not have a profileId. Cannot add to favorites.");
    }

    const newFavorite: Favorite = {
        profileId: device.profileId,
        device: device,
    };
    const existingFavorites = await loadFavorites({ lastUsedProfile: null });
    const updatedFavorites = [...existingFavorites, newFavorite];

    await saveEncrypted("favorites", updatedFavorites);
    setFavorites(updatedFavorites);
}

export default addToFavorites;