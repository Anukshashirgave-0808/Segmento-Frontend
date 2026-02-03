'use client';

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, ExternalLink, Clock, TrendingUp, Eye, ThumbsUp, Filter, X, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchNewsV2, type ArticleV2, type SearchV2Response } from "@/lib/pulse/newsApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Category options
const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'ai', label: 'AI & Machine Learning' },
    { value: 'devops', label: 'DevOps' },
    { value: 'cloud-aws', label: 'AWS Cloud' },
    { value: 'cloud-azure', label: 'Azure Cloud' },
    { value: 'cloud-gcp', label: 'Google Cloud' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'data', label: 'Data Science' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'web', label: 'Web Development' },
];

// Cloud provider options
const CLOUD_PROVIDERS = [
    { value: '', label: 'All Providers' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'gcp', label: 'Google Cloud' },
    { value: 'oracle', label: 'Oracle Cloud' },
    { value: 'ibm', label: 'IBM Cloud' },
];

// Recency presets
const RECENCY_OPTIONS = [
    { value: 0, label: 'All Time' },
    { value: 24, label: 'Last 24 Hours' },
    { value: 48, label: 'Last 2 Days' },
    { value: 72, label: 'Last 3 Days' },
    { value: 168, label: 'Last Week' },
];

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [searchResponse, setSearchResponse] = useState<SearchV2Response | null>(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Filters
    const [category, setCategory] = useState('');
    const [cloudProvider, setCloudProvider] = useState('');
    const [maxHours, setMaxHours] = useState(0);
    const [decayFactor, setDecayFactor] = useState(0.1);
    const [showFilters, setShowFilters] = useState(false);

    // Auto-search on initial query
    useEffect(() => {
        if (initialQuery && !searched) {
            handleSearch();
        }
    }, [initialQuery]);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const response = await searchNewsV2(query.trim(), {
                category: category || undefined,
                cloud_provider: cloudProvider || undefined,
                max_hours: maxHours || undefined,
                decay_factor: decayFactor,
                limit: 20,
            });
            setSearchResponse(response);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setCategory('');
        setCloudProvider('');
        setMaxHours(0);
        setDecayFactor(0.1);
    };

    const getScoreColor = (score: number) => {
        if (score >= 0.8) return 'bg-green-500';
        if (score >= 0.6) return 'bg-blue-500';
        if (score >= 0.4) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    const results = searchResponse?.results || [];
    const activeFiltersCount = [category, cloudProvider, maxHours].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Hybrid Search V2
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Powered by AI-driven time decay ranking and semantic search
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search for news... (e.g., 'kubernetes security', 'AWS lambda')"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 h-14 text-lg shadow-lg"
                            />
                            <Button type="submit" size="lg" disabled={loading} className="h-14 px-8">
                                <SearchIcon className="mr-2 h-5 w-5" />
                                Search
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="h-14"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="mr-2 h-5 w-5" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="default" className="ml-2">{activeFiltersCount}</Badge>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Advanced Filters</h3>
                                <Button variant="ghost" size="sm" onClick={clearFilters}>
                                    <X className="mr-1 h-4 w-4" />
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map(cat => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Cloud Provider Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Cloud Provider</label>
                                    <Select value={cloudProvider} onValueChange={setCloudProvider}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CLOUD_PROVIDERS.map(provider => (
                                                <SelectItem key={provider.value} value={provider.value}>
                                                    {provider.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Recency Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Recency: {maxHours === 0 ? 'All Time' : `Last ${maxHours}h`}
                                    </label>
                                    <Select value={maxHours.toString()} onValueChange={(v: string) => setMaxHours(parseInt(v))}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {RECENCY_OPTIONS.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value.toString()}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Time Decay Factor */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Time Decay: {decayFactor.toFixed(2)}
                                        {decayFactor < 0.2 && ' (Slow)'}
                                        {decayFactor >= 0.2 && decayFactor < 0.4 && ' (Balanced)'}
                                        {decayFactor >= 0.4 && ' (Aggressive)'}
                                    </label>
                                    <Slider
                                        value={[decayFactor]}
                                        onValueChange={(v: number[]) => setDecayFactor(v[0])}
                                        min={0.0}
                                        max={1.0}
                                        step={0.1}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <Button onClick={handleSearch} className="w-full mt-4">
                                Apply Filters
                            </Button>
                        </div>
                    )}

                    {/* Search Metrics */}
                    {searchResponse && (
                        <div className="flex flex-wrap gap-3 mb-6">
                            <Badge variant="outline" className="px-3 py-1">
                                {searchResponse.count} results
                            </Badge>
                            <Badge variant="outline" className="px-3 py-1">
                                {searchResponse.processing_time_ms.toFixed(1)}ms
                            </Badge>
                            {searchResponse.cache_hit && (
                                <Badge variant="default" className="px-3 py-1 bg-green-500">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Cache Hit
                                </Badge>
                            )}
                            {searchResponse.filters_applied.category && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    Category: {searchResponse.filters_applied.category}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Results */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-muted-foreground">Searching with AI-powered ranking...</p>
                        </div>
                    ) : searched && results.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-500 text-lg">No results found for "{query}"</p>
                            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-4">
                            {results.map((article) => (
                                <a
                                    key={article.id}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all p-5 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={article.image || '/placeholder.png'}
                                            alt={article.title}
                                            className="w-40 h-28 object-cover rounded flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            {/* Title */}
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article.title}
                                                <ExternalLink className="inline-block ml-2 w-4 h-4" />
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                {article.description}
                                            </p>

                                            {/* Metadata Row */}
                                            <div className="flex flex-wrap items-center gap-3 text-xs">
                                                {/* Relevance Score */}
                                                <Badge className={`${getScoreColor(article.relevance_score)} text-white`}>
                                                    Score: {article.final_score.toFixed(2)}
                                                </Badge>

                                                {/* Time */}
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{article.hours_old.toFixed(1)}h ago</span>
                                                </div>

                                                {/* Engagement */}
                                                {(article.likes > 0 || article.views > 0) && (
                                                    <div className="flex items-center gap-2">
                                                        {article.likes > 0 && (
                                                            <div className="flex items-center gap-1 text-gray-500">
                                                                <ThumbsUp className="w-3 h-3" />
                                                                <span>{article.likes}</span>
                                                            </div>
                                                        )}
                                                        {article.views > 0 && (
                                                            <div className="flex items-center gap-1 text-gray-500">
                                                                <Eye className="w-3 h-3" />
                                                                <span>{article.views}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Category */}
                                                <Badge variant="outline">{article.category}</Badge>

                                                {/* Cloud Provider Badge */}
                                                {article.is_cloud_news && article.cloud_provider && (
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        ☁️ {article.cloud_provider.toUpperCase()}
                                                    </Badge>
                                                )}

                                                {/* Source */}
                                                {article.source && <span className="text-gray-500">• {article.source}</span>}
                                            </div>

                                            {/* Time Decay Indicator */}
                                            <div className="mt-2">
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all"
                                                        style={{ width: `${article.time_decay * 100}%` }}
                                                        title={`Recency Score: ${article.time_decay.toFixed(2)}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-muted-foreground">Loading Search...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
