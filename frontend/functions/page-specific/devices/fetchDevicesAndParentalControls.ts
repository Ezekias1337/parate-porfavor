// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import getDeviceListFiltered from "@/functions/network/mac-filter/getFilteredDeviceList";
import getParentalControlsData from "@/functions/network/parental-controls/getParentalControlsData";
import extractParentalControlsDevicesFromTemplates from "@/functions/page-specific/devices/extractParentalControlsDevicesFromTemplates";
// Types
import { ListOfStateSetters } from "../../../screens/Devices";
import { Device } from "../../../../shared/types/Device";

const fetchDevicesAndParentalControls = async (
    { setDevices, setParentalControls, setLoading, setErrorMsg }: ListOfStateSetters,
    translate: (key: string) => string
): Promise<void> => {
    setLoading(true);

    try {
        const devicesToSet = await getDeviceList();
        const filteredDevicesToSet = await getDeviceListFiltered();
        const parentalControlsToSet = await getParentalControlsData();
        
        
        if(parentalControlsToSet.templates.length >= 0) {
            setParentalControls(parentalControlsToSet.templates);
        }

        const parentalControlsDevices = extractParentalControlsDevicesFromTemplates(
            parentalControlsToSet);
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
            setDevices(devicesToSet);
        }
    } catch (error) {
        setErrorMsg(translate("fetchError"));
    }

    setLoading(false);
};

export default fetchDevicesAndParentalControls;