import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

const SECRET = process.env.EXPO_PUBLIC_ENCRYPTION_SECRET || "default_fallback_secret";

export const saveEncrypted = async (key: string, data: any) => {
  const jsonString = JSON.stringify(data);
  const ciphertext = CryptoJS.AES.encrypt(jsonString, SECRET).toString();
  await AsyncStorage.setItem(key, ciphertext);
};

export const loadEncrypted = async (key: string) => {
  const ciphertext = await AsyncStorage.getItem(key);
  if (!ciphertext) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
};

export const removeStored = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
