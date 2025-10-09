// Functions, Helpers, Utils, and Hooks
import chunkArray from "@/utils/arrays/chunkArray";
// Types
import { Device } from "../../../../shared/types/Device";

/**
 * Handles the input change for the login form
 * @param {Device[]} devices - The list of devices.
 * @param {React.Dispatch<React.SetStateAction<Device[]>>} setFilteredDevices - The function to set the filtered devices state.
 * @param {string} filter - The filter value.
*/

// Arguments interface
interface filterDeviceArgs {
    devices: Device[],
    setFilteredDevices: React.Dispatch<React.SetStateAction<Device[][]>>,
    filter: string,
    paginationSize: number,
    paginationIndex: number
    setPaginationIndex: React.Dispatch<React.SetStateAction<number>>
}

const filterDevice = ({ devices, setFilteredDevices, filter, paginationSize, paginationIndex, setPaginationIndex }: filterDeviceArgs): void => {
    if (filter === "") {
        const chunkedDevices = chunkArray(devices, paginationSize);
        setPaginationIndex(0);
        setFilteredDevices(chunkedDevices);
        return;
    }

    const lowerCaseFilter = filter.toLowerCase();
    const filtered = devices.filter((device) => {
        const { macAddr, hostName, ipAddress, ssid } = device;
        return (
            (macAddr && macAddr.toLowerCase().includes(lowerCaseFilter)) ||
            (hostName && hostName.toLowerCase().includes(lowerCaseFilter)) ||
            (ipAddress && ipAddress.toLowerCase().includes(lowerCaseFilter)) ||
            (ssid && ssid.toLowerCase().includes(lowerCaseFilter))
        );
    });

    const chunkedDevices = chunkArray(filtered, paginationSize);
    setPaginationIndex(0);
    setFilteredDevices(chunkedDevices);
};

export default filterDevice;
