import * as cheerio from 'cheerio';

/**
 * Extracts the `onttoken` value from an HTML or ASP file content.
 * @param {string} htmlContent - The raw HTML/ASP file content to be parsed.
 * @param {boolean} logToken - Optional flag to log the extracted token.
 * @returns {string | null} - The extracted token or null if not found.
*/

const fetchOntToken = (htmlContent: string, logToken?: boolean): string | null => {
    try {
        const $ = cheerio.load(htmlContent);
        const token = $('input[name="onttoken"]').val();

        if (token) {
            if (logToken) {
                console.log(`Token extracted: ${token}`);
            }

            return token;
        } else {
            console.error('Token not found in the HTML.');
            return null;
        }
    } catch (error) {
        console.error('Error parsing the HTML content:', error);
        return null;
    }
};

export default fetchOntToken;
