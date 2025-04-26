/**
 * Handles the countdown timer for the modem rebooting.
 * @param {boolean} modemRebooting - The state of the modem rebooting.
 * @param {Function} setSecondsBeforeLogout - The function to set the seconds before logout.
 * @param {Function} logout - The function to log the user out.
 * @returns {Promise<void>} A promise that resolves when the countdown timer is complete.
*/

interface handleCountdownTimerProps {
    modemRebooting: boolean;
    setSecondsBeforeLogout: React.Dispatch<React.SetStateAction<number>>;
    logout: () => void;
}

const handleCountdownTimer = async ({ modemRebooting, setSecondsBeforeLogout, logout }: handleCountdownTimerProps) => {
    if (modemRebooting) {
        setSecondsBeforeLogout(5);

        const interval = setInterval(() => {
            setSecondsBeforeLogout((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    logout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }
}

export default handleCountdownTimer