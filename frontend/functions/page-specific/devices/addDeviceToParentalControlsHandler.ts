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
    filteredDevices: Device[];
    setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const addDeviceToParentalControlsHandler = async ({
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

        if (!device.hostName || !device.ssid) {
            throw new Error("Device information is not complete");
        }
        
        await addDeviceToMacFilter(
            device.macAddr,
            device.hostName,
            device.ssid,
            device.connectionType === "WIFI" ? "WIFI" : "ETH",
            ontTokenToUse
        );

        const devicesCopy = [...devices];
        const filteredDevicesCopy = [...filteredDevices];
        const deviceCopy = { ...device, domain: "" };
        /* 
            ? Since renderDeviceCardButton1 checks the domain name to determine
            ? which button to show, we need to update the domain to cause a re-render
            ? and show the correct button
        */

        devicesCopy.splice(index, 1)
        filteredDevicesCopy.push(deviceCopy);

        setDevices(devicesCopy);
        setFilteredDevices(filteredDevicesCopy);
    } catch (error) {
        console.error(error);
    }
};

export default addDeviceToParentalControlsHandler;