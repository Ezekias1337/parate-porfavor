import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import * as expoRandom from "expo-random";
import Constants from "expo-constants";

// Constants
const SECRET = Constants.expoConfig?.extra?.encryptionSecret || "fallback_secret";

// Helper function to generate a random IV using expo-random
const generateRandomIV = (length: number) => {
  return expoRandom.getRandomBytes(length); // Returns a Uint8Array
};

// Helper function for AES encryption
const encrypt = (data: any) => {
  const json = JSON.stringify(data);
  const iv = generateRandomIV(16); // AES requires 16-byte IV for AES encryption

  // Convert the Uint8Array to CryptoJS WordArray
  const ivWordArray = CryptoJS.lib.WordArray.create(iv);

  const ciphertext = CryptoJS.AES.encrypt(json, SECRET, { iv: ivWordArray }).toString();
  return { ciphertext, iv: ivWordArray.toString(CryptoJS.enc.Base64) }; // Store IV as Base64 string
};

// Helper function for AES decryption
const decrypt = (ciphertext: string, iv: string) => {
  const ivWordArray = CryptoJS.enc.Base64.parse(iv); // Convert IV back to WordArray from Base64 string
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET, { iv: ivWordArray });
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export const saveEncrypted = async (key: string, data: any) => {
  try {
    const { ciphertext, iv } = encrypt(data);
    const encryptedData = { ciphertext, iv }; // Save both ciphertext and IV
    await AsyncStorage.setItem(key, JSON.stringify(encryptedData));
    console.log(`✅ Saved encrypted data under key: ${key}`);
  } catch (err) {
    console.error("❌ saveEncrypted failed:", err);
  }
};

export const loadEncrypted = async (key: string) => {
  try {
    const encryptedData = await AsyncStorage.getItem(key);
    if (!encryptedData) return null;

    const { ciphertext, iv } = JSON.parse(encryptedData);
    return decrypt(ciphertext, iv);
  } catch (err) {
    console.error("❌ loadEncrypted failed:", err);
    return null;
  }
};

export const removeStored = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`🗑️ Removed encrypted data under key: ${key}`);
  } catch (err) {
    console.error("❌ removeStored failed:", err);
  }
};
