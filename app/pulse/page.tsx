'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Database, Cloud, BookOpen, Brain, Shield, Workflow, Lock, TrendingUp } from "lucide-react";
import { fetchNewsByCategory, type Article } from "@/lib/pulse/newsApi";

export default function PulsePage() {
  const [newsData, setNewsData] = useState<Record<string, Article[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirstNews = async () => {
      const categories = [
        'ai', 'data-security', 'data-governance', 'data-privacy', 'data-engineering',
        'business-intelligence', 'data-management', 'cloud-computing', 'magazines'
      ];

      try {
        const newsPromises = categories.map(async (cat) => {
          try {
            const articles = await fetchNewsByCategory(cat);
            return { category: cat, articles: articles.slice(0, 1) };
          } catch (error) {
            return { category: cat, articles: [] };
          }
        });

        const results = await Promise.all(newsPromises);
        const newsMap: Record<string, Article[]> = {};
        results.forEach(({ category, articles }) => {
          newsMap[category] = articles;
        });

        setNewsData(newsMap);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstNews();
  }, []);

  const getLatestNews = (category: string) => newsData[category]?.[0];

  const CategoryBox = ({
    category,
    title,
    icon: Icon,
    colSpan,
    height,
    customClass,
    staticLabel
  }: {
    category: string;
    title: string;
    icon: any;
    colSpan: string;
    height: string;
    customClass: string;
    staticLabel: string;
  }) => {
    const news = getLatestNews(category);

    return (
      <Link
        href={`/pulse/news?category=${category}`}
        className={`${colSpan} ${height} ${customClass} relative group overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.01] shadow-lg`}
      >
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-8 h-8 text-white opacity-90" />
              <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-2 leading-tight">
                {loading ? "Loading..." : (news?.title || staticLabel)}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/90 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Explore More</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Glossy Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60"></div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="container mx-auto px-4 py-12 max-w-6xl text-center">
        {/* Hero Area - Keeping your original heading and subheading */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Segmento Pulse
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Real-time technology insights
          </p>
        </div>

        {/* --- EXACT GRID LAYOUT FROM IMAGE --- */}
        <div className="grid grid-cols-12 gap-5">
          
          {/* Top Left: AI (Large Purple/Pink Card) */}
          <CategoryBox 
            category="ai" 
            title="Artificial Intelligence" 
            icon={Brain} 
            colSpan="col-span-12 md:col-span-5" 
            height="h-[320px]" 
            staticLabel="AI Breakthrough in Healthcare Innovations"
            customClass="bg-gradient-to-br from-[#5D3FD3] via-[#A020F0] to-[#E30B5C]" 
          />

          {/* Top Right Cluster: Nested grid to match Data Eng, Data Gov, and Data Privacy */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-5">
            <CategoryBox 
              category="data-engineering" 
              title="Data Engineering" 
              icon={Workflow} 
              colSpan="col-span-1" 
              height="h-[150px]" 
              staticLabel="Building Scalable Data Pipelines"
              customClass="bg-[#1E40AF] bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" 
            />
            <CategoryBox 
              category="data-governance" 
              title="Data Governance" 
              icon={Database} 
              colSpan="col-span-1" 
              height="h-[150px]" 
              staticLabel="New Compliance Frameworks"
              customClass="bg-gradient-to-b from-[#064E3B] to-[#065F46]" 
            />
            
            {/* Wide Data Privacy Card inside the Right Cluster */}
            <CategoryBox 
              category="data-privacy" 
              title="Data Privacy" 
              icon={Lock} 
              colSpan="col-span-2" 
              height="h-[150px]" 
              staticLabel="Navigating Global Privacy Laws"
              customClass="bg-gradient-to-r from-[#F59E0B] to-[#EA580C]" 
            />
          </div>

          {/* Middle Row Start */}
          <CategoryBox 
            category="business-intelligence" 
            title="Business Intelligence" 
            icon={TrendingUp} 
            colSpan="col-span-12 md:col-span-3" 
            height="h-[240px]" 
            staticLabel="Top BI Trends 2024"
            customClass="bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF]" 
          />

          {/* Tech Magazines (Cover Image Style) */}
          <CategoryBox 
            category="magazines" 
            title="Tech Magazines" 
            icon={BookOpen} 
            colSpan="col-span-12 md:col-span-4" 
            height="h-[240px]" 
            staticLabel="Top Reads This Month"
            customClass="bg-gray-800 bg-[url('https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&q=80')] bg-cover bg-center" 
          />

          {/* Data Security (Hacker Visual Style) */}
          <CategoryBox 
            category="data-security" 
            title="Data Security" 
            icon={Shield} 
            colSpan="col-span-12 md:col-span-5" 
            height="h-[240px]" 
            staticLabel="Protecting Sensitive Data"
            customClass="bg-black bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center" 
          />

          {/* Bottom Row */}
          <CategoryBox 
            category="data-management" 
            title="Data Management" 
            icon={Database} 
            colSpan="col-span-12 md:col-span-7" 
            height="h-[200px]" 
            staticLabel="Mastering Data Integration"
            customClass="bg-gradient-to-r from-[#059669] to-[#10B981]" 
          />

          <CategoryBox 
            category="cloud-computing" 
            title="Cloud Computing" 
            icon={Cloud} 
            colSpan="col-span-12 md:col-span-5" 
            height="h-[200px]" 
            staticLabel="The Future of Cloud Services"
            customClass="bg-gradient-to-br from-[#0284C7] to-[#0369A1]" 
          />
        </div>

        <div className="mt-12 text-gray-400 text-sm font-medium">
          Click any category to explore the latest news and insights
        </div>
      </div>
    </div>
  );
}