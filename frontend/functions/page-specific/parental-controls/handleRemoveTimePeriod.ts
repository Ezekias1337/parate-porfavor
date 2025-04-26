// Functions, Helpers, Utils, and Hooks
import removeTimePeriodFromParentalControlsTemplate from "@/functions/network/parental-controls/removeTimePeriodFromParentalControlsTemplate";
import handleFetchParentalControls from "@/functions/page-specific/parental-controls/handleFetchParentalControls";
// Types
import { Template, Restriction, ParentalControlsData } from "../../../../shared/types/ParentalControls";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Handles the removal of a time period from a Parental Controls template.
 * @param {Template} template - The template to remove the time period from.
 * @param {Restriction} restriction - The time period to remove.
 * @param {React.Dispatch<React.SetStateAction<Template | null>>} setSelectedTemplate - The function to set the selected template.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ParentalControlsData>>} setParentalControls - The function to set the parental controls state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setErrorMsg - The function to set the error message state.
 * @param {Function} translate - The function to translate the text.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setDeleteLoading - The function to set the delete loading state.
 * @param {OntToken} ontToken - The ONT token.
 * @returns {Promise<void>} A promise that resolves when the time period is removed from the template.
*/

interface handleRemoveTimePeriodProps {
    template: Template
    restriction: Restriction
    setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setParentalControls: React.Dispatch<React.SetStateAction<ParentalControlsData>>
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>
    translate: (key: string) => string
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
    ontToken: OntToken
}

const handleRemoveTimePeriod = async ({ template, restriction, setSelectedTemplate, setLoading, setParentalControls, setErrorMsg, translate, setDeleteLoading, ontToken }: handleRemoveTimePeriodProps) => {
    try {
        setDeleteLoading(true);
        await removeTimePeriodFromParentalControlsTemplate({
            templateNumber: template.id,
            durationNumber: restriction.id,
            ontToken: ontToken,
        });
        setDeleteLoading(false);
        const newParentalControlsData = await handleFetchParentalControls({
            setLoading,
            setParentalControls,
            setErrorMsg,
            translate,
        });
        const newTemplate = newParentalControlsData.templates.find(
            (t) => t.id === template.id
        )
        if (newTemplate) {
            setSelectedTemplate(newTemplate);
        }
    } catch (error) {
        setErrorMsg(translate("serverError"));
        setDeleteLoading(false);
    }
}

export default handleRemoveTimePeriod