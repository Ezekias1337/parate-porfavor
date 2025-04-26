// Library Imports
import CryptoJS from "crypto-js";

/**
 * Helper function for AES decryption 
 * @param {string} ciphertext - The ciphertext to be decrypted
 * @param {string} iv - The initialization vector used for decryption
 * @param {string} SECRET - The secret key used for decryption
 * @returns {Object} - An object containing the decrypted data
*/

const decrypt = (ciphertext: string, iv: string, SECRET: string) => {
  const ivWordArray = CryptoJS.enc.Base64.parse(iv); // Convert IV back to WordArray from Base64 string
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET, { iv: ivWordArray });
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export default decrypt;