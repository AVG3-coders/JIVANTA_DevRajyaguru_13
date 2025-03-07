"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clipboard,
  FileText,
  RefreshCw,
  Bell,
  ArrowRight,
  Star,
  Search,
  Shield,
  Brain,
  Truck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/medicines?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--tertiary))] to-[hsl(var(--secondary))] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Healthcare Excellence
              </span>
              <h1 className="text-4xl md:text-5xl font-bold">
                "Bringing Pharma Closer to Small Clinics."
              </h1>
              <p className="text-lg opacity-90">
                Search our extensive database of medications or connect with
                healthcare experts for personalized advice.
              </p>

              {/* Medicine Search Form */}
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search for medicines..."
                    className="bg-white/20 border-white/30 pl-10 h-12 text-white placeholder:text-white/60 w-full rounded-full backdrop-blur-sm focus:ring-white/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="highlight"
                  size="lg"
                  className="rounded-full shadow-lg hover:shadow-xl transition-all h-12"
                >
                  Search <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  Popular:{" "}
                </span>
                <button
                  onClick={() => router.push("/medicines?search=paracetamol")}
                  className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Paracetamol
                </button>
                <button
                  onClick={() => router.push("/medicines?search=vitamin")}
                  className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Vitamins
                </button>
                <button
                  onClick={() => router.push("/medicines?search=antibiotics")}
                  className="text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Antibiotics
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white/20 shadow-lg">
                  <Image
                    src="/assets/Doctors.jpeg"
                    alt="Healthcare professionals"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-[hsl(var(--background))]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
              Jivanta – A Comprehensive B2B Healthcare Solution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Affordable, Fast & Smart Medicine Supply for Rural Healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-blue-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-blue-100">
                <Clipboard className="h-8 w-8 text-[hsl(var(--chart-2))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Direct Medicine Procurement
              </h3>
              <p className="text-muted-foreground">
                Eliminates middlemen, reducing costs for doctors & clinics
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-green-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-green-100">
                <Shield className="h-8 w-8 text-[hsl(var(--chart-3))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Verified Doctor & Pharmacy Network
              </h3>
              <p className="text-muted-foreground">
                Ensures only legitimate professionals can order
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-purple-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-purple-100">
                <Brain className="h-8 w-8 text-[hsl(var(--chart-1))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                AI-Powered Inventory & Reordering
              </h3>
              <p className="text-muted-foreground">
                Prevents shortages with smart forecasting
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-amber-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-amber-100">
                <Truck className="h-8 w-8 text-[hsl(var(--chart-4))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Fast & Reliable Delivery
              </h3>
              <p className="text-muted-foreground">
                Optimized logistics for Tier 3 cities & rural areas
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-sky-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-sky-100">
                <CreditCard className="h-8 w-8 text-[hsl(var(--chart-2))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Flexible Payments & Credit
              </h3>
              <p className="text-muted-foreground">
                UPI, bank transfers, and buy-now-pay-later for clinics
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-rose-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-rose-100">
                <ShieldCheck className="h-8 w-8 text-[hsl(var(--chart-3))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Regulatory Compliance & Security
              </h3>
              <p className="text-muted-foreground">
                Verified suppliers, encrypted transactions, and legal safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement Section */}
      <section className="py-24 px-6 bg-[hsl(var(--muted))]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
              Our Vision
            </span>
            <h2 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
              Team Vision Statement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to transforming healthcare accessibility in
              underserved regions
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg relative">
            <div className="text-6xl text-[hsl(var(--tertiary))] opacity-20 absolute top-4 left-4">
              "
            </div>
            <div className="text-6xl text-[hsl(var(--tertiary))] opacity-20 absolute bottom-4 right-4">
              "
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 bg-gradient-to-br from-[hsl(var(--tertiary))] to-[hsl(var(--secondary))] rounded-full mb-8 flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="Jivanta Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-[hsl(var(--primary))]">
                At Jivanta, our vision is to revolutionize healthcare
                accessibility in Tier 3 cities by bridging the gap between
                patients and trusted medical professionals. We are committed to
                empowering doctors with cutting-edge digital solutions while
                ensuring patients receive authentic, reliable, and seamless
                healthcare services. Our mission is to create a future where
                quality healthcare is just a click away, no matter where you
                live.
              </p>

              <div className="flex items-center justify-center">
                <span className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--tertiary))] to-[hsl(var(--secondary))] text-transparent bg-clip-text">
                  🚀 Bringing Healthcare To Everyone, Everywhere
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Authentic Medicine</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Rural Access</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm">Digital Healthcare</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Doctor Empowerment</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-10 border border-[hsl(var(--border))]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="order-2 md:order-1">
                <span className="inline-block px-3 md:px-4 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-3 md:mb-4">
                  About Us
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[hsl(var(--primary))]">
                  Our Story
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mb-5 md:mb-6">
                  Growing up in a Tier 3 village, I saw my father, a dedicated
                  doctor, struggle to provide healthcare to those in need.
                  Inspired by his vision and my passion for technology, I
                  founded Jivanta to bridge this gap. We empower rural
                  communities with accessible, reliable, and tech-driven
                  healthcare solutions, ensuring quality medical care for
                  everyone, anytime, anywhere. 🚀
                </p>
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">
                  Why Jivanta?
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[hsl(var(--chart-2))] flex items-center justify-center mr-3">
                      <svg
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm md:text-base font-medium">
                        Designed for Tier 3 cities & villages
                      </span>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Bringing quality healthcare to rural areas
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[hsl(var(--chart-2))] flex items-center justify-center mr-3">
                      <svg
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm md:text-base font-medium">
                        Certified healthcare professionals
                      </span>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Connecting patients with trusted doctors
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[hsl(var(--chart-2))] flex items-center justify-center mr-3">
                      <svg
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm md:text-base font-medium">
                        24/7 accessibility
                      </span>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Healthcare assistance whenever you need it
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Rest of the About section remains unchanged */}
              <div className="bg-[hsl(var(--muted))] rounded-lg md:rounded-xl p-6 md:p-8 order-1 md:order-2 mb-6 md:mb-0">
                <span className="inline-block px-3 md:px-4 py-1 bg-white text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-3 md:mb-4">
                  Contact Us
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[hsl(var(--primary))]">
                  Get In Touch
                </h3>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex flex-wrap items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center mr-3 md:mr-4 shadow-sm mb-2 md:mb-0">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--tertiary))]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm md:text-base break-all">
                    phoniex3.connect@gmail.com
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center mr-3 md:mr-4 shadow-sm mb-2 md:mb-0">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--tertiary))]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">
                      +91 6351574624
                    </span>
                  </div>
                  <div className="flex flex-wrap items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center mr-3 md:mr-4 shadow-sm mt-1">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--tertiary))]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm md:text-base flex-1  items-center ">
                      RAJKOT, GUJARAT, INDIA
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="highlight"
                    size="lg"
                    className="rounded-full flex-1"
                  >
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full flex-1 bg-white/90 hover:bg-white border-[hsl(var(--tertiary))]"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
