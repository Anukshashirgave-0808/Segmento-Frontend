import { database } from "./firebase";
import { ref, get } from "firebase/database";

export interface UserSubscription {
    email: string;
    name: string;
    subscribed: boolean;
    token: string;
    subscribedAt: string;
    topics: string[];
    preference: string; // 'Daily', 'Weekly', etc.
    subscriptions?: Record<string, boolean>; // New granular subscriptions
}

/**
 * Fetch user subscription details from Realtime Database
 * Note: Uses SHA-256 hash of email as the key
 */
export async function fetchUserSubscription(email: string): Promise<UserSubscription | null> {
    if (!database || !email) return null;

    try {
        // 1. Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // 2. Hash email (SHA-256)
        const encoder = new TextEncoder();
        const data = encoder.encode(normalizedEmail);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // 3. Truncate to 16 chars (matching backend logic in firebase_service.py)
        const shortHash = hashHex.substring(0, 16);

        // 4. Fetch from Realtime Database
        const subscriberRef = ref(database, `pulse/subscribers/${shortHash}`);
        const snapshot = await get(subscriberRef);

        if (snapshot.exists()) {
            return snapshot.val() as UserSubscription;
        }

        return null;
    } catch (error) {
        console.error("Error fetching user subscription:", error);
        return null;
    }
}
