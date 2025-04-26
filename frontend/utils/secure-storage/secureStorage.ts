// Library Imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import * as expoRandom from "expo-random";
import Constants from "expo-constants";
// Functions, Helpers, Utils, and Hooks
import encrypt from "./encrypt";
import decrypt from "./decrypt";

const SECRET = Constants.expoConfig?.extra?.encryptionSecret || "fallback_secret";

export const saveEncrypted = async (key: string, data: any) => {
  try {
    const { ciphertext, iv } = encrypt(data, SECRET);
    const encryptedData = { ciphertext, iv }; // Save both ciphertext and IV
    await AsyncStorage.setItem(key, JSON.stringify(encryptedData));
  } catch (err) {
    console.error("❌ saveEncrypted failed:", err);
  }
};

export const loadEncrypted = async (key: string) => {
  try {
    const encryptedData = await AsyncStorage.getItem(key);
    if (!encryptedData) return null;

    const { ciphertext, iv } = JSON.parse(encryptedData);
    return decrypt(ciphertext, iv, SECRET);
  } catch (err) {
    console.error("❌ loadEncrypted failed:", err);
    return null;
  }
};

export const removeStored = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error("❌ removeStored failed:", err);
  }
};
