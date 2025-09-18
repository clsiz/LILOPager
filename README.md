# LILOPager — React Native (Expo) + Firebase Auth

A minimal, secure starter for email/password authentication using Expo and Firebase. Runs on iOS and Android with Expo Go.

## Features
- Email/password sign up, login, logout
- Auth state persisted across app launches
- Navigation guards (show auth screens vs. home)
- Env-driven Firebase config via Expo Constants

## Prerequisites
- Node.js 18+ and npm
- Expo Go app on your phone (App Store / Play Store)
- Firebase project (free tier is fine)

## Setup
1) Clone and install
```
git clone https://github.com/clsiz/LILOPager.git
cd LILOPager/auth-starter
npm install
```

2) Create env file
```
copy .env.example .env   # Windows
# or
cp .env.example .env     # macOS/Linux
```
Fill `.env` with values from Firebase Console → Project settings → Your apps → Web app:
```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

3) Enable Email/Password auth in Firebase
- Firebase Console → Build → Authentication → Get started
- Sign-in method → Enable “Email/Password”

## Run
```
npm start
```
- Scan the QR with Expo Go to run on your device.
- Or `npm run android` (emulator) / `npm run ios` (requires macOS/Xcode) / `npm run web`.

## Project Structure
- `App.js` — Navigation + auth guard
- `src/firebase.js` — Firebase init; reads from `expo-constants` (env-driven)
- `src/contexts/AuthContext.js` — Auth state, signIn, signUp, signOut
- `src/screens/LoginScreen.js` — Login UI
- `src/screens/RegisterScreen.js` — Registration UI
- `src/screens/HomeScreen.js` — Post-login screen
- `app.config.js` — Exposes env vars to `expo.extra`
- `.env.example` — Template of required env vars (commit this; keep `.env` untracked)

## Security Notes
- Firebase apiKey in the client is NOT a secret; rules + Auth protect data.
- Set Firestore/RTDB/Storage rules to require `request.auth != null` (if you add these services).
- Never commit server secrets or service account JSON.

## Troubleshooting
- “App won’t start / config undefined”: Ensure `.env` is filled and you start via `npm start` (dotenv loads `.env`).
- “Email/Password disabled”: Enable it in Firebase Authentication → Sign-in method.
- “iOS build on Windows”: Use Expo Go or an Android emulator; iOS native builds require macOS.

## Next Steps
- Add password reset and email verification screens
- Add biometric quick unlock (optional)
- Add Firestore with secure rules

---
Tip: Keep `.env.example` in the repo so collaborators know which variables to set. Do not commit your real `.env`.
