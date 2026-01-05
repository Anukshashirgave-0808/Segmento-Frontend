import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Clock } from "lucide-react"

export const metadata = {
    title: "Segmento Pulse - Coming Soon",
    description: "Segmento Pulse is coming soon. Stay tuned for our next-generation compliance and risk intelligence platform.",
}

export default function SegmentoPulsePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-purple-50 to-blue-50">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-8 animate-pulse">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Segmento Pulse
                    </h1>

                    {/* Subtitle */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Clock className="w-6 h-6 text-primary" />
                        <p className="text-xl md:text-2xl font-semibold text-primary">
                            Coming Soon
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        We're working on something amazing. Segmento Pulse will be your next-generation
                        compliance and risk intelligence platform, providing real-time insights and
                        automated compliance monitoring for enterprise data.
                    </p>

                    {/* Features Preview */}
                    <div className="bg-white rounded-2xl border border-border/50 shadow-lg p-8 mb-12 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                        <ul className="space-y-4 text-left">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Real-time compliance monitoring and alerting</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Automated risk assessment and scoring</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Regulatory change tracking and impact analysis</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1">✓</span>
                                <span>Integration with Segmento Sense for complete data governance</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button size="lg" variant="outline" className="text-lg px-8">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" className="text-lg px-8">
                                Get Notified
                            </Button>
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <p className="text-sm text-muted-foreground mt-8">
                        Want early access? <Link href="/contact" className="text-primary hover:underline font-semibold">Contact our team</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
