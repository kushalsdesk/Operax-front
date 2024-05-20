import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;

function getFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  if (app) console.log("fireBase is Initialized");
  return app;
}

app = getFirebaseApp();
if (!app) console.log("No App Initialized");
export const auth = getAuth(app);
if (!auth) console.log("No Auth Initialized");

const provider = new GoogleAuthProvider();

export const signIn = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user: User = result.user;
    return user;
  } catch (err) {
    throw err; // Re-throw the error if needed
  }
};
