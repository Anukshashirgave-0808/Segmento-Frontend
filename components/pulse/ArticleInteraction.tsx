'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { getArticleStats, toggleLike, toggleDislike, subscribeToArticleStats } from '@/lib/pulse/analytics';

interface ArticleInteractionProps {
    articleUrl: string;
    onCommentClick?: () => void;
}

export default function ArticleInteraction({ articleUrl, onCommentClick }: ArticleInteractionProps) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

    // Subscribe to real-time stats
    useEffect(() => {
        const unsubscribe = subscribeToArticleStats(articleUrl, (stats) => {
            // Only update counts if we haven't manipulated them locally recently 
            // (Simpler: just always update, but local state might drift properly if we just add/sub locally)
            // For true optimistic UI, we typically ignore server updates while we are 'dirty' or merge them logiclaly.
            // Here we'll just accept server updates but userAction keeps local highlight.
            setLikes(stats.likeCount);
            setDislikes(stats.dislikeCount);
        });
        return () => unsubscribe();
    }, [articleUrl]);

    const handleLike = async () => {
        const isLiking = userAction !== 'like';

        // Optimistic update
        setLikes(prev => isLiking ? prev + 1 : prev - 1);
        if (userAction === 'dislike') setDislikes(prev => prev - 1);

        setUserAction(isLiking ? 'like' : null);

        // API Call
        await toggleLike(articleUrl, isLiking);
        if (userAction === 'dislike') await toggleDislike(articleUrl, false); // Remove dislike if previously disliked
    };

    const handleDislike = async () => {
        const isDisliking = userAction !== 'dislike';

        // Optimistic update
        setDislikes(prev => isDisliking ? prev + 1 : prev - 1);
        if (userAction === 'like') setLikes(prev => prev - 1);

        setUserAction(isDisliking ? 'dislike' : null);

        // API Call
        await toggleDislike(articleUrl, isDisliking);
        if (userAction === 'like') await toggleLike(articleUrl, false); // Remove like if previously liked
    };

    return (
        <div className="flex items-center gap-6 py-4 border-y border-gray-100 my-6">
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${userAction === 'like' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
                <ThumbsUp className={`w-5 h-5 ${userAction === 'like' ? 'fill-current' : ''}`} />
                <span className="font-medium text-sm">{likes}</span>
            </button>

            <button
                onClick={handleDislike}
                className={`flex items-center gap-2 transition-colors ${userAction === 'dislike' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
                <ThumbsDown className={`w-5 h-5 ${userAction === 'dislike' ? 'fill-current' : ''}`} />
                <span className="font-medium text-sm">{dislikes}</span>
            </button>

            <button
                onClick={onCommentClick}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors ml-auto"
            >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Comments</span>
            </button>
        </div>
    );
}
