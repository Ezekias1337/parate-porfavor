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