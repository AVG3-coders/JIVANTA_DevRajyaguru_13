"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Minus, Plus, ShoppingCart, CheckCircle, ChevronLeft,
  AlertCircle, Clock, Info, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Mock medicine database
const medicines = {
  "paracetamol-500": {
    id: "paracetamol-500",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    brand: "MediCorp",
    price: 9.99,
    category: "Pain Reliever",
    prescription: false,
    activeIngredients: "Acetaminophen 500mg",
    description:
      "Paracetamol is a medication used to treat fever and mild to moderate pain. At a standard dose, paracetamol only slightly decreases body temperature. It is often sold in combination with other medications, such as in many cold medications.",
    images: [
      "/assets/products/paracetamol-1.jpg",
      "/assets/products/paracetamol-2.jpg",
      "/assets/products/paracetamol-3.jpg",
      "/assets/products/paracetamol-4.jpg",
    ],
    dosage: "Adults: 1-2 tablets every 4-6 hours as needed, not exceeding 8 tablets in 24 hours",
    usage: "Take with a full glass of water. Can be taken with or without food.",
    storage: "Store at room temperature away from moisture and heat (15-30°C)",
    warnings: "Do not exceed recommended dose. Avoid alcohol. Consult doctor if symptoms persist for more than 3 days.",
    sideEffects: "Rare side effects may include nausea, stomach pain, and allergic reactions.",
    interactions: "May interact with warfarin and liver medications. Consult your doctor if taking other medications.",
    reviews: [
      {
        name: "John Doe",
        initials: "JD",
        rating: 4,
        comment: "Works great for headaches and fever. I always keep this in my medicine cabinet.",
        date: "2023-12-15"
      },
      {
        name: "Sarah M.",
        initials: "SM",
        rating: 5,
        comment: "Very effective and fast-acting. Helps with my occasional migraines.",
        date: "2024-01-20"
      },
    ],
    alternatives: ["ibuprofen-400", "aspirin-325"]
  },
  "ibuprofen-400": {
    id: "ibuprofen-400",
    name: "Ibuprofen 400mg",
    genericName: "Ibuprofen",
    brand: "HealthPlus",
    price: 11.50,
    category: "NSAID Pain Reliever",
    prescription: false,
    activeIngredients: "Ibuprofen 400mg",
    description:
      "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that reduces hormones causing inflammation and pain in the body. It's used to reduce fever and treat pain or inflammation.",
    images: [
      "/assets/products/placeholder.jpg",
    ],
    dosage: "Adults: 1 tablet every 6-8 hours as needed, not exceeding 3 tablets in 24 hours",
    usage: "Take with food or milk to prevent stomach upset",
    storage: "Store at room temperature away from moisture",
    warnings: "May increase risk of heart attack or stroke. Not recommended for use during pregnancy.",
    sideEffects: "May cause stomach pain, heartburn, nausea, headache, dizziness",
    interactions: "Interacts with aspirin, blood thinners, and some blood pressure medications",
    reviews: [
      {
        name: "Michael J.",
        initials: "MJ",
        rating: 4,
        comment: "Works well for my back pain and inflammation. Takes about 30 minutes to kick in.",
        date: "2023-11-05"
      }
    ],
    alternatives: ["paracetamol-500", "aspirin-325"]
  }
};

export default function MedicinePage() {
  const params = useParams();
  const router = useRouter();
  const medicineId = params?.id as string;

  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "warnings">("info");

  // Fetch medicine data
  useEffect(() => {
    setLoading(true);

    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const foundMedicine = medicines[medicineId as keyof typeof medicines];
      if (foundMedicine) {
        setMedicine(foundMedicine);
      } else {
        // Medicine not found, redirect to medicines page
        router.push("/medicines");
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [medicineId, router]);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Handle buy now
  const handleBuyNow = () => {
    localStorage.setItem(
      "checkoutItems",
      JSON.stringify([
        {
          id: medicine.id,
          name: medicine.name,
          quantity: quantity,
          price: medicine.price,
          image: medicine.images[0] || "/placeholder.svg",
        },
      ])
    );
    router.push("/checkout");
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Get existing cart
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if medicine already in cart
    const existingItemIndex = cartItems.findIndex(
      (item: any) => item.id === medicine.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if medicine already in cart
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new medicine to cart
      cartItems.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.images[0] || "/placeholder.svg",
        quantity: quantity,
      });
    }

    // Save updated cart
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Show success message
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary/10 p-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  // No medicine found
  if (!medicine) {
    return (
      <div className="min-h-screen bg-primary/10 p-4">
        <div className="container mx-auto max-w-4xl text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Medicine Not Found</h1>
          <p className="mb-6">
            The medicine you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/medicines">
            <Button>Browse Medicines</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Medicines
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Medicine Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {medicine.images && medicine.images.length > 0 ? (
                  <Image
                    src={medicine.images[selectedImage] || "/placeholder.svg"}
                    alt={medicine.name}
                    width={400}
                    height={400}
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="text-muted-foreground">Medicine Photo</span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {medicine.images &&
                  medicine.images.map((img: string, index: number) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gray-100 rounded-md cursor-pointer overflow-hidden ${
                        selectedImage === index
                          ? "ring-2 ring-primary"
                          : "hover:ring-2 hover:ring-primary/50"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${medicine.name} thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Medicine Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h1 className="text-2xl font-bold">{medicine.name}</h1>
                  {medicine.prescription ? (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                      Prescription Required
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-medium">
                      Over-the-Counter
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Generic Name: {medicine.genericName}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                    {medicine.category}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Brand: {medicine.brand}
                  </span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-md">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{medicine.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Active Ingredients</h3>
                <p className="text-sm bg-gray-50 p-2 rounded">{medicine.activeIngredients}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price</h3>
                <p className="text-2xl font-bold text-highlight">
                  ${medicine.price.toFixed(2)}
                </p>
                {medicine.price > 30 && (
                  <p className="text-xs text-green-600 mt-1">
                    Free shipping on this item!
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-1 border rounded-md min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm mb-4">
                  Total price:{" "}
                  <span className="font-semibold">
                    ${medicine.price.toFixed(2)}
                  </span>{" "}
                  × <span className="font-semibold">{quantity}</span> ={" "}
                  <span className="font-bold text-highlight">
                    ${(medicine.price * quantity).toFixed(2)}
                  </span>
                </p>

                <div className="flex flex-col space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full rounded-full"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>

                  <Button
                    variant="outline"
                    className={`w-full rounded-full ${
                      addedToCart
                        ? "bg-green-50 text-green-600 border-green-200"
                        : ""
                    }`}
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                  >
                    {addedToCart ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" /> Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed medicine information */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b">
            <div className="flex">
              <button 
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'info' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('info')}
              >
                <span className="flex items-center gap-1">
                  <Info className="h-4 w-4" /> Medicine Information
                </span>
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'warnings' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('warnings')}
              >
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> Warnings & Side Effects
                </span>
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('reviews')}
              >
                <span className="flex items-center gap-1">
                  <span className="text-xs font-bold bg-muted rounded-full w-4 h-4 inline-flex items-center justify-center">{medicine.reviews?.length || 0}</span> Reviews
                </span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Usage Information</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium mb-1">Dosage</p>
                        <p>{medicine.dosage}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium mb-1">How to Take</p>
                        <p>{medicine.usage}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium mb-1">Storage</p>
                        <p>{medicine.storage}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">When to Consult Doctor</p>
                        </div>
                        <p>If symptoms persist for more than 3 days or worsen</p>
                      </div>
                    </div>
                  </div>
                </div>

                {medicine.alternatives && medicine.alternatives.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Alternative Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {medicine.alternatives.map((altId: string) => {
                        const alt = medicines[altId as keyof typeof medicines];
                        return alt ? (
                          <Link 
                            href={`/product/${alt.id}`}
                            key={alt.id}
                            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md"
                          >
                            <div className="h-12 w-12 bg-white rounded flex items-center justify-center mr-3">
                              <Image 
                                src={alt.images?.[0] || "/placeholder.svg"} 
                                alt={alt.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{alt.name}</p>
                              <p className="text-xs text-muted-foreground">${alt.price.toFixed(2)}</p>
                            </div>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'warnings' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-100 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <h3 className="font-semibold">Important Warnings</h3>
                  </div>
                  <p className="text-sm">{medicine.warnings}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Side Effects</h3>
                  <p className="text-sm p-3 bg-gray-50 rounded-md">{medicine.sideEffects}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Drug Interactions</h3>
                  <p className="text-sm p-3 bg-gray-50 rounded-md">{medicine.interactions}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md text-sm">
                  <p>Always consult with a healthcare professional before starting any new medication, especially if you have existing medical conditions or are taking other medications.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {medicine.reviews && medicine.reviews.length > 0 ? (
                    medicine.reviews.map((review: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-md"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">
                              {review.initials}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">{review.name}</p>
                              {review.date && (
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              )}
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "text-highlight"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground bg-gray-50 rounded-lg">
                      <p>No reviews yet for this medicine</p>
                      <p className="text-sm mt-2">Be the first to leave a review!</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="rounded-full">
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}