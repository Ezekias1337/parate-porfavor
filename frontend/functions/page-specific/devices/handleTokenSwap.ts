// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Handles switching the token on the Devices page depending on if it is a MAC operation or a Parental Controls operation.
 * @param {boolean} modalVisible - Whether the modal is visible.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {React.Dispatch<React.SetStateAction<Device | null>>} setModalDevice - The function to set the modal device state.
 * @returns {Promise<void>} A promise that resolves when the token is swapped.
*/

interface TokenSwapArguments {
   modalVisible: boolean;
   setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
   setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>
}

const handleTokenSwap = async ({
    modalVisible,
    setOntToken,
    setModalDevice
}: TokenSwapArguments) => {
    try {
        if (modalVisible) {
            const parentalControlsToken = await getOntToken(null);
            setOntToken(parentalControlsToken);
        } else {
            setModalDevice(null);
            setOntToken(null);
        }
    } catch (error) {
        console.error(error);
    }
};

export default handleTokenSwap;