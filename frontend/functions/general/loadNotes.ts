// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Note } from "../../../shared/types/Note";

/**
 * Loads the notes from secure storage and sets them to the state.
 * @param setNotes The function to set the notes.
 * @returns {Promise<void>} A promise that resolves when the notes are loaded successfully.
*/

interface LoadNotesProps {
    setNotes?: React.Dispatch<Note[]>;
    lastUsedProfile: string | null;
}

const loadNotes = async ({ setNotes, lastUsedProfile }: LoadNotesProps): Promise<Note[]> => {
    const stored = await loadEncrypted("notes");

    if (stored && lastUsedProfile) {
        const filteredNotes = stored.filter((note: Note) => note.profileId === lastUsedProfile);
        setNotes?.(filteredNotes);
        return filteredNotes;
    } else if (lastUsedProfile === null) {
        setNotes?.(stored);
        return stored;
    } else {
        setNotes?.([]);
        return [];
    }
}

export default loadNotes;

