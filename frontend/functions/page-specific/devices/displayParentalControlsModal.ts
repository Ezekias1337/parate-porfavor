/**
 * Displays the parental controls modal
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModalVisible - The function to set the modal visible state
 * @returns {void}
*/

const displayParentalControlsModal = (setModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setModalVisible(true);
};

export default displayParentalControlsModal;