// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import getDeviceListFiltered from "@/functions/network/mac-filter/getFilteredDeviceList";
import getParentalControlsData from "@/functions/network/parental-controls/getParentalControlsData";
import extractParentalControlsDevicesFromTemplates from "@/functions/page-specific/devices/extractParentalControlsDevicesFromTemplates";
// Types
import { ListOfStateSetters } from "../../../screens/Devices";
import { Device } from "../../../../shared/types/Device";

/**
 * Fetches the devices and parental controls data and subsequentially sets the state.
 * @param {ListOfStateSetters} setDevices - The function to set the devices state.
 * @param {ListOfStateSetters} setParentalControls - The function to set the parental controls state.
 * @param {ListOfStateSetters} setLoading - The function to set the loading state.
 * @param {ListOfStateSetters} setErrorMsg - The function to set the error message state.
 * @param {Function} translate - The function to translate the text.
 * @returns {Promise<void>} A promise that resolves when the devices and parental controls data is fetched and set.
*/

const fetchDevicesAndParentalControls = async (
    { setDevices,  setParentalControls, setLoading, setErrorMsg }: ListOfStateSetters,
    translate: (key: string) => string
): Promise<void> => {
    setLoading(true);

    try {
        const devicesToSet = await getDeviceList();
        const filteredDevicesToSet = await getDeviceListFiltered();
        const parentalControlsToSet = await getParentalControlsData();
        const parentalControlsDevices = extractParentalControlsDevicesFromTemplates(
            parentalControlsToSet);

        setParentalControls(parentalControlsToSet);


        for (const device of filteredDevicesToSet) {
            let dupeIndex = parentalControlsDevices.findIndex(
                (dupe) => dupe.macAddr === device.macAddr
            );
            let dupe = parentalControlsDevices[dupeIndex];

            if (dupe) {
                device.description = dupe.description;
                device.templateId = dupe.templateId;
                device.parentalControlRestrictionApplied = true;
                parentalControlsDevices.splice(dupeIndex, 1);
            }
        }
        
        for (const device of parentalControlsDevices) {
            let dupeIndex = devicesToSet.findIndex(
                (dupe) => dupe.macAddr === device.macAddr
            );
            let dupe = devicesToSet[dupeIndex];

            if (dupe) {
                device.domain = dupe.domain;
                device.ipAddress = dupe.ipAddress;
                device.connectionType = dupe.connectionType;
                device.ssid = dupe.ssid;
                devicesToSet.splice(dupeIndex, 1);
            }
        }
        
        const mergedDeviceArray: Device[] = [
            ...parentalControlsDevices,
            ...filteredDevicesToSet,
            ...devicesToSet
        ];

        if (mergedDeviceArray.length === 0) {
            setErrorMsg(translate("serverError"));
            setDevices([]);
        } else {
            setErrorMsg(null);
            setDevices(mergedDeviceArray);
        }
    } catch (error) {
        setErrorMsg(translate("fetchError"));
    }

    setLoading(false);
};

export default fetchDevicesAndParentalControls;