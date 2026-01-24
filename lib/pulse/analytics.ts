import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    serverTimestamp,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    getDocs,
    limit,
    FieldValue
} from 'firebase/firestore';
import { db } from './firebase';

const ARTICLES_COLLECTION = 'articles';

export interface ArticleStats {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
}

export interface Comment {
    id: string;
    text: string;
    userId: string; // Anonymous for now, or auth ID
    userName: string;
    createdAt: number;
}

// Helper to generate consistent ID from URL
export function getArticleId(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 100);
}

/**
 * Increment view count for an article (Firestore)
 */
export async function incrementArticleView(articleUrl: string): Promise<number> {
    try {
        if (!db) return 0;

        const articleId = getArticleId(articleUrl);
        const articleRef = doc(db, ARTICLES_COLLECTION, articleId);

        // Use setDoc with merge to create if not exists or update
        await setDoc(articleRef, {
            url: articleUrl,
            viewCount: increment(1),
            lastUpdated: serverTimestamp()
        }, { merge: true });

        // Get updated count (optimistic update not possible for server increment return)
        // If needed we can fetch it, but usually UI just shows +1
        return 1;
    } catch (error) {
        console.error('Failed to increment view count:', error);
        return 0;
    }
}

/**
 * Get stats for an article
 */
export async function getArticleStats(articleUrl: string): Promise<ArticleStats> {
    try {
        if (!db) return { viewCount: 0, likeCount: 0, dislikeCount: 0 };

        const articleId = getArticleId(articleUrl);
        const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
        const snapshot = await getDoc(articleRef);

        if (snapshot.exists()) {
            const data = snapshot.data();
            return {
                viewCount: data.viewCount || 0,
                likeCount: data.likeCount || 0,
                dislikeCount: data.dislikeCount || 0
            };
        }
        return { viewCount: 0, likeCount: 0, dislikeCount: 0 };
    } catch (error) {
        console.error('Failed to get article stats:', error);
        return { viewCount: 0, likeCount: 0, dislikeCount: 0 };
    }
}

/**
 * Subscribe to stats
 */
export function subscribeToArticleStats(
    articleUrl: string,
    callback: (stats: ArticleStats) => void
): () => void {
    if (!db) return () => { };

    const articleId = getArticleId(articleUrl);
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);

    return onSnapshot(articleRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            callback({
                viewCount: data.viewCount || 0,
                likeCount: data.likeCount || 0,
                dislikeCount: data.dislikeCount || 0
            });
        } else {
            callback({ viewCount: 0, likeCount: 0, dislikeCount: 0 });
        }
    });
}

// Backwards compatibility for ViewCounter (keep it working but reading from Firestore)
export async function getArticleViewCount(articleUrl: string): Promise<number> {
    const stats = await getArticleStats(articleUrl);
    return stats.viewCount;
}

// NOTE: This function is deprecated for List View usage if we only want to increment on Article Page
// But we keep it if needed. The List View should NOT call this anymore.
// We will simply NOT export it or rename it, but for compatibility let's keep it 
// and just ensure the calling code (ViewCounter) stops calling it if we change ViewCounter.
// Or better, we update ViewCounter to separate incrementing from reading.

export async function toggleLike(articleUrl: string, incrementVal: boolean): Promise<void> {
    if (!db) return;
    const articleId = getArticleId(articleUrl);
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await setDoc(articleRef, {
        likeCount: increment(incrementVal ? 1 : -1)
    }, { merge: true });
}

export async function toggleDislike(articleUrl: string, incrementVal: boolean): Promise<void> {
    if (!db) return;
    const articleId = getArticleId(articleUrl);
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await setDoc(articleRef, {
        dislikeCount: increment(incrementVal ? 1 : -1)
    }, { merge: true });
}

// Comments
export async function addComment(articleUrl: string, text: string, userName: string = 'Anonymous'): Promise<void> {
    if (!db) return;
    const articleId = getArticleId(articleUrl);
    const commentsRef = collection(db, ARTICLES_COLLECTION, articleId, 'comments');
    await addDoc(commentsRef, {
        text,
        userName,
        createdAt: Date.now() // Use client time for display simplicity, or serverTimestamp
    });
}

export function subscribeToComments(
    articleUrl: string,
    callback: (comments: Comment[]) => void
): () => void {
    if (!db) return () => { };

    const articleId = getArticleId(articleUrl);
    const commentsRef = collection(db, ARTICLES_COLLECTION, articleId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(50));

    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Comment[];
        callback(comments);
    });
}
