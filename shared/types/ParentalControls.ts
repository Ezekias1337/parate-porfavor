// Types
import { Device } from "./Device";

export interface ParentalControlsData {
    templates: Template[];
    connectionAttempts: number;
}

export type startTime = number; // Time in HHMM format (e.g., 0800 for 8:00 AM)
export type endTime = number; // Time in HHMM format (e.g., 1600 for 4:00 PM)
export type repeatDays = number[]; // Array of days (1 = Monday, 7 = Sunday)

export interface Restriction {
    id: number;
    startTime: startTime;
    endTime: endTime;
    repeatDays: repeatDays;
}


export interface Template {
    id: number;
    name: string;
    restrictions: Restriction[];
    devices: Device[];
}
