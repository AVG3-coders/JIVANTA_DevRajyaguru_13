import Link from "next/link"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
            {/* Product Image */}
            <div className="md:col-span-3 aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-muted-foreground">Photo</span>
            </div>

            {/* Product Details */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">Medicine Name</h2>
                <p className="text-sm text-muted-foreground mb-2">Generic Name</p>
                <div className="text-sm bg-primary/10 p-2 rounded-md mb-2">
                  <p className="font-medium">Dosage: 500mg</p>
                  <p>Take 1 tablet twice daily after meals</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-1 border rounded-md">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4">
                <p className="font-medium">
                  Price (Total): <span className="text-highlight">$29.99</span>
                </p>
              </div>
            </div>

            {/* Billing Info */}
            <div className="md:col-span-4 bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-4">Billing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>$2.50</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-highlight">$37.48</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end">
            <Link href="/checkout">
              <Button className="rounded-full">Place Order</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

