"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (example implementation)
  useEffect(() => {
    // This is a placeholder - replace with your actual auth check
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="w-full py-3 px-6 bg-primary/80 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image src="/assets/logo.png" alt="Jivanta" width={125} height={50} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <Link
            href="/medicines"
            className="hover:text-white/80 transition-colors"
          >
            Medicines
          </Link>
          <Link
            href="/about_project"
            className="hover:text-white/80 transition-colors"
          >
            About Project
          </Link>
          <Link
            href="/about_us"
            className="hover:text-white/80 transition-colors"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Account button for logged-in users */}
              <Link href="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-10 h-10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          ) : (
            /* Login/Register button for guests */
            <Link href="/auth">
              <Button variant="highlight" className="rounded-full">
                Login/Register
              </Button>
            </Link>
          )}

          {/* Cart button always visible */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {isLoggedIn ? "3" : "0"}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
