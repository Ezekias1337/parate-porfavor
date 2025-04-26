// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
// Types
import OntToken from "../../../../shared/types/OntToken";

/**
 * Fetches the ONT token required for parental controls operations and sets it in the state.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @returns {Promise<void>} A promise that resolves when the ONT token is fetched.
*/

interface FetchOntTokenProps {
    ontToken: OntToken;
    setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;

}
const handleFetchOntToken = async ({ ontToken, setOntToken }: FetchOntTokenProps) => {
    const ontTokenToUse = await getOntToken(
        ontToken
    );
    setOntToken(ontTokenToUse);
}

export default handleFetchOntToken;