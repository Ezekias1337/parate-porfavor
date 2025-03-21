// Types
import { Device } from "./Device";

export interface ParentalControlsDevice extends Device {
    description: string;
}

export interface ParentalControlsData {
    templates: string[];
    connectionAttempts: number;
    devices: ParentalControlsDevice[];
    timeRestrictions: Record<string, TimeRestriction[]>;
}

export type TimeRestriction = {
    startTime: number; // Time in HHMM format (e.g., 0800 for 8:00 AM)
    endTime: number;   // Time in HHMM format (e.g., 1600 for 4:00 PM)
    repeatDays: number[]; // Array of days (1 = Monday, 7 = Sunday)
};
