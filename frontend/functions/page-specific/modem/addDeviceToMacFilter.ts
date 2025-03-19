// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import addDevicetoMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import { OntToken } from "../../../../shared/types/MacFilter";
const addDeviceToMacFilter = async (device: Device, ontToken: OntToken, setOntToken: React.Dispatch<React.SetStateAction<OntToken>>) => {
    const ontTokenToUse = await getOntToken(
        device.connectionType === "WIFI" ? "WIFI" : "ETH",
        ontToken
    );
    setOntToken(ontTokenToUse);
    
    await addDevicetoMacFilter(
        device.macAddr,
        device.hostName,
        device.ssid,
        device.connectionType === "WIFI" ? "WIFI" : "ETH",
        ontTokenToUse
    );
};

export default addDeviceToMacFilter;