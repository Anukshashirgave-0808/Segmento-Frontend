// Newsletter Theme Configuration - Soft Glassmorphism Design
// Inspired by modern Bento grid layouts with soft gradients

import {
    Coffee,
    Briefcase,
    Moon,
    Calendar,
    BarChart2
} from 'lucide-react';

export type PreferenceKey = 'Morning' | 'Afternoon' | 'Evening' | 'Weekly' | 'Monthly';

export interface NewsletterTheme {
    id: PreferenceKey;
    title: string;
    frequency: string; // "Daily, Mon-Fri" etc.
    deliveryTime: string;
    scope: string;
    icon: typeof Coffee;
    // Soft, light gradients for glass cards
    cardGradient: string;
    // Text should be white on colored backgrounds
    textColor: string;
    buttonGradient: string;
    successMessage: string;
    emoji: string;
}

export const NEWSLETTER_THEMES: Record<PreferenceKey, NewsletterTheme> = {
    Morning: {
        id: 'Morning',
        title: 'Morning Brief',
        frequency: 'Daily, Mon-Fri',
        deliveryTime: '7:00 AM IST',
        scope: 'Last 12 hours of news (since 7 PM yesterday)',
        icon: Coffee,
        emoji: '☕',
        // Vibrant Orange Gradient
        cardGradient: 'bg-linear-to-br from-orange-500 to-amber-500',
        textColor: 'text-white',
        buttonGradient: 'bg-linear-to-r from-orange-500 to-amber-500',
        successMessage: '🌅 Perfect! You\'ll receive your Morning Brief at 7:00 AM IST every weekday.'
    },
    Afternoon: {
        id: 'Afternoon',
        title: 'Midday Update',
        frequency: 'Daily, Mon-Fri',
        deliveryTime: '2:00 PM IST',
        scope: 'Last 6 hours of breaking news',
        icon: Briefcase,
        emoji: '💼',
        // Vibrant Blue Gradient
        cardGradient: 'bg-linear-to-br from-blue-500 to-sky-500',
        textColor: 'text-white',
        buttonGradient: 'bg-linear-to-r from-blue-500 to-sky-500',
        successMessage: '☀️ Great choice! Midday updates will arrive at 2:00 PM IST on weekdays.'
    },
    Evening: {
        id: 'Evening',
        title: 'Evening Digest',
        frequency: 'Daily, Mon-Fri',
        deliveryTime: '7:00 PM IST',
        scope: 'Comprehensive daily roundup (last 24 hours)',
        icon: Moon,
        emoji: '🌙',
        // Deep Purple Gradient
        cardGradient: 'bg-linear-to-br from-purple-600 to-indigo-600',
        textColor: 'text-white',
        buttonGradient: 'bg-linear-to-r from-purple-600 to-indigo-600',
        successMessage: '🌆 Subscribed! Your Evening Digest will arrive at 7:00 PM IST daily.'
    },
    Weekly: {
        id: 'Weekly',
        title: 'Weekend Digest',
        frequency: 'Weekly',
        deliveryTime: 'Sunday, 7:00 AM IST', // Updated time
        scope: 'Best stories from the past 7 days',
        icon: Calendar,
        emoji: '📅',
        // Vibrant Teal/Green Gradient
        cardGradient: 'bg-linear-to-br from-emerald-500 to-teal-500',
        textColor: 'text-white',
        buttonGradient: 'bg-linear-to-r from-emerald-500 to-teal-500',
        successMessage: '🎉 Awesome! Weekly roundups will arrive every Sunday at 7:00 AM IST.'
    },
    Monthly: {
        id: 'Monthly',
        title: 'Monthly Intelligence',
        frequency: 'Monthly',
        deliveryTime: '1st of every month, 9:00 AM IST',
        scope: 'Top 25 stories from the past 30 days',
        icon: BarChart2, // Changed to BarChart
        emoji: '📊',
        // Vibrant Pink/Rose Gradient
        cardGradient: 'bg-linear-to-br from-pink-500 to-rose-500',
        textColor: 'text-white',
        buttonGradient: 'bg-linear-to-r from-pink-500 to-rose-500',
        successMessage: '📈 Subscribed! Monthly insights will arrive on the 1st at 9:00 AM IST.'
    }
};

export const getTheme = (preference: PreferenceKey): NewsletterTheme => {
    return NEWSLETTER_THEMES[preference];
};

export const ALL_PREFERENCES: PreferenceKey[] = ['Morning', 'Afternoon', 'Evening', 'Weekly', 'Monthly'];
