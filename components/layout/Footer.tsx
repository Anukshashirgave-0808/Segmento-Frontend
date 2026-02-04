import Link from "next/link"
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Github,
} from "lucide-react"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    fill="currentColor"
  >
    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
  </svg>
)

export function Footer() {
  const iconStyle =
    "h-5 w-5 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-110 transition"

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Segmento</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Privacy-first, AI-driven data products that solve real enterprise
              challenges. Secure. Intelligent. Scalable.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/pulse">Segmento Pulse</Link></li>
              <li><Link href="/products/data-classification">Segmento Sense</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Social</h4>
            <div className="flex flex-wrap gap-4">
              <Twitter className={iconStyle} />
              <Linkedin className={iconStyle} />
              <Youtube className={iconStyle} />
              <Instagram className={iconStyle} />
              <Facebook className={iconStyle} />
              <Github className={iconStyle} />
              <TikTokIcon className={iconStyle} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          Segmento © 2025. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
