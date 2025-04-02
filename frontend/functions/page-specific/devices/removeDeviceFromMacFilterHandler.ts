// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import removeDeviceFromMacFilter from "@/functions/network/mac-filter/removeDeviceFromMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import { OntToken } from "../../../../shared/types/MacFilter";

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

        filteredDevicesCopy.splice(index, 1);
        devicesCopy.push(filteredDevice);

        setDevices(devicesCopy);
        setFilteredDevices(filteredDevicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default removeDeviceFromMacFilterHandler;