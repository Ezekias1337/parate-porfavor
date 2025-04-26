// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
import deleteParentalControlsTemplate from "@/functions/network/parental-controls/deleteParentalControlsTemplate";
import handleFetchParentalControls from "./handleFetchParentalControls";
// Types
import { ParentalControlsData } from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Handles the deletion of a Parental Controls template.
 * @param {number} templateId - The ID of the template to delete.
 * @param {Function} translate - The function to translate the text.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setErrorMsg - The function to set the error message state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ParentalControlsData>>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setDeleteLoading - The function to set the delete loading state.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
*/

interface handleDeleteParentalControlsProps {
    templateId: number;
    translate: (key: string) => string;
    ontToken: OntToken;
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setParentalControls: React.Dispatch<React.SetStateAction<ParentalControlsData>>;
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleDeleteParentalControls = async (
    { templateId,
        translate,
        ontToken,
        setErrorMsg,
        setLoading,
        setParentalControls,
        setDeleteLoading }: handleDeleteParentalControlsProps
) => {
    try {
        setErrorMsg(null);
        setDeleteLoading(true);
        const ontTokenToUse = await getOntToken(ontToken);
        await deleteParentalControlsTemplate(templateId, ontTokenToUse);
        setDeleteLoading(false);

        await handleFetchParentalControls({
            setLoading,
            setParentalControls,
            setErrorMsg,
            translate,
        });
    }
    catch (error) {
        setErrorMsg(translate("serverError"));
        setDeleteLoading(false);
    }
}


export default handleDeleteParentalControls