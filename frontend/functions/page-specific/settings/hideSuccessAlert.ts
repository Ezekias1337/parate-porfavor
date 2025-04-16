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