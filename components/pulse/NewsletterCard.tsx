'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { PreferenceKey, NewsletterTheme } from './NewsletterConfig';

interface NewsletterCardProps {
    theme: NewsletterTheme;
    onSelect: (preference: PreferenceKey) => void;
    index: number;
}

export default function NewsletterCard({ theme, onSelect, index }: NewsletterCardProps) {
    const Icon = theme.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(theme.id)}
            className="cursor-pointer group h-full"
        >
            {/* Glassmorphism Card with Gradient Background */}
            <div className={`
                relative h-full rounded-3xl p-6 flex flex-col
                bg-gradient-to-br ${theme.cardGradient}
                backdrop-blur-md bg-opacity-90
                shadow-xl hover:shadow-2xl
                border border-white/30
                transition-all duration-300
                overflow-hidden
            `}>
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-3xl bg-white/10" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon - Large 3D-style with drop shadow */}
                    <div className="mb-4">
                        <div className="w-16 h-16 flex items-center justify-center">
                            <Icon
                                className={`w-14 h-14 ${theme.textColor} drop-shadow-lg`}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                        text-xl font-bold mb-1
                        ${theme.textColor}
                        drop-shadow-md
                    `}>
                        {theme.title}
                    </h3>

                    {/* Frequency */}
                    <p className={`text-sm ${theme.textColor} opacity-90 mb-auto`}>
                        {theme.frequency}
                    </p>

                    {/* Time Badge at Bottom */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${theme.textColor} opacity-80`} />
                            <span className={`text-sm font-medium ${theme.textColor}`}>
                                {theme.deliveryTime}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </div>
        </motion.div>
    );
}
