/**
 * Handles the input change for the login form
 * @param setFilter The setter for the filter
 * @returns {Text} The updated filter
*/

const handleInputChange =
    (setFilter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
        setFilter(text);
    };

export default handleInputChange;