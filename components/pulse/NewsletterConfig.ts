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
  emoji: string;
  cardGradient: string;
  textColor: string;
  successMessage: string;
}

export const NEWSLETTER_THEMES: Record<PreferenceKey, NewsletterTheme> = {
  Morning: {
    id: 'Morning',
    title: 'Morning Brief',
    frequency: 'Daily, Mon-Fri',
    deliveryTime: '7:00 AM IST',
    emoji: '☕',
    cardGradient:
      'from-[#F6A15B] via-[#F39C5E] to-[#ED8A4C]',
    textColor: 'text-white',
    successMessage: 'Morning Brief subscribed'
  },

  Afternoon: {
    id: 'Afternoon',
    title: 'Midday Update',
    frequency: 'Daily, Mon-Fri',
    deliveryTime: '2:00 PM IST',
    emoji: '💼',
    cardGradient:
      'from-[#7EC8E3] via-[#6BB7E0] to-[#5BA6D8]',
    textColor: 'text-white',
    successMessage: 'Midday Update subscribed'
  },

  Evening: {
    id: 'Evening',
    title: 'Evening Digest',
    frequency: 'Daily, Mon-Fri',
    deliveryTime: '7:00 PM IST',
    emoji: '🌙',
    cardGradient:
      'from-[#4B2E83] via-[#3E1F6B] to-[#321455]',
    textColor: 'text-white',
    successMessage: 'Evening Digest subscribed'
  },

  Weekly: {
    id: 'Weekly',
    title: 'Weekend Digest',
    frequency: 'Weekly',
    deliveryTime: 'Sunday, 9:00 AM IST',
    emoji: '📅',
    cardGradient:
      'from-[#2F9E9E] via-[#238A8A] to-[#1B7070]',
    textColor: 'text-white',
    successMessage: 'Weekend Digest subscribed'
  },

  Monthly: {
    id: 'Monthly',
    title: 'Monthly Intelligence',
    frequency: 'Monthly',
    deliveryTime: '1st of every month, 9:00 AM IST',
    emoji: '📊',
    cardGradient:
      'from-[#B33A3A] via-[#9E2F2F] to-[#842424]',
    textColor: 'text-white',
    successMessage: 'Monthly Intelligence subscribed'
  }
};

export const getTheme = (preference: PreferenceKey) =>
  NEWSLETTER_THEMES[preference];

export const ALL_PREFERENCES: PreferenceKey[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Weekly',
  'Monthly'
];
