import axios from 'axios';
import cheerio from 'cheerio';
import env from "../util/validateEnv";

const USER_AGENT = env.USER_AGENT;

const fetchToken = async (url: string, sessionCookie: string): Promise<string | null> => {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': USER_AGENT,
                'Cookie': sessionCookie,
            },
        });
        const $ = cheerio.load(response.data);
        const token = $('input[name="onttoken"]').val();

        if (token) {
            console.log(`Token extracted: ${token}`);
            return token;
        } else {
            console.error('Token not found in the HTML.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching or parsing the .asp file:', error);
        return null;
    }
};

export default fetchToken;
