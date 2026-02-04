import {
  Coffee,
  Briefcase,
  Moon,
  Calendar,
  FileText
} from 'lucide-react';

export type PreferenceKey =
  | 'Morning'
  | 'Afternoon'
  | 'Evening'
  | 'Weekly'
  | 'Monthly';

export interface NewsletterTheme {
  id: PreferenceKey;
  title: string;
  frequency: string;
  deliveryTime: string;
  scope: string;
  icon: typeof Coffee;
  cardGradient: string;
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
    scope: 'Last 12 hours of news',
    icon: Coffee,
    emoji: '☕',
    cardGradient: 'from-orange-300 via-amber-300 to-orange-200',
    textColor: 'text-white',
    buttonGradient: 'from-orange-400 to-amber-400',
    successMessage: 'Morning brief subscribed'
  },
  Afternoon: {
    id: 'Afternoon',
    title: 'Midday Update',
    frequency: 'Daily, Mon-Fri',
    deliveryTime: '2:00 PM IST',
    scope: 'Last 6 hours',
    icon: Briefcase,
    emoji: '💼',
    cardGradient: 'from-sky-300 via-blue-300 to-sky-200',
    textColor: 'text-white',
    buttonGradient: 'from-sky-400 to-blue-400',
    successMessage: 'Midday update subscribed'
  },
  Evening: {
    id: 'Evening',
    title: 'Evening Digest',
    frequency: 'Daily, Mon-Fri',
    deliveryTime: '7:00 PM IST',
    scope: 'Daily roundup',
    icon: Moon,
    emoji: '🌙',
    cardGradient: 'from-indigo-500 via-purple-500 to-indigo-400',
    textColor: 'text-white',
    buttonGradient: 'from-indigo-500 to-purple-500',
    successMessage: 'Evening digest subscribed'
  },
  Weekly: {
    id: 'Weekly',
    title: 'Weekend Digest',
    frequency: 'Weekly',
    deliveryTime: 'Sunday, 9:00 AM IST',
    scope: 'Weekly best',
    icon: Calendar,
    emoji: '📅',
    cardGradient: 'from-teal-400 via-emerald-400 to-teal-300',
    textColor: 'text-white',
    buttonGradient: 'from-teal-400 to-emerald-400',
    successMessage: 'Weekly digest subscribed'
  },
  Monthly: {
    id: 'Monthly',
    title: 'Monthly Intelligence',
    frequency: 'Monthly',
    deliveryTime: '1st of month, 9:00 AM IST',
    scope: 'Top 25 stories',
    icon: FileText,
    emoji: '📊',
    cardGradient: 'from-rose-400 via-pink-400 to-rose-300',
    textColor: 'text-white',
    buttonGradient: 'from-rose-400 to-pink-400',
    successMessage: 'Monthly intelligence subscribed'
  }
};

export const getTheme = (preference: PreferenceKey): NewsletterTheme => {
  return NEWSLETTER_THEMES[preference];
};

export const ALL_PREFERENCES: PreferenceKey[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Weekly',
  'Monthly'
];
