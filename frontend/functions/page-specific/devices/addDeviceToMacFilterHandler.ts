// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import addDeviceToMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import { OntToken } from "../../../../shared/types/MacFilter";

interface AddDeviceArguments {
    device: Device;
    index: number;
    ontToken: OntToken;
    setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
    filteredDevices: Device[];
    setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const addDeviceToMacFilterHandler = async ({
    device,
    index,
    ontToken,
    setOntToken,
    devices,
    setDevices,
    filteredDevices,
    setFilteredDevices
}: AddDeviceArguments) => {
    try {
        const ontTokenToUse = await getOntToken(
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontToken
        );
        setOntToken(ontTokenToUse);

        await addDeviceToMacFilter(
            device.macAddr,
            device.hostName,
            device.ssid,
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontTokenToUse
        );

        const devicesCopy = [...devices];
        const filteredDevicesCopy = [...filteredDevices];

        devicesCopy.splice(index, 1)
        filteredDevicesCopy.push(device);

        setDevices(devicesCopy);
        setFilteredDevices(filteredDevicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default addDeviceToMacFilterHandler;