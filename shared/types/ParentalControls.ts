// Types
import { Device } from "./Device";

export interface ParentalControlsDevice extends Device {
    description: string;
    templateId: number;
}

export interface ParentalControlsData {
    templates: Template[];
    connectionAttempts: number;
    devices: ParentalControlsDevice[];
}

export interface Template {
    id: number;
    name: string;
    startTime: number; // Time in HHMM format (e.g., 0800 for 8:00 AM)
    endTime: number; // Time in HHMM format (e.g., 1600 for 4:00 PM)
    repeatDays: number[]; // Array of days (1 = Monday, 7 = Sunday)
}
