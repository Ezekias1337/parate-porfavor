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

    for (const [index, day] of restriction.repeatDays.entries()) {
        let dayName = daysMap.get(index + 1);
        if (dayName) {
            arrayOfDays.push(translate(dayName));
        }
    }

    return arrayOfDays.join(", ");
}

export default createDayString