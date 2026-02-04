'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchNewsByCategory, type Article } from "@/lib/pulse/newsApi";
import NewsCard from "@/components/pulse/NewsCard";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/* ================= CATEGORY RELATIONSHIPS (UNCHANGED) ================= */
const categoryRelationships: Record<string, Array<{ id: string; name: string }>> = {
    /* ---------------- DATA ---------------- */
    'data-security': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-governance': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-privacy': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-engineering': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'business-analytics': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'business-intelligence': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'customer-data-platform': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-centers': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-management': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],
    'data-laws': [
        { id: "data-laws", name: "Data Laws" },
        { id: "business-analytics", name: "Business Analytics" },
        { id: "business-intelligence", name: "Business Intelligence" },
        { id: "customer-data-platform", name: "Customer Data Platform" },
        { id: "data-centers", name: "Data Centers" },
        { id: "data-engineering", name: "Data Engineering" },
        { id: "data-governance", name: "Data Governance" },
        { id: "data-management", name: "Data Management" },
        { id: "data-privacy", name: "Data Privacy" },
        { id: "data-security", name: "Data Security" },
    ],

    /* ---------------- CLOUD ---------------- */
    'cloud-computing': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
        'cloud-aws': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-gcp': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-azure': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-ibm': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-oracle': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-digitalocean': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-salesforce': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-alibaba': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-tencent': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-huawei': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],
    'cloud-cloudflare': [
        { id: "cloud-computing", name: "All Cloud" },
        { id: "cloud-aws", name: "AWS" },
        { id: "cloud-gcp", name: "GCP" },
        { id: "cloud-azure", name: "Azure" },
        { id: "cloud-ibm", name: "IBM Cloud" },
        { id: "cloud-oracle", name: "Oracle" },
        { id: "cloud-digitalocean", name: "DigitalOcean" },
        { id: "cloud-salesforce", name: "Salesforce" },
        { id: "cloud-alibaba", name: "Alibaba Cloud" },
        { id: "cloud-tencent", name: "Tencent Cloud" },
        { id: "cloud-huawei", name: "Huawei Cloud" },
        { id: "cloud-cloudflare", name: "Cloudflare" },
    ],


    /* ---------------- OTHERS ---------------- */
    'ai': [{ id: "ai", name: "AI" }],
    'medium-article': [{ id: "medium-article", name: "Medium Article" }],
    'magazines': [{ id: "magazines", name: "Magazines" }],
};

/* ================= COMPONENT ================= */

function NewsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || 'ai';

    const [activeCategory, setActiveCategory] = useState(categoryParam);
    const [newsData, setNewsData] = useState<Record<string, Article[]>>({});
    const [loading, setLoading] = useState(false);

    /* 🔑 GROUP LOGIC (THIS FIXES CLOUD) */
    const groupCategory =
        activeCategory.startsWith('cloud-')
            ? 'cloud-computing'
            : activeCategory;

    const categoriesToShow =
        categoryRelationships[groupCategory] || [
            { id: activeCategory, name: activeCategory }
        ];

    useEffect(() => {
        setActiveCategory(categoryParam);
    }, [categoryParam]);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const articles = await fetchNewsByCategory(activeCategory, 1, 20);
                setNewsData(prev => ({ ...prev, [activeCategory]: articles }));
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [activeCategory]);

    const articles = newsData[activeCategory] || [];

    return (
        <div className="container mx-auto px-4 py-8">

            {/* CATEGORY PILLS */}
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
                {categoriesToShow.map(cat => {
                    const isCloudProvider =
                        cat.id.startsWith('cloud-') && cat.id !== 'cloud-computing';
                    const providerName = cat.id.replace('cloud-', '');

                    return (
                        <Link
                            key={cat.id}
                            href={`/pulse/news?category=${cat.id}`}
                            className={`px-6 py-2 rounded-full transition-all flex items-center gap-2
                                ${activeCategory === cat.id
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {isCloudProvider && (
                                <img
                                    src={`/cloud-logos/${providerName}.svg`}
                                    alt={cat.name}
                                    className="w-5 h-5"
                                />
                            )}
                            {cat.name}
                        </Link>
                    );
                })}
            </div>

            {/* NEWS GRID */}
            {loading ? (
                <div className="text-center py-20">Loading news...</div>
            ) : articles.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No news available
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {articles.map((article, i) => (
                        <NewsCard key={i} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function NewsPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
            <NewsContent />
        </Suspense>
    );
}
