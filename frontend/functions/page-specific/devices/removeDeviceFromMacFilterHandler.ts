// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import removeDeviceFromMacFilter from "@/functions/network/mac-filter/removeDeviceFromMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

interface RemoveDeviceArguments {
    ontToken: OntToken;
    setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
    filteredDevices: Device[];
    setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
    index: number;
    filteredDevice: Device;
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const removeDeviceFromMacFilterHandler = async (
    { ontToken,
        setOntToken,
        filteredDevices,
        setFilteredDevices,
        index,
        filteredDevice,
        devices,
        setDevices }: RemoveDeviceArguments
) => {
    try {
        const ontTokenToUse = await getOntToken(
            filteredDevice.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontToken
        );
        setOntToken(ontTokenToUse);

        await removeDeviceFromMacFilter(
            [index + 1],
            filteredDevice.connectionType,
            ontToken
        );
        const filteredDevicesCopy = [...filteredDevices];
        const devicesCopy = [...devices];
        const filteredDeviceCopy = { ...filteredDevice, domain: "Temporary Until Next Re-render" };
        /* 
            ? Since renderDeviceCardButton1 checks the domain name to determine
            ? which button to show, we need to update the domain to cause a re-render
            ? and show the correct button
        */
        
        
        filteredDevicesCopy.splice(index, 1);
        devicesCopy.splice(index, 0, filteredDeviceCopy)

        setDevices(devicesCopy);
        setFilteredDevices(filteredDevicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default removeDeviceFromMacFilterHandler;