/**
 * Hides the success alert after 5 seconds
 * @param {boolean} settingsSaved - The state of the settings saved.
 * @param {React.Dispatch<boolean>} setSettingsSaved - The function to set the settings saved state.
 * @returns {Function} The cleanup function.
*/

interface HideSuccessAlertProps {
    settingsSaved: boolean;
    setSettingsSaved: React.Dispatch<boolean>
}

const hideSuccessAlert = async ({ settingsSaved, setSettingsSaved }: HideSuccessAlertProps) => {
    if (!settingsSaved) return;

    const timeout = setTimeout(() => {
        setSettingsSaved(false);
    }, 5000);

    return () => clearTimeout(timeout);
}

export default hideSuccessAlert;