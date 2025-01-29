class SessionStore {
    private cookies: Map<string, string>;

    constructor() {
        this.cookies = new Map();
    }

    // Set the raw cookie string
    setCookie(name: string, value: string) {
        this.cookies.set(name, value);
    }

    // Get the raw cookie string
    getCookie(name: string): string | undefined {
        return this.cookies.get(name);
    }

    // Get all cookies in the correct format for the request header
    getAllCookies(): string {
        return Array.from(this.cookies.values()).join('; ');
    }
}

const sessionStore = new SessionStore();

export default sessionStore;