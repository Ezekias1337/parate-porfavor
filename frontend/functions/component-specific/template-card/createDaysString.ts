// Constants
import daysMap from "../../../constants/Days";
// Types
import { Restriction } from "../../../../shared/types/ParentalControls";

interface createDayStringProps {
    restriction: Restriction
    translate: (key: string) => string
}

const createDayString = ({ restriction, translate }: createDayStringProps) => {
    const arrayOfDays: string[] = [];

    for (const day of restriction.repeatDays) {
        let dayName = daysMap.get(day);
        if (dayName) {
            arrayOfDays.push(translate(dayName));
        }
    }

    return arrayOfDays.join(", ");
}

export default createDayString