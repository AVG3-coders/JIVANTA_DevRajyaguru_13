import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full py-4 px-6 bg-secondary text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            MediShop
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-white/80 transition-colors">
              Products
            </Link>
            <Link href="/about" className="hover:text-white/80 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="highlight" className="rounded-full">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Our Products</h1>

          <div className="relative w-full max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search products..." className="pl-10 w-full rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filter Section */}
          <div className="col-span-12 md:col-span-3 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Min" className="w-full" />
                  <Input type="number" placeholder="Max" className="w-full" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {["Brand A", "Brand B", "Brand C"].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input type="checkbox" id={brand} className="mr-2" />
                      <label htmlFor={brand} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                      <label htmlFor={`rating-${rating}`} className="text-sm">
                        {rating} Stars & Above
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="bg-white rounded-full">
                Category 1
              </Button>
              <Button variant="outline" className="bg-white rounded-full">
                Category 2
              </Button>
              <Button variant="outline" className="bg-white rounded-full">
                Category 3
              </Button>
              <Button variant="outline" className="bg-white rounded-full">
                Category 4
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((product) => (
                <div
                  key={product}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Product image"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Product Name</h3>
                    <p className="text-sm text-muted-foreground mb-3">Brief description of the product</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-highlight">$19.99</span>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

