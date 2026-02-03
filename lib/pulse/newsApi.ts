// News API for Pulse - now uses FastAPI backend
const API_BASE = process.env.NEXT_PUBLIC_PULSE_API_URL || 'http://localhost:8000';

export interface Article {
    title: string;
    description: string;
    url: string;
    image: string;
    publishedAt: string;
    source: string;
    author?: string;
}

// V2 Article with enhanced metadata and scoring
export interface ArticleV2 {
    id: string;
    title: string;
    description: string;
    url: string;
    source: string;
    published_at: string;
    image: string;
    category: string;
    tags?: string;
    is_cloud_news: boolean;
    cloud_provider?: string;
    likes: number;
    views: number;
    relevance_score: number;
    time_decay: number;
    final_score: number;
    hours_old: number;
}

// V2 Search Response
export interface SearchV2Response {
    success: boolean;
    query: string;
    count: number;
    cache_hit: boolean;
    processing_time_ms: number;
    results: ArticleV2[];
    filters_applied: {
        category?: string | null;
        cloud_provider?: string | null;
        max_hours?: number | null;
        decay_factor: number;
    };
}

// V2 Search Options
export interface SearchV2Options {
    category?: string;
    cloud_provider?: string;
    limit?: number;
    max_hours?: number;
    decay_factor?: number;
}

export async function fetchNewsByCategory(
    category: string,
    page: number = 1,
    limit: number = 20
): Promise<Article[]> {
    try {
        // Use FastAPI backend endpoint with pagination
        const response = await fetch(
            `${API_BASE}/api/news/${category}?page=${page}&limit=${limit}`,
            {
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch news:', response.statusText);
            return [];
        }

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Legacy V1 search (kept for backward compatibility)
export async function searchNews(query: string): Promise<Article[]> {
    try {
        // Use FastAPI backend search endpoint
        const response = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to search news:', response.statusText);
            return [];
        }

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error searching news:', error);
        return [];
    }
}

// V2 Hybrid Search with Advanced Features
export async function searchNewsV2(
    query: string,
    options: SearchV2Options = {}
): Promise<SearchV2Response> {
    try {
        // Build query parameters
        const params = new URLSearchParams({
            q: query,
        });

        if (options.category) params.append('category', options.category);
        if (options.cloud_provider) params.append('cloud_provider', options.cloud_provider);
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.max_hours) params.append('max_hours', options.max_hours.toString());
        if (options.decay_factor !== undefined) params.append('decay_factor', options.decay_factor.toString());

        const response = await fetch(`${API_BASE}/api/search/v2?${params.toString()}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('[Search V2] Failed:', response.statusText);
            // Return empty response on error
            return {
                success: false,
                query,
                count: 0,
                cache_hit: false,
                processing_time_ms: 0,
                results: [],
                filters_applied: {
                    category: options.category || null,
                    cloud_provider: options.cloud_provider || null,
                    max_hours: options.max_hours || null,
                    decay_factor: options.decay_factor || 0.1,
                },
            };
        }

        const data: SearchV2Response = await response.json();
        return data;
    } catch (error) {
        console.error('[Search V2] Error:', error);
        return {
            success: false,
            query,
            count: 0,
            cache_hit: false,
            processing_time_ms: 0,
            results: [],
            filters_applied: {
                category: options.category || null,
                cloud_provider: options.cloud_provider || null,
                max_hours: options.max_hours || null,
                decay_factor: options.decay_factor || 0.1,
            },
        };
    }
}
