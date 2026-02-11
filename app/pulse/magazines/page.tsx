'use client';

import { useEffect, useState } from "react";
import { fetchNewsByCategory, type Article } from "@/lib/pulse/newsApi";
import { BookOpen } from "lucide-react";
import NewsCard from "@/components/pulse/NewsCard";

// Force dynamic rendering (for client components, only 'dynamic' is allowed)
export const dynamic = 'force-dynamic';

export default function MagazinesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMagazines = async () => {
            try {
                const data = await fetchNewsByCategory('magazines');
                setArticles(data);
            } catch (error) {
                console.error("Failed to load magazines:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMagazines();
    }, []);

    return (
        <div className="container mx-auto px-3 xs:px-4 sm:px-4 lg:px-6 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                    <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold">Tech Magazines</h1>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-muted-foreground">Loading magazines...</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No magazines available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                        {articles.map((article, i) => (
                            <NewsCard key={i} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
