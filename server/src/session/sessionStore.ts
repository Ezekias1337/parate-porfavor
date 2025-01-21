interface SessionData {
    cookie: string;
    expiresAt: Date; // Optional: To handle session expiration
}

const sessionStore: { [key: string]: SessionData } = {};

/**
 * Save session data for a specific user or session ID.
 * @param key Unique identifier for the session (e.g., "in-laws-session").
 * @param data Session data to store.
 */
export const saveSession = (key: string, data: SessionData) => {
    sessionStore[key] = data;
};

/**
 * Get session data for a specific user or session ID.
 * @param key Unique identifier for the session.
 * @returns Session data if it exists, undefined otherwise.
 */
export const getSession = (key: string): SessionData | undefined => {
    return sessionStore[key];
};

/**
 * Remove session data for a specific user or session ID.
 * @param key Unique identifier for the session.
 */
export const removeSession = (key: string) => {
    delete sessionStore[key];
};
