// Pulse Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

const pulseFirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_PULSE_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_PULSE_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.NEXT_PUBLIC_PULSE_FIREBASE_DATABASE_URL!,
    projectId: process.env.NEXT_PUBLIC_PULSE_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_PULSE_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_PULSE_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_PULSE_FIREBASE_APP_ID!
};

// Initialize Pulse Firebase app with a unique name - only on client side
import { getFirestore, Firestore } from "firebase/firestore";

let pulseApp;
let pulseAuth: Auth | undefined;
let database: Database | undefined;
let db: Firestore | undefined;

if (typeof window !== 'undefined') {
    pulseApp = initializeApp(pulseFirebaseConfig, "pulse");
    pulseAuth = getAuth(pulseApp);
    database = getDatabase(pulseApp); // Firebase Realtime Database
    db = getFirestore(pulseApp); // Firestore for engagement data
}

export { pulseAuth, database, db };
