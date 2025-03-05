import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Clipboard, FileText, RefreshCw, Bell, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Hire your best consultant, make dream true</h1>
              <p className="text-lg opacity-90">
                Connecting to healthcare experts is a click away. Get personalized medical advice from professionals.
              </p>
              <div className="flex gap-4">
                <Button variant="highlight" size="lg" className="rounded-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white/20">
                  <Image
                    src="/placeholder.svg?height=320&width=320"
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
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions to meet all your medical needs with professional care and
              attention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Clipboard className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Professional health assessment and diagnosis from certified doctors
              </p>
            </div>

            <div className="bg-green-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Application preparation</h3>
              <p className="text-sm text-muted-foreground">Assistance with medical forms and insurance applications</p>
            </div>

            <div className="bg-purple-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <RefreshCw className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Documentation review</h3>
              <p className="text-sm text-muted-foreground">
                Thorough review of medical records and prescription details
              </p>
            </div>

            <div className="bg-orange-100 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Bell className="h-8 w-8 text-highlight" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Updates and reports</h3>
              <p className="text-sm text-muted-foreground">Regular health updates and comprehensive medical reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Trusted Client Says</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear what our clients have to say about their experience with our healthcare services
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-secondary/10 rounded-lg p-8 relative">
            <div className="text-4xl text-secondary opacity-30 absolute top-4 left-4">"</div>
            <div className="text-4xl text-secondary opacity-30 absolute bottom-4 right-4">"</div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Client"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg mb-4">
                  "MediShop has transformed how I manage my healthcare needs. Their consultants are professional, and
                  the service is prompt. I highly recommend their services to anyone looking for quality healthcare
                  solutions."
                </p>
                <div>
                  <h4 className="font-semibold">John Smith</h4>
                  <p className="text-sm text-muted-foreground">Regular Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8 text-primary">About Us & Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">Our Story</h3>
                <p className="mb-4">
                  Founded in 2020, MediShop has been committed to revolutionizing healthcare access through technology.
                  Our team of healthcare professionals and tech experts work together to provide you with the best
                  service.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">Contact Us</h3>
                <p className="mb-2">Email: support@medishop.com</p>
                <p className="mb-2">Phone: +1 (555) 123-4567</p>
                <p className="mb-4">Address: 123 Health Street, Medical District, NY 10001</p>
                <Button variant="highlight" className="rounded-full">
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

