// Functions, Helpers, Utils, and Hooks
import loadNotes from "./loadNotes";
import { saveEncrypted } from "@/utils/secure-storage/secureStorage";
// Types
import { Device } from "../../../shared/types/Device";
import { Note } from "../../../shared/types/Note";

/**
 * Updates the note for a device in secure storage and updates the state.
 * @param device The device of which to update the note.
 * @param setNotes he function to set the notes.
 * @param newNoteContent The new note content.
 * @returns {Promise<void>} A promise that resolves when the notes are updated successfully.
*/

interface DeleteNoteProps {
    device: Device;
    setNotes: React.Dispatch<Note[]>;
}

const deleteNote = async ({ device, setNotes }: DeleteNoteProps) => {
    if (!device.profileId) {
        throw new Error("Device does not have a profileId. Cannot add note.");
    }

    const existingNotes = await loadNotes({ lastUsedProfile: null });
    const noteToDelete = existingNotes.find((note: Note) => note.profileId === device.profileId && note.macAddr === device.macAddr);

    if (!noteToDelete) {
        throw new Error("Note not found.");

    }

    const updatedNotes = existingNotes.filter((note: Note) => note !== noteToDelete);
    await saveEncrypted("notes", updatedNotes);
    setNotes(updatedNotes);
}

export default deleteNote;