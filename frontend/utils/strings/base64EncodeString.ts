// Library Imports
import base64 from 'react-native-base64';

/**
 * Encodes a string using Base64 encoding.
 * @param {string} string - The string to be encoded.
 * @returns {string} - The encoded string.
*/

const base64EncodeString = (string: string): string => {
  return base64.encode(string);
};

export default base64EncodeString;
