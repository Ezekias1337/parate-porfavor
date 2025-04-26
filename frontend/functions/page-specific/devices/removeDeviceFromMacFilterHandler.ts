// Functions, Helpers, Utils, and Hooks
import getOntToken from "@/functions/network/mac-filter/getOntToken";
import removeDeviceFromMacFilter from "@/functions/network/mac-filter/removeDeviceFromMacFilter";
// Types
import { Device } from "../../../../shared/types/Device";
import OntToken from "../../../../shared/types/OntToken";

/**
 * Removes a device from the mac filter.
 * @param {OntToken} ontToken - The ONT token.
 * @param {React.Dispatch<React.SetStateAction<OntToken>>} setOntToken - The function to set the ONT token state.
 * @param {Device[]} devices - The list of devices.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setDevices - The function to set the devices state.
 * @param {number} index - The index of the device in the list.
 * @param {Device} device - The device to remove.
*/

interface RemoveDeviceArguments {
    ontToken: OntToken;
    setOntToken: React.Dispatch<React.SetStateAction<OntToken>>;
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
    index: number;
    device: Device;
}

const removeDeviceFromMacFilterHandler = async (
    { ontToken,
        setOntToken,
        devices,
        setDevices,
        index,
        device,
    }: RemoveDeviceArguments
) => {
    try {
        const ontTokenToUse = await getOntToken(
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontToken
        );
        setOntToken(ontTokenToUse);

        if (!device.connectionType) {
            throw new Error("Device connection type is not defined");
        }

        await removeDeviceFromMacFilter(
            [index + 1],
            device.connectionType,
            ontToken
        );
        const devicesCopy = [...devices];
        const deviceCopy = { ...device, macFiltered: false };
        devicesCopy[index] = deviceCopy;

        setDevices(devicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default removeDeviceFromMacFilterHandler;