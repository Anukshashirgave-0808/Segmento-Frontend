// Newsletter Theme Configuration - Soft Glassmorphism Design
// Inspired by modern Bento grid layouts with soft gradients

import {
    Coffee,
    Briefcase,
    Moon,
    Calendar,
    FileText
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
        // Soft orange/amber gradient
        cardGradient: 'from-orange-300 via-amber-300 to-orange-200',
        textColor: 'text-white',
        buttonGradient: 'from-orange-400 to-amber-400',
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
        // Soft sky/blue gradient
        cardGradient: 'from-sky-300 via-blue-300 to-sky-200',
        textColor: 'text-white',
        buttonGradient: 'from-sky-400 to-blue-400',
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
        // Deep indigo/purple gradient
        cardGradient: 'from-indigo-500 via-purple-500 to-indigo-400',
        textColor: 'text-white',
        buttonGradient: 'from-indigo-500 to-purple-500',
        successMessage: '🌆 Subscribed! Your Evening Digest will arrive at 7:00 PM IST daily.'
    },
    Weekly: {
        id: 'Weekly',
        title: 'Weekend Digest',
        frequency: 'Weekly',
        deliveryTime: 'Sunday, 9:00 AM IST',
        scope: 'Best stories from the past 7 days',
        icon: Calendar,
        emoji: '📅',
        // Soft teal/emerald gradient
        cardGradient: 'from-teal-400 via-emerald-400 to-teal-300',
        textColor: 'text-white',
        buttonGradient: 'from-teal-400 to-emerald-400',
        successMessage: '🎉 Awesome! Weekly roundups will arrive every Sunday at 9:00 AM IST.'
    },
    Monthly: {
        id: 'Monthly',
        title: 'Monthly Intelligence',
        frequency: 'Monthly',
        deliveryTime: '1st of every month, 9:00 AM IST',
        scope: 'Top 25 stories from the past 30 days',
        icon: FileText,
        emoji: '📊',
        // Soft rose/pink gradient
        cardGradient: 'from-rose-400 via-pink-400 to-rose-300',
        textColor: 'text-white',
        buttonGradient: 'from-rose-400 to-pink-400',
        successMessage: '📈 Subscribed! Monthly insights will arrive on the 1st at 9:00 AM IST.'
    }
};

export const getTheme = (preference: PreferenceKey): NewsletterTheme => {
    return NEWSLETTER_THEMES[preference];
};

export const ALL_PREFERENCES: PreferenceKey[] = ['Morning', 'Afternoon', 'Evening', 'Weekly', 'Monthly'];
