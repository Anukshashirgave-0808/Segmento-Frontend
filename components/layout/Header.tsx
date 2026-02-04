"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"

type DropdownKey = "products" | "solutions" | "resources" | null

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const tabStyle =
    "px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"

  const dropdownBox =
    "absolute left-0 mt-3 w-60 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"

  const dropdownItem =
    "block px-5 py-3 text-sm text-gray-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all"

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-final.png"
              alt="Segmento"
              width={220}
              height={70}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className={tabStyle}>Home</Link>
            <Link href="/about" className={tabStyle}>About</Link>

            {/* PRODUCTS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("products")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${tabStyle} flex items-center gap-1`}>
                Products <ChevronDown size={16} />
              </button>

              {openDropdown === "products" && (
                <div className={dropdownBox}>
                  <Link href="/pulse" className={dropdownItem}>
                    Segmento Pulse
                  </Link>
                  <Link
                    href="/products/data-classification"
                    className={dropdownItem}
                  >
                    Segmento Sense
                  </Link>
                </div>
              )}
            </div>

            {/* SOLUTIONS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("solutions")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${tabStyle} flex items-center gap-1`}>
                Solutions <ChevronDown size={16} />
              </button>

              {openDropdown === "solutions" && (
                <div className={dropdownBox}>
                  {[
                    ["ecommerce", "eCommerce"],
                    ["finance", "Finance"],
                    ["healthcare", "Healthcare"],
                    ["higher-education", "Higher Education"],
                    ["manufacturing", "Manufacturing"],
                    ["telecommunication", "Telecommunication"],
                    ["media", "Media"],
                    ["banking", "Banking"],
                  ].map(([id, label]) => (
                    <Link
                      key={id}
                      href={`/solutions#${id}`}
                      className={dropdownItem}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* RESOURCES */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${tabStyle} flex items-center gap-1`}>
                Resources <ChevronDown size={16} />
              </button>

              {openDropdown === "resources" && (
                <div className={dropdownBox}>
                  <Link href="/blog" className={dropdownItem}>
                    Blog
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className={tabStyle}>Pricing</Link>
            <Link href="/careers" className={tabStyle}>Careers</Link>
            <Link href="/contact" className={tabStyle}>Contact</Link>
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:block px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl hover:scale-105 transition"
          >
            Get a Demo
          </Link>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-950 px-6 py-6 space-y-4">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Pricing", "/pricing"],
            ["Careers", "/careers"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
