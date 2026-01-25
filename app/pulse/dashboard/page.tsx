'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pulseAuth } from '@/lib/pulse/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { fetchUserSubscription, UserSubscription } from '@/lib/pulse/userApi';
import { User as UserIcon, Mail, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pulseAuth) return;

        const unsubscribe = onAuthStateChanged(pulseAuth, async (currentUser) => {
            if (!currentUser) {
                router.push('/pulse/login');
                return;
            }

            setUser(currentUser);

            // Fetch subscription data
            if (currentUser.email) {
                const subData = await fetchUserSubscription(currentUser.email);
                setSubscription(subData);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container py-12 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                <p className="text-gray-500 mb-8">Manage your profile and news preferences.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <UserIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Profile</h2>
                                <p className="text-sm text-gray-500">Your account details</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                                <div className="flex items-center gap-2 text-gray-700 mt-1">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    {user.email}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Account ID</label>
                                <div className="text-sm text-gray-500 mt-1 font-mono bg-gray-50 p-2 rounded">
                                    {user.uid}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-blue-50 rounded-bl-full -z-0"></div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${subscription?.subscribed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Newsletter</h2>
                                <p className="text-sm text-gray-500">Subscription status</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            {subscription?.subscribed ? (
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        <CheckCircle className="h-4 w-4" />
                                        Active
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <p className="text-xs text-gray-500 mb-1">Frequency</p>
                                            <p className="font-semibold text-gray-900">{subscription.preference}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <p className="text-xs text-gray-500 mb-1">Subscribed Since</p>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(subscription.subscribedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Next issue: {subscription.preference === 'Weekly' ? 'Monday Morning' : 'Tomorrow Morning'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                                        <XCircle className="h-4 w-4" />
                                        Inactive
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        You are not currently subscribed to any newsletters. Stay updated with the latest tech news!
                                    </p>
                                    <button
                                        onClick={() => document.querySelector<HTMLElement>('.rainbow-shimmer-btn')?.click()}
                                        className="text-sm text-blue-600 font-medium hover:underline"
                                    >
                                        Subscribe Now →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
