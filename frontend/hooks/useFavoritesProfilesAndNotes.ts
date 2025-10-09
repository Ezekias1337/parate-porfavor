// Library Imports
import { useState, useEffect } from "react";
// Functions, Helpers, and Utils
import getLastUsedProfile from "../functions/general/getLastUsedProfile";
import loadFavorites from "../functions/general/loadFavorites";
import loadNotes from "../functions/general/loadNotes";
// Types
import { Favorite } from "../../shared/types/Favorite";
import { Note } from "../../shared/types/Note";

interface useFavoritesProfilesAndNotes {
  lastUsedProfile: string | null;
  setLastUsedProfile: React.Dispatch<React.SetStateAction<string | null>>;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const useFavoritesProfilesAndNotes = (): useFavoritesProfilesAndNotes => {
  const [lastUsedProfile, setLastUsedProfile] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const lastProfile = await getLastUsedProfile({ setLastUsedProfile });
      await loadFavorites({ setFavorites, lastUsedProfile: lastProfile });
      await loadNotes({ setNotes, lastUsedProfile: lastProfile });
    };

    fetchData();
  }, []);

  return { lastUsedProfile, favorites, setFavorites, setLastUsedProfile, notes, setNotes };
};

export default useFavoritesProfilesAndNotes;
