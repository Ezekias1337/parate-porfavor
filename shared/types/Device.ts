import type { WirelessOrEthernet, SSIDName } from "./MacFilter";

export type Device = {
    domain: string;
    macAddr: string;
    hostName: string;
    ipAddress: string;
    onlineStatus: "Online" | "Offline" | "Unknown";
    connectionType: WirelessOrEthernet;
    ssid: SSIDName;
};
