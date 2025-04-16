import { UrlSettings } from "@/screens/Settings";

const handleInputChange =
    (field: "serverUrl" | "modemUrl", urlSettings: UrlSettings, setUrlSettings: React.Dispatch<React.SetStateAction<UrlSettings>>) => (text: string) => {
        const newUrlSettings = {
            ...urlSettings,
            [field]: text,
        };

        setUrlSettings(newUrlSettings);
    };

export default handleInputChange;