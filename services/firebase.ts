import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
if (!projectId) {
  throw new Error(
    'Firebase não configurado. Defina VITE_FIREBASE_* no .env-teste (veja .env-teste.example).'
  );
}

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);
export const db = getFirestore(app);
