import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Payment Gateway</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Address Section */}
          <div className="md:col-span-12 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Delivery Address</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                Change
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-sm">123 Main Street, Apt 4B</p>
              <p className="text-sm">New York, NY 10001</p>
              <p className="text-sm">United States</p>
            </div>

            <div>
              <Input placeholder="Add delivery instructions (optional)" className="w-full" />
            </div>
          </div>

          {/* Payment Options */}
          <div className="md:col-span-7 bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Payment Method</h2>

            <div className="space-y-4">
              <div className="border rounded-md p-4 cursor-pointer hover:bg-primary/5">
                <h3 className="font-medium text-center text-lg">UPI</h3>
              </div>

              <div className="border rounded-md p-4 cursor-pointer hover:bg-primary/5">
                <h3 className="font-medium text-center text-lg">Card</h3>
              </div>

              <div className="border rounded-md p-4 cursor-pointer hover:bg-primary/5">
                <h3 className="font-medium text-center text-lg">Net Banking</h3>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-5 bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal (2 items)</span>
                <span>$49.98</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$4.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$3.75</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-highlight">$58.72</span>
              </div>
            </div>

            <Button className="w-full rounded-full">Complete Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

