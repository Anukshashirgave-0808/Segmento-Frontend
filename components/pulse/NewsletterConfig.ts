import {
  Coffee,
  Briefcase,
  Moon,
  Calendar,
  FileText,
  LucideIcon,
} from "lucide-react"

export type PreferenceKey =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Weekly"
  | "Monthly"

export interface NewsletterTheme {
  id: PreferenceKey
  title: string
  frequency: string
  deliveryTime: string
  icon: LucideIcon
  emoji: string
  cardGradient: string
  textColor: string
  successMessage: string   // ✅ FIX ADDED
}

export const NEWSLETTER_THEMES: Record<PreferenceKey, NewsletterTheme> = {
  Morning: {
    id: "Morning",
    title: "Morning Brief",
    frequency: "Daily, Mon–Fri",
    deliveryTime: "7:00 AM IST",
    icon: Coffee,
    emoji: "☕",
    cardGradient: "from-orange-400 via-orange-500 to-orange-600",
    textColor: "text-white",
    successMessage:
      "☕ You’re all set! Your Morning Brief will arrive every weekday at 7:00 AM IST.",
  },

  Afternoon: {
    id: "Afternoon",
    title: "Midday Update",
    frequency: "Daily, Mon–Fri",
    deliveryTime: "2:00 PM IST",
    icon: Briefcase,
    emoji: "💼",
    cardGradient: "from-sky-400 via-blue-500 to-blue-600",
    textColor: "text-white",
    successMessage:
      "💼 Great choice! Midday Updates will reach you at 2:00 PM IST on weekdays.",
  },

  Evening: {
    id: "Evening",
    title: "Evening Digest",
    frequency: "Daily, Mon–Fri",
    deliveryTime: "7:00 PM IST",
    icon: Moon,
    emoji: "🌙",
    cardGradient: "from-purple-600 via-indigo-700 to-purple-800",
    textColor: "text-white",
    successMessage:
      "🌙 Subscribed! Your Evening Digest will be delivered every weekday at 7:00 PM IST.",
  },

  Weekly: {
    id: "Weekly",
    title: "Weekend Digest",
    frequency: "Weekly",
    deliveryTime: "Sunday, 7:00 AM IST",
    icon: Calendar,
    emoji: "📅",
    cardGradient: "from-teal-500 via-emerald-600 to-teal-700",
    textColor: "text-white",
    successMessage:
      "📅 Nice! You’ll receive the Weekend Digest every Sunday morning.",
  },

  Monthly: {
    id: "Monthly",
    title: "Monthly Intelligence",
    frequency: "Monthly",
    deliveryTime: "1st of every month, 9:00 AM IST",
    icon: FileText,
    emoji: "📊",
    cardGradient: "from-rose-500 via-red-600 to-rose-700",
    textColor: "text-white",
    successMessage:
      "📊 You’re subscribed! Monthly Intelligence will arrive on the 1st at 9:00 AM IST.",
  },
}

export const ALL_PREFERENCES: PreferenceKey[] = [
  "Morning",
  "Afternoon",
  "Evening",
  "Weekly",
  "Monthly",
]

export const getTheme = (key: PreferenceKey): NewsletterTheme =>
  NEWSLETTER_THEMES[key]
