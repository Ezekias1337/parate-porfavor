// Library Imports
import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Parate Porfavor",
  slug: "parate-porfavor",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#040A15",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ezekias1337.parateporfavor"
  },
  android: {
    package: "com.ezekias1337.parateporfavor",
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#040A15",
    },
    softwareKeyboardLayoutMode: "pan",
    edgeToEdgeEnabled: true,
    permissions: ["INTERNET", "android.permission.INTERNET", "STORAGE"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-localization",
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 34,
          buildToolsVersion: "35.0.0",
          usesCleartextTraffic: true,
        },
      },
    ],
  ],


  experiments: {
    typedRoutes: true,
  },
  androidStatusBar: {
    barStyle: "light-content",
    backgroundColor: "#4276CF",
  },
  extra: {
    encryptionSecret: process.env.EXPO_PUBLIC_ENCRYPTION_SECRET || "fallback",
    eas: {
      projectId: "44357fa5-05e3-4415-9214-99edeebb023f",
    },
  },
});
