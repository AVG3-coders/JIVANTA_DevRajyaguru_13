import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t buttom-0 ">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About Jivanta Project */}
          <div>

            <div className="bg-green-900 rounded-md my-2 w-fit"><Image src="assets/logo.png" alt="Jivanta"  width={125} height={50} /></div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Jivanta is a healthcare platform designed to connect patients with medical 
              professionals and provide easy access to medicine information. Our mission is to 
              make healthcare more accessible and transparent for everyone.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm">
                  123 Healthcare Avenue, Medical District<br />
                  San Francisco, CA 94103
                </span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-primary" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">support@jivanta.com</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Link href="https://github.com/jivanta" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/company/jivanta" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          {/* Team Section */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our AVG-3 Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h4 className="font-medium">Dev Rajyaguru</h4>
                <p className="text-sm text-muted-foreground">Lead Developer</p>
                <Link href="mailto:varun@example.com" className="text-sm flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Link>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Mihir Maru</h4>
                <p className="text-sm text-muted-foreground">Backend Developer</p>
                <Link href="mailto:alex@example.com" className="text-sm flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Link>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Dhananjay Karena</h4>
                <p className="text-sm text-muted-foreground">Backend Developer </p>
                <Link href="mailto:sophia@example.com" className="text-sm flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Link>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium">Varun Bhogayta</h4>
                <p className="text-sm text-muted-foreground">Frontend Developer</p>
                <Link href="mailto:michael@example.com" className="text-sm flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <h4 className="font-medium mb-2">Project Resources</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/about_project" className="text-sm text-primary hover:underline">About Project</Link>
                <Link href="/documentation" className="text-sm text-primary hover:underline">Documentation</Link>
                <Link href="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Jivanta Healthcare Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}