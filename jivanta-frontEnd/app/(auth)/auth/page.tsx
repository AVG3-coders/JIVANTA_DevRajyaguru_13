"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft, ShieldCheck, Smartphone } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Hide global header/footer if they exist
    const header = document.querySelector(
      "header:not([data-auth-header])"
    ) as HTMLElement;
    const footer = document.querySelector("footer") as HTMLElement;

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    // Restore when component unmounts
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);
  // Handle phone number submission
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      // Move to OTP step
      setStep("otp");
      setLoading(false);
      // Start countdown for resend
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  // Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[0];
    }

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");

    // Basic validation
    if (otpValue.length !== 4) {
      setError("Please enter a valid OTP");
      return;
    }

    setLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      // For demo, let's say "1234" is the correct OTP
      if (otpValue === "1234") {
        // Successful login
        router.push("/account");
      } else {
        setError("Invalid OTP. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;

    setLoading(true);

    // Simulate API call to resend OTP
    setTimeout(() => {
      setLoading(false);
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-4 px-6 flex items-center">
        <Link href="/" className="flex items-center">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                {step === "phone" ? (
                  <Smartphone className="h-8 w-8 text-primary" />
                ) : (
                  <ShieldCheck className="h-8 w-8 text-primary" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {step === "phone" ? "Welcome to Jivanta" : "Verify Your Phone"}
            </h1>
            <p className="text-muted-foreground">
              {step === "phone"
                ? "Enter your phone number to continue"
                : `We've sent a code to ${phoneNumber}`}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full"></span>
                    Sending OTP...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Enter 4-digit OTP
                </label>
                <div className="flex justify-between gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-full text-xl text-center font-mono"
                      disabled={loading}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm"
                  disabled={countdown > 0 || loading}
                  onClick={handleResendOtp}
                >
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || otp.join("").length !== 4}
              >
                {loading ? (
                  <div className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full"></span>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Verify & Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep("phone");
                    setOtp(["", "", "", ""]);
                    setError("");
                  }}
                  className="text-sm"
                >
                  Change phone number
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
