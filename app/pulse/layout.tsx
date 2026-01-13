'use client';

import { useState } from "react";
import PulseNavbar from "@/components/pulse/Navbar";
import NewsletterSubscribe from "@/components/pulse/NewsletterSubscribe";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function PulseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <PulseNavbar onSubscribeClick={() => setIsNewsletterOpen(true)} />
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                    © 2026 SegmentoPulse
                </div>
            </footer>

            {/* Newsletter Subscription Modal */}
            <Dialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Subscribe to Newsletter</DialogTitle>
                    </DialogHeader>
                    <NewsletterSubscribe />
                </DialogContent>
            </Dialog>
        </div>
    );
}

