"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCart,
  formatPrice,
  calculateTax,
  calculateShipping,
  calculateTotal,
  requiresPrescription,
} from "@/lib/cart";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } =
    useCart();
  const [loading, setLoading] = useState(true);

  // Calculate order values
  const subtotal = getSubtotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);
  const needsPrescription = requiresPrescription(items);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleIncreaseQuantity = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecreaseQuantity = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    } else {
      removeItem(id);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm("Remove this item from your cart?")) {
      removeItem(id);
    }
  };

  const handleCheckout = () => {
    // For prescription medicines, verify prescription first
    if (needsPrescription) {
      router.push("/checkout/prescription");
    } else {
      router.push("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Loading your cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex h-20 w-20 rounded-full bg-gray-100 items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <Link href="/medicines">
              <Button size="lg" className="px-8">
                Browse Medicines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/medicines"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold">
            Your Cart ({items.length} items)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.genericName} • {item.dosage}
                            </p>
                            {item.prescription && (
                              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md mt-1">
                                Requires prescription
                              </span>
                            )}
                            {item.instructions && (
                              <p className="text-xs text-gray-500 mt-1">
                                {item.instructions}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <div className="font-medium">
                              {formatPrice(item.price)}
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                onClick={() =>
                                  handleDecreaseQuantity(item.id, item.quantity)
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 text-center w-10">
                                {item.quantity}
                              </span>
                              <button
                                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                onClick={() =>
                                  handleIncreaseQuantity(item.id, item.quantity)
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-700">
                            Subtotal: {formatPrice(item.price * item.quantity)}
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700 text-sm flex items-center"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => clearCart()}
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {needsPrescription && (
                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    One or more items require a valid prescription. You'll need
                    to upload it during checkout.
                  </p>
                </div>
              )}

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Free shipping on orders above ₹1,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
