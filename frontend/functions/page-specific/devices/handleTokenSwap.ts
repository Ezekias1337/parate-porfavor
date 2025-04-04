// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/parental-controls/getOntToken";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

interface AddDeviceArguments {
   modalVisible: boolean;
   setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
   setModalDevice: React.Dispatch<React.SetStateAction<Device | null>>
}

const handleTokenSwap = async ({
    modalVisible,
    setOntToken,
    setModalDevice
}: AddDeviceArguments) => {
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