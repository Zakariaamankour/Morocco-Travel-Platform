"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-semibold">Morocco</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/destinations" className="text-sm hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="/plan-trip" className="text-sm hover:text-primary transition-colors">
              Plan Trip
            </Link>
            <Link href="/community" className="text-sm hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/plan-trip">Start Planning</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/destinations"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                href="/plan-trip"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Trip
              </Link>
              <Link
                href="/community"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button asChild className="w-full">
                <Link href="/plan-trip" onClick={() => setIsMenuOpen(false)}>
                  Start Planning
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
