import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Clipboard,
  FileText,
  RefreshCw,
  Bell,
  ArrowRight,
  Star,
} from "lucide-react";

export default function Home() {
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
                Hire your best consultant, make dream true
              </h1>
              <p className="text-lg opacity-90">
                Connecting to healthcare experts is a click away. Get
                personalized medical advice from professionals.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="highlight"
                  size="lg"
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30 transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white/20 shadow-lg">
                  <Image
                    src="/placeholder.svg?height=320&width=320"
                    alt="Healthcare professionals"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -right-6 -bottom-6 bg-white rounded-full p-3 shadow-lg">
                  <Star className="h-8 w-8 text-[hsl(var(--chart-4))]" />
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
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide professional healthcare services to meet all your
              medical needs with expert care and attention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-blue-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-blue-100">
                <Clipboard className="h-8 w-8 text-[hsl(var(--chart-2))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-muted-foreground">
                Professional health assessment and diagnosis from certified
                doctors
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-green-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-green-100">
                <FileText className="h-8 w-8 text-[hsl(var(--chart-3))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Application Preparation
              </h3>
              <p className="text-muted-foreground">
                Assistance with medical forms and insurance applications
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-purple-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-purple-100">
                <RefreshCw className="h-8 w-8 text-[hsl(var(--chart-1))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Documentation Review
              </h3>
              <p className="text-muted-foreground">
                Thorough review of medical records and prescription details
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-amber-200/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-amber-100">
                <Bell className="h-8 w-8 text-[hsl(var(--chart-4))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Updates and Reports
              </h3>
              <p className="text-muted-foreground">
                Regular health updates and comprehensive medical reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 bg-[hsl(var(--muted))]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
              Our Trusted Client Says
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear what our clients have to say about their experience with our
              healthcare services
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-lg relative">
            <div className="text-6xl text-[hsl(var(--tertiary))] opacity-20 absolute top-4 left-4">
              "
            </div>
            <div className="text-6xl text-[hsl(var(--tertiary))] opacity-20 absolute bottom-4 right-4">
              "
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[hsl(var(--muted))] shadow-md">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt="Client"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[hsl(var(--chart-4))] text-[hsl(var(--chart-4))]"
                    />
                  ))}
                </div>
                <p className="text-lg mb-6">
                  "Jivanta has transformed how I manage my healthcare needs.
                  Their consultants are professional, and the service is prompt.
                  I highly recommend their services to anyone looking for
                  quality healthcare solutions."
                </p>
                <div>
                  <h4 className="font-semibold text-[hsl(var(--primary))]">
                    John Smith
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Regular Customer
                  </p>
                </div>
              </div>
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
                  Founded in 2020, Jivanta has been committed to revolutionizing
                  healthcare access through technology. Our team of healthcare
                  professionals and tech experts work together to provide you
                  with the best service.
                </p>
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
                    <span className="text-sm md:text-base">
                      Certified healthcare professionals
                    </span>
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
                    <span className="text-sm md:text-base">
                      24/7 customer support
                    </span>
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
                    <span className="text-sm md:text-base">
                      Trusted by thousands of clients
                    </span>
                  </li>
                </ul>
              </div>
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
                      support@Jivanta.com
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
                      +1 (555) 123-4567
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
                    <span className="text-sm md:text-base flex-1">
                      123 Health Street, Medical District, NY 10001
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
