import type { WirelessOrEthernet, SSIDName } from "./MacFilter";

export type Device = {
    domain: string;
    macAddr: string;
    hostName: string;
    ipAddress: string;
    onlineStatus: string;
    connectionType: WirelessOrEthernet;
    ssid: SSIDName;
};
