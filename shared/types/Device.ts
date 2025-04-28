import type { WirelessOrEthernet, SSIDName } from "./MacFilter";

export type Device = {
    domain?: string;
    macAddr: string;
    hostName?: string;
    ipAddress?: string;
    onlineStatus?: "Online" | "Offline" | "Unknown";
    connectionType?: WirelessOrEthernet;
    ssid?: SSIDName;  
    description?: string;
    templateId?: number;
    macFiltered?: boolean;
    macIndex?: number;
    parentalControlRestrictionApplied?: boolean;
};
