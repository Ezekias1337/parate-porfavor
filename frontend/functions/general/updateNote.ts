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

interface UpdateNoteProps {
    device: Device;
    setNotes: React.Dispatch<Note[]>;
    newNoteContent: string;
}

const updateNote = async ({ device, setNotes, newNoteContent }: UpdateNoteProps) => {
    if (!device.profileId) {
        throw new Error("Device does not have a profileId. Cannot add note.");
    }

    const newNote: Note = {
        profileId: device.profileId,
        macAddr: device.macAddr,
        note: newNoteContent
    };
    const existingNotes = await loadNotes({ lastUsedProfile: null });

    if (!existingNotes) {
        const newNoteArray = [];
        newNoteArray.push(newNote);
        await saveEncrypted("notes", newNoteArray);
        setNotes(newNoteArray);
        return;
    }

    const noteWithSameMacAddr = existingNotes.findIndex((note: Note) => note.macAddr === device.macAddr);
    if (noteWithSameMacAddr !== -1) {
        existingNotes.splice(noteWithSameMacAddr, 1);
    }

    const updatedNotes = [...existingNotes, newNote];
    await saveEncrypted("notes", updatedNotes);
    setNotes(updatedNotes);
}

export default updateNote;