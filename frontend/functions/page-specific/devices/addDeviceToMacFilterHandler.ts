// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import addDeviceToMacFilter from "@/functions/network/mac-filter/addDeviceToMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Adds a device to the mac filter.
 * @param {Device} device - The device to add.
 * @param {number} index - The index of the device in the list.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {Device[]} devices - The list of devices.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @returns {Promise<void>} A promise that resolves when the device is added to the mac filter.
*/

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
        
        if(!device.hostName) {
            device.hostName = device.macAddr;
        }
        
        if(!device.ssid) {
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