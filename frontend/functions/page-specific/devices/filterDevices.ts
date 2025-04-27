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
    setFilteredDevices: React.Dispatch<React.SetStateAction<Device[]>>,
    filter: string,
}

// The filter function
const filterDevice = ({ devices, setFilteredDevices, filter }: filterDeviceArgs): void => {
    if (filter === "") {
        setFilteredDevices(devices);
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

    setFilteredDevices(filtered);
};

export default filterDevice;
