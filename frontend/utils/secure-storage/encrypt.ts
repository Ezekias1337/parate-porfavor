// Library Imports
import CryptoJS from "crypto-js";
// Functions, Helpers, Utils, and Hooks
import  generateRandomIV  from "./generateRandomIV";

/**
 * Helper function for AES encryption
 * @param {any} data - The data to be encrypted
 * @param {string} SECRET - The secret key used for encryption
 * @returns {Object} - An object containing the encrypted data and the IV
*/

const encrypt = (data: any, SECRET: string) => {
  const json = JSON.stringify(data);
  const iv = generateRandomIV(16); // AES requires 16-byte IV for AES encryption

  // Convert the Uint8Array to CryptoJS WordArray
  const ivWordArray = CryptoJS.lib.WordArray.create(iv);

  const ciphertext = CryptoJS.AES.encrypt(json, SECRET, { iv: ivWordArray }).toString();
  return { ciphertext, iv: ivWordArray.toString(CryptoJS.enc.Base64) }; // Store IV as Base64 string
};

export default encrypt