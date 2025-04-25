// Types
import { SelectedDays } from "../components/page-specific/parental-controls/ParentalControlsModal";

const convertToRepeatDays = (repeatDays: number[]): SelectedDays => {
    let selectedDays: SelectedDays = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
    };

    if (repeatDays.length === 0) {
        return selectedDays
    } else {
        for (const day of repeatDays) {
            selectedDays[day] = true
        }
    }

    return selectedDays
}


export default convertToRepeatDays;
