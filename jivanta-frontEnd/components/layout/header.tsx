import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full py-4 px-6 bg-primary/80 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MediShop
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-white/80 transition-colors">
            Products
          </Link>
          <Link href="/about" className="hover:text-white/80 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white/80 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="highlight" className="rounded-full">
              login/register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

