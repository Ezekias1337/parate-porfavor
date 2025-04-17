export default {
    expo: {
      name: "Parate Porfavor",
      slug: "your-app-slug",
      extra: {
        encryptionSecret: process.env.EXPO_PUBLIC_ENCRYPTION_SECRET || "fallback",
      }
    }
  };
  