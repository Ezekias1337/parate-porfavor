export type WirelessOrEthernet = "ethernet" | "wifi"
export type SSIDName = string | null;
export type OntToken = string | null;
export type BlacklistOrWhitelist = "blacklist" | "whitelist";
export type MacFilterEnabledOrDisabled = "enabled" | "disabled";

export interface MacDevice {
    deviceToAdd: {
        deviceMac: string,
        deviceName: string,
    },
    wirelessOrEthernet: WirelessOrEthernet,
    ssidName: string | null,
    ontToken: OntToken,
}

export interface MacFilter {
    blacklistOrWhitelist: BlacklistOrWhitelist,
    macFilterEnabledOrDisabled: MacFilterEnabledOrDisabled,
    ontToken: OntToken,
}