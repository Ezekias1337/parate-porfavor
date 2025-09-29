/**
 * Obscures sensitive text by replacing it with bullet points.  
 * @param text The text to be obscured.
 * @returns  The obscured text.
 */

const obscureSensitiveText = (text: string): string => {
    if (text.length >= 0) {
        return '•'.repeat(text.length);
    } else {
        return '';
    }
}

export default obscureSensitiveText