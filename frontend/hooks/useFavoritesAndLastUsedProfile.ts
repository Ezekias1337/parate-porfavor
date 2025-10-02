// Library Imports
import { useState, useEffect } from "react";
// Functions, Helpers, and Utils
import getLastUsedProfile from "../functions/general/getLastUsedProfile";
import loadFavorites from "../functions/general/loadFavorites"; // adjust path as needed
// Types
import { Favorite } from "../../shared/types/Favorite"; // adjust path as needed

interface UseFavoritesAndLastUsedProfileReturn {
  lastUsedProfile: string | null;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
  setLastUsedProfile: React.Dispatch<React.SetStateAction<string | null>>;
}

const useFavoritesAndLastUsedProfile = (): UseFavoritesAndLastUsedProfileReturn => {
  const [lastUsedProfile, setLastUsedProfile] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const lastProfile = await getLastUsedProfile({ setLastUsedProfile });
      await loadFavorites({ setFavorites, lastUsedProfile: lastProfile });
    };

    fetchData();
  }, []);

  return { lastUsedProfile, favorites, setFavorites, setLastUsedProfile };
};

export default useFavoritesAndLastUsedProfile;
