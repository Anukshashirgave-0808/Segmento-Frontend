'use client';

import { useState, useEffect } from 'react';
import { Eye, ThumbsUp } from 'lucide-react';
import { getArticleStats, type ArticleStats } from '@/lib/pulse/analytics';

interface CardEngagementStatsProps {
    articleUrl: string;
    className?: string;
}

export default function CardEngagementStats({ articleUrl, className = '' }: CardEngagementStatsProps) {
    const [stats, setStats] = useState<ArticleStats>({ viewCount: 0, likeCount: 0, dislikeCount: 0 });

    useEffect(() => {
        let isMounted = true;
        const fetchStats = async () => {
            const data = await getArticleStats(articleUrl);
            if (isMounted) setStats(data);
        };
        fetchStats();
        return () => { isMounted = false; };
    }, [articleUrl]);

    return (
        <div className={`flex items-center gap-3 text-xs text-gray-500 ${className}`}>
            <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{stats.viewCount.toLocaleString()}</span>
            </div>
            {stats.likeCount > 0 && (
                <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{stats.likeCount.toLocaleString()}</span>
                </div>
            )}
        </div>
    );
}
