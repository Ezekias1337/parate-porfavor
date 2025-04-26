// Types
import { UrlSettings } from "@/screens/Settings";

/**
 * Handles the input change for the settings page.
 * @param field The field to update.
 * @param urlSettings The current URL settings.
 * @param setUrlSettings The function to update the URL settings.
 * @returns {string} The updated URL settings.
*/

const handleInputChange =
    (field: "serverUrl" | "modemUrl", urlSettings: UrlSettings, setUrlSettings: React.Dispatch<React.SetStateAction<UrlSettings>>) => (text: string) => {
        const newUrlSettings = {
            ...urlSettings,
            [field]: text,
        };

        setUrlSettings(newUrlSettings);
    };

export default handleInputChange;