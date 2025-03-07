"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Target, Users, Zap, CheckCircle2, BadgeCheck } from 'lucide-react';

const AboutProject = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[hsl(var(--tertiary))] to-[hsl(var(--secondary))] py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Bringing pharmaceutical accessibility to every corner of healthcare
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block px-3 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Bridging the Healthcare Gap</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our platform was built to bridge the gap between medicine manufacturers and healthcare providers. 
                We provide a seamless, tech-driven solution for supplying medicines efficiently, ensuring timely 
                availability for pharmacies, hospitals, and clinics.
              </p>
              <div className="flex items-center text-[hsl(var(--tertiary))]">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">Connecting suppliers and providers since 2023</span>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-8 border-white shadow-xl">
                <Image
                  src="/assets/about-who-we-are.jpg"
                  alt="Healthcare professionals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Revolutionizing Pharmaceutical Supply</h2>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize the pharmaceutical supply chain by making medicine procurement faster, 
              more transparent, and cost-effective.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 z-10"></div>
              <Image 
                src="/assets/about-vision.jpg" 
                alt="Our vision for healthcare" 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
                <Target className="h-12 w-12 mb-4 opacity-90" />
                <blockquote className="text-xl md:text-2xl font-medium italic max-w-2xl">
                  "Creating a future where quality healthcare is just a click away, no matter where you live."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
              Our Goals
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Aim to Achieve</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're on a mission to transform how medicines reach healthcare providers and ultimately patients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empower Suppliers</h3>
              <p className="text-gray-600">
                With real-time order management and analytics to optimize their distribution networks.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Inventory management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Order tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Performance analytics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ensure Availability</h3>
              <p className="text-gray-600">
                Of essential medicines without delays, especially in underserved areas.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Rural distribution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Predictive stocking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Emergency fulfillment</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simplify Procurement</h3>
              <p className="text-gray-600">
                For healthcare providers through a digital-first approach and intuitive interface.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">One-click ordering</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Automated reordering</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Mobile accessibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Project Section */}
      <section className="py-16 md:py-20 bg-[hsl(var(--muted))]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-white text-[hsl(var(--tertiary))] rounded-full text-sm font-medium mb-4">
                Why This Project?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Solving Critical Healthcare Challenges</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Traditional medicine supply chains are often slow and inefficient. Our platform leverages technology 
                to optimize ordering, reduce wastage, and create a streamlined experience for both suppliers and buyers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-[hsl(var(--tertiary))] font-bold text-xl mb-2">85%</div>
                  <p className="text-sm text-gray-600">Reduction in order processing time</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-[hsl(var(--tertiary))] font-bold text-xl mb-2">60%</div>
                  <p className="text-sm text-gray-600">More transparent pricing</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-[hsl(var(--tertiary))] font-bold text-xl mb-2">40%</div>
                  <p className="text-sm text-gray-600">Decrease in medicine shortages</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-[hsl(var(--tertiary))] font-bold text-xl mb-2">100%</div>
                  <p className="text-sm text-gray-600">Digital documentation and tracking</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image 
                    src="/assets/about-why-1.jpg" 
                    alt="Healthcare improvement" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden mt-8">
                  <Image 
                    src="/assets/about-why-2.jpg" 
                    alt="Digital healthcare" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Image 
                    src="/assets/about-why-3.jpg" 
                    alt="Medicine supply" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden mt-8">
                  <Image 
                    src="/assets/about-why-4.jpg" 
                    alt="Healthcare technology" 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Healthcare Revolution</h2>
            <p className="text-gray-700 mb-8">
              Whether you're a pharmaceutical supplier or a healthcare provider, our platform is designed to make 
              your operations more efficient and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-[hsl(var(--secondary))] text-white font-medium rounded-md hover:bg-[hsl(var(--secondary-foreground))] transition-colors">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-[hsl(var(--secondary))] font-medium rounded-md border border-[hsl(var(--secondary))] hover:bg-gray-50 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutProject;
