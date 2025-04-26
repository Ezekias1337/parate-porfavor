// Library Imports
import { exec } from "child_process";

/**
 * Runs a curl command and returns the output
 * @param {string} command - The curl command to run
 * @returns {Promise<string>} - The output of the curl command
*/

const runCurlCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing curl command:", error);
                reject(error);
                return;
            }
            if (stderr) {
                console.error("stderr from curl command:", stderr);
            }
            resolve(stdout);
        });
    });
};

export default runCurlCommand;