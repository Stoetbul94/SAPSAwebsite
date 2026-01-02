import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:dummy",
};

let app;
try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  // If initialization fails, try to get existing app or create with minimal config
  app = getApps().length ? getApp() : initializeApp({
    apiKey: "dummy",
    authDomain: "dummy.firebaseapp.com",
    projectId: "dummy",
    storageBucket: "dummy.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:dummy",
  });
}

// ✅ Client-only SDK instances (non-optional)
// Firestore and Storage work on both client and server
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth is client-only - initialize lazily to avoid server-side errors
// This maintains type safety while preventing server-side initialization
let _authInstance: ReturnType<typeof getAuth> | null = null;

const getAuthInstance = (): ReturnType<typeof getAuth> => {
  if (_authInstance === null) {
    _authInstance = getAuth(app);
  }
  return _authInstance;
};

// Export auth as a getter that initializes on first access
// This is safe because auth is only used in client components
export const auth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(_target, prop, _receiver) {
    const instance = getAuthInstance();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

// Helper function to check if Firebase is configured
export const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    !firebaseConfig.apiKey.includes("your_") &&
    !firebaseConfig.apiKey.includes("placeholder")
  );
};
