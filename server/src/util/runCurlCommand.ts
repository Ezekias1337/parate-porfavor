import { exec } from "child_process";

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