"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock product data
const initialCartItems = [
  {
    id: "med-1",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    image: "/placeholder.svg",
    price: 29.99,
    quantity: 1,
    dosage: "500mg",
    instructions: "Take 1 tablet three times daily after meals",
  },
  {
    id: "med-2",
    name: "Lisinopril",
    genericName: "Lisinopril Dihydrate",
    image: "/placeholder.svg",
    price: 19.5,
    quantity: 2,
    dosage: "10mg",
    instructions: "Take 1 tablet daily in the morning",
  },
  {
    id: "med-3",
    name: "Vitamin D3",
    genericName: "Cholecalciferol",
    image: "/placeholder.svg",
    price: 12.99,
    quantity: 1,
    dosage: "1000 IU",
    instructions: "Take 1 capsule daily with food",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate cart summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary/5 p-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Link href="/medicines">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
                    {/* Product Image */}
                    <div className="md:col-span-3 aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                      <div>
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.genericName}
                        </p>
                        <div className="text-sm bg-primary/10 p-2 rounded-md mb-2">
                          <p className="font-medium">Dosage: {item.dosage}</p>
                          <p>{item.instructions}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-1 border rounded-md min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full ml-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4">
                        <p className="font-medium">
                          Price (Total):{" "}
                          <span className="text-highlight">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Responsive: This billing info only shows on mobile */}
                    <div className="md:hidden bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Item Summary</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Price per unit:</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex justify-between font-semibold">
                            <span>Item Total:</span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Full cart summary shown on the right */}
                    <div className="hidden md:block md:col-span-4 bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-4">Billing</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>
                            {shipping === 0
                              ? "Free"
                              : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span className="text-highlight">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full summary for mobile (shown at bottom) */}
            <div className="md:hidden bg-white rounded-lg shadow-md overflow-hidden mt-4 p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items):
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-highlight">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-between items-center bg-white rounded-lg shadow-md mt-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50
                </p>
                <p className="font-medium">
                  Total:{" "}
                  <span className="text-highlight">${total.toFixed(2)}</span>
                </p>
              </div>
              <Link href="/checkout">
                <Button className="rounded-full">Place Order</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <Link href="/medicines">
              <Button className="rounded-full">Browse Medicines</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
