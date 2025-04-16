// Functions, Helpers, Utils, and Hooks
import { loadEncrypted } from "@/utils/secureStorage";
// Types
import { UrlSettings } from "@/screens/Settings";
interface LoadCredsProps {
    setUrlSettings: React.Dispatch<UrlSettings>;
}

const loadCreds = async ({ setUrlSettings }: LoadCredsProps) => {
    const stored = await loadEncrypted("urlSettings");
    if (stored) {
        setUrlSettings(stored);
    }
}

export default loadCreds;