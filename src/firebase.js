// Firebase initialization for React Native (Expo)
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// 1) Go to https://console.firebase.google.com
// 2) Create a project → Add an iOS/Android app → Register app
// 3) Copy the web app config and paste here
const { expoConfig } = Constants;
const firebaseFromEnv = expoConfig?.extra?.firebase || {};

export const firebaseConfig = {
  apiKey: firebaseFromEnv.apiKey,
  authDomain: firebaseFromEnv.authDomain,
  projectId: firebaseFromEnv.projectId,
  storageBucket: firebaseFromEnv.storageBucket,
  messagingSenderId: firebaseFromEnv.messagingSenderId,
  appId: firebaseFromEnv.appId,
};

const app = initializeApp(firebaseConfig);

// Use React Native persistence so the user stays signed in across app launches
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
