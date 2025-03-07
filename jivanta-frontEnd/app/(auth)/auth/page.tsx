"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building,
  FileText,
  ShieldCheck,
  Stethoscope,
  Pill,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"doctor" | "supplier" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Doctor registration form state
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    licenseNumber: "",
    degree: "",
    specialization: "",
  });

  // Supplier registration form state
  const [supplierForm, setSupplierForm] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    registrationNumber: "",
    gstNumber: "",
    drugLicenseNumber: "",
    cdscoNumber: "",
  });

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  // Handle doctor form input changes
  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorForm({
      ...doctorForm,
      [name]: value,
    });
  };

  // Handle supplier form input changes
  const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierForm({
      ...supplierForm,
      [name]: value,
    });
  };

  // Handle login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Simulate login API call
    setTimeout(() => {
      // In a real app, this would be an API call to validate credentials
      if (loginForm.email && loginForm.password) {
        // Success path - redirect based on user type
        if (loginForm.email.includes("doctor")) {
          router.push("/doctor_dashboard");
        } else {
          router.push("/supplier_dashboard");
        }
      } else {
        setErrorMessage("Please enter both email and password");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Handle doctor registration
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Basic validation
    if (doctorForm.password !== doctorForm.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate registration API call
    setTimeout(() => {
      // Success message and redirect to login
      setSuccessMessage(
        "Registration successful! Please verify your email before logging in."
      );
      setIsLoading(false);

      // Reset form and switch to login after 3 seconds
      setTimeout(() => {
        setAuthMode("login");
        setSuccessMessage("");
        setDoctorForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          licenseNumber: "",
          degree: "",
          specialization: "",
        });
      }, 3000);
    }, 1500);
  };

  // Handle supplier registration
  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Basic validation
    if (supplierForm.password !== supplierForm.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate registration API call
    setTimeout(() => {
      // Success message and redirect to login
      setSuccessMessage(
        "Registration successful! Your account is under review. We'll notify you once approved."
      );
      setIsLoading(false);

      // Reset form and switch to login after 3 seconds
      setTimeout(() => {
        setAuthMode("login");
        setSuccessMessage("");
        setSupplierForm({
          companyName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          registrationNumber: "",
          gstNumber: "",
          drugLicenseNumber: "",
          cdscoNumber: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-[hsl(var(--tertiary))] to-[hsl(var(--secondary))] p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-xl">J</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Jivanta Healthcare</h2>
            <p className="mt-1 opacity-80">
              Medical Excellence for Rural Communities
            </p>
          </div>

          <div className="p-6">
            {/* Success message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Auth mode selector */}
            <Tabs
              defaultValue={authMode}
              value={authMode}
              onValueChange={(value) =>
                setAuthMode(value as "login" | "register")
              }
              className="w-full mb-6"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4 mt-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="pl-10"
                        placeholder="you@example.com"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-[hsl(var(--tertiary))] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="pl-10"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                {userType === null ? (
                  <div className="pt-4">
                    <p className="text-center font-medium mb-6">
                      I am registering as a:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserType("doctor")}
                        className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Stethoscope className="h-10 w-10 text-[hsl(var(--tertiary))] mb-3" />
                        <span className="text-lg font-medium">Doctor</span>
                        <span className="text-xs text-gray-500 mt-1">
                          For medical professionals
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUserType("supplier")}
                        className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Pill className="h-10 w-10 text-[hsl(var(--secondary))] mb-3" />
                        <span className="text-lg font-medium">Supplier</span>
                        <span className="text-xs text-gray-500 mt-1">
                          For pharma companies
                        </span>
                      </button>
                    </div>
                  </div>
                ) : userType === "doctor" ? (
                  <div>
                    <div className="flex items-center mb-6 mt-4">
                      <button
                        onClick={() => setUserType(null)}
                        className="text-sm text-gray-500 hover:underline flex items-center"
                      >
                        ← Back
                      </button>
                      <h3 className="text-lg font-medium text-center flex-grow">
                        Doctor Registration
                      </h3>
                    </div>

                    <form onSubmit={handleDoctorSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="doctorName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="doctorName"
                            name="name"
                            type="text"
                            required
                            className="pl-10"
                            placeholder="Dr. Jane Doe"
                            value={doctorForm.name}
                            onChange={handleDoctorChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="doctorEmail"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="doctorEmail"
                              name="email"
                              type="email"
                              required
                              className="pl-10"
                              placeholder="doctor@example.com"
                              value={doctorForm.email}
                              onChange={handleDoctorChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="doctorPhone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="doctorPhone"
                              name="phone"
                              type="tel"
                              required
                              className="pl-10"
                              placeholder="+91 9876543210"
                              value={doctorForm.phone}
                              onChange={handleDoctorChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="doctorLicense"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Medical License Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="doctorLicense"
                            name="licenseNumber"
                            type="text"
                            required
                            className="pl-10"
                            placeholder="MCI-12345-A"
                            value={doctorForm.licenseNumber}
                            onChange={handleDoctorChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="doctorDegree"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Degree <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="doctorDegree"
                            name="degree"
                            type="text"
                            required
                            placeholder="MBBS, MD, etc."
                            value={doctorForm.degree}
                            onChange={handleDoctorChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="doctorSpecialization"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Specialization{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="doctorSpecialization"
                            name="specialization"
                            type="text"
                            required
                            placeholder="Cardiology, General, etc."
                            value={doctorForm.specialization}
                            onChange={handleDoctorChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="doctorPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="doctorPassword"
                              name="password"
                              type="password"
                              required
                              className="pl-10"
                              placeholder="••••••••"
                              value={doctorForm.password}
                              onChange={handleDoctorChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="doctorConfirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="doctorConfirmPassword"
                              name="confirmPassword"
                              type="password"
                              required
                              className="pl-10"
                              placeholder="••••••••"
                              value={doctorForm.confirmPassword}
                              onChange={handleDoctorChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Registering..." : "Register as Doctor"}
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-4">
                        By registering, you agree to our Terms of Service and
                        Privacy Policy. Your medical license will be verified
                        before account activation.
                      </p>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center mb-6 mt-4">
                      <button
                        onClick={() => setUserType(null)}
                        className="text-sm text-gray-500 hover:underline flex items-center"
                      >
                        ← Back
                      </button>
                      <h3 className="text-lg font-medium text-center flex-grow">
                        Supplier Registration
                      </h3>
                    </div>

                    <form onSubmit={handleSupplierSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            className="pl-10"
                            placeholder="PharmaLife Ltd."
                            value={supplierForm.companyName}
                            onChange={handleSupplierChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="supplierEmail"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Business Email{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="supplierEmail"
                              name="email"
                              type="email"
                              required
                              className="pl-10"
                              placeholder="business@company.com"
                              value={supplierForm.email}
                              onChange={handleSupplierChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="supplierPhone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Business Phone{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="supplierPhone"
                              name="phone"
                              type="tel"
                              required
                              className="pl-10"
                              placeholder="+91 9876543210"
                              value={supplierForm.phone}
                              onChange={handleSupplierChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="regNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Company Registration No.{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="regNumber"
                            name="registrationNumber"
                            type="text"
                            required
                            placeholder="CIN123456789"
                            value={supplierForm.registrationNumber}
                            onChange={handleSupplierChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="gstNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            GST Number <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="gstNumber"
                            name="gstNumber"
                            type="text"
                            required
                            placeholder="22AAAAA0000A1Z5"
                            value={supplierForm.gstNumber}
                            onChange={handleSupplierChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="drugLicense"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Drug License Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="drugLicense"
                            name="drugLicenseNumber"
                            type="text"
                            required
                            placeholder="MH-BLO-123456"
                            value={supplierForm.drugLicenseNumber}
                            onChange={handleSupplierChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cdscoNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            CDSCO Registration{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="cdscoNumber"
                            name="cdscoNumber"
                            type="text"
                            required
                            placeholder="CDSCO-12345-AB"
                            value={supplierForm.cdscoNumber}
                            onChange={handleSupplierChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="supplierPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="supplierPassword"
                              name="password"
                              type="password"
                              required
                              className="pl-10"
                              placeholder="••••••••"
                              value={supplierForm.password}
                              onChange={handleSupplierChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="supplierConfirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="supplierConfirmPassword"
                              name="confirmPassword"
                              type="password"
                              required
                              className="pl-10"
                              placeholder="••••••••"
                              value={supplierForm.confirmPassword}
                              onChange={handleSupplierChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading
                            ? "Registering..."
                            : "Register as Supplier"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                        <ShieldCheck className="h-4 w-4 mr-1 text-gray-400" />
                        <span>
                          Your registration will be verified before approval.
                        </span>
                      </div>
                    </form>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-500">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-[hsl(var(--tertiary))] hover:underline font-medium"
                  >
                    Create one now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-[hsl(var(--tertiary))] hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

