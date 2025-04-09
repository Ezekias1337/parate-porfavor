// Functions, Helpers, Utils, and Hooks
import getDeviceList from "@/functions/network/mac-filter/getDeviceList";
import getDeviceListFiltered from "@/functions/network/mac-filter/getFilteredDeviceList";
// Types
import { ListOfStateSetters } from "../../../screens/Devices";

const fetchDevices = async (
    { setDevices, setFilteredDevices, setLoading, setErrorMsg }: ListOfStateSetters,
    translate: (key: string) => string
): Promise<void> => {
    setLoading(true);

    try {
        const devicesToSet = await getDeviceList();
        const filteredDevicesToSet = await getDeviceListFiltered();

        if (!devicesToSet || (devicesToSet?.length === 0 && filteredDevicesToSet?.length === 0)) {
            setErrorMsg(translate("serverError"));
            setDevices([]);
            setFilteredDevices([]);
        } else {
            setErrorMsg(null);
            setDevices(devicesToSet);

            if (filteredDevicesToSet) {
                setFilteredDevices(filteredDevicesToSet);
            }
        }
    } catch (error) {
        setErrorMsg(translate("fetchError"));
    }

    setLoading(false);
};

export default fetchDevices;