// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import addDeviceToMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

interface AddDeviceArguments {
    device: Device;
    index: number;
    ontToken: OntToken;
    setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const addDeviceToMacFilterHandler = async ({
    device,
    index,
    ontToken,
    setOntToken,
    devices,
    setDevices,
}: AddDeviceArguments) => {
    try {
        const ontTokenToUse = await getOntToken(
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontToken
        );
        setOntToken(ontTokenToUse);
        console.log("device: ", device);
        
        if(!device.hostName || !device.ssid) {
            throw new Error("Device object is not complete");
        }

        await addDeviceToMacFilter(
            device.macAddr,
            device.hostName,
            device.ssid,
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontTokenToUse
        );

        const devicesCopy = [...devices];
        const deviceCopy = { ...device, macFiltered: true };
        devicesCopy[index] = deviceCopy;

        setDevices(devicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default addDeviceToMacFilterHandler;