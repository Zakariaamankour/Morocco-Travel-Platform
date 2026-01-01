import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-serif font-semibold">Morocco</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the magic of Morocco with curated travel experiences and local insights.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/destinations/marrakech" className="hover:text-primary transition-colors">
                  Marrakech
                </Link>
              </li>
              <li>
                <Link href="/destinations/chefchaouen" className="hover:text-primary transition-colors">
                  Chefchaouen
                </Link>
              </li>
              <li>
                <Link href="/destinations/fes" className="hover:text-primary transition-colors">
                  Fes
                </Link>
              </li>
              <li>
                <Link href="/destinations/sahara-desert" className="hover:text-primary transition-colors">
                  Sahara Desert
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/plan-trip" className="hover:text-primary transition-colors">
                  AI Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: hello@morocco.travel</li>
              <li>Support: support@morocco.travel</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Morocco Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
