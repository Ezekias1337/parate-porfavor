// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
// Types
import OntToken from "../../../../shared/types/OntToken";

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