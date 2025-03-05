import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-primary/10 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">Product Photos</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((thumb) => (
                  <div
                    key={thumb}
                    className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:ring-2 hover:ring-primary"
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Paracetamol 500mg</h1>
                <p className="text-muted-foreground">Generic Name: Acetaminophen</p>
                <p className="text-sm mt-2">Brand: MediCorp</p>
              </div>

              <div className="bg-primary/5 p-4 rounded-md">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">
                  Paracetamol is a medication used to treat fever and mild to moderate pain. At a standard dose,
                  paracetamol only slightly decreases body temperature. It is often sold in combination with other
                  medications, such as in many cold medications.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price</h3>
                <p className="text-2xl font-bold text-highlight">$9.99</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-1 border rounded-md">1</span>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm mb-4">
                  Total price: <span className="font-semibold">$9.99</span> × <span className="font-semibold">1</span> ={" "}
                  <span className="font-bold text-highlight">$9.99</span>
                </p>

                <Button variant="secondary" className="w-full mb-3 rounded-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
            <div>
              <h3 className="font-semibold mb-4">Product Reviews</h3>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? "text-highlight" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">
                    Works great for headaches and fever. I always keep this in my medicine cabinet.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">More Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Dosage</p>
                  <p>Adults: 1-2 tablets every 4-6 hours as needed</p>
                </div>
                <div>
                  <p className="font-medium">Storage</p>
                  <p>Store at room temperature away from moisture and heat</p>
                </div>
                <div>
                  <p className="font-medium">Warnings</p>
                  <p>Do not exceed recommended dose. Consult doctor if symptoms persist.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

