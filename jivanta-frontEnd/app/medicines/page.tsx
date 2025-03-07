"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Medicine {
  id: string | number;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  genericName?: string;
  images?: string[];
  image?: string;
  dosage?: string;
  prescription?: boolean;
}
import {
  Search,
  ShoppingCart,
  Filter,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function MedicinesPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [medicinesData, setMedicinesData] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  
  // Fetch medicines on load
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/medicines');
        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }
        const data = await response.json();
        setMedicinesData(data);
        setFilteredMedicines(data);
        
        // Extract categories and brands
        const uniqueCategories = [...new Set(data.map((medicine: any) => medicine.category))] as string[];
        const uniqueBrands = [...new Set(data.map((medicine: any) => medicine.brand))] as string[];
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        
        // Fallback to local data in case API fails
        try {
          const fallbackResponse = await fetch('/db.json');
          const fallbackData = await fallbackResponse.json();
          setMedicinesData(fallbackData.medicines);
          setFilteredMedicines(fallbackData.medicines);
          
          // Extract categories and brands from fallback data
          const uniqueCategories = [...new Set(fallbackData.medicines.map((medicine: any) => medicine.category))] as string[];
          const uniqueBrands = [...new Set(fallbackData.medicines.map((medicine: any) => medicine.brand))] as string[];
          
          setCategories(uniqueCategories);
          setBrands(uniqueBrands);
        } catch (fallbackError) {
          console.error('Fallback data loading failed:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedicines();
  }, []);
  
  // Handle filtering with API
  useEffect(() => {
    const fetchFilteredMedicines = async () => {
      if (!medicinesData.length) return;
      
      setIsLoading(true);
      
      try {
        // Build query params
        const params = new URLSearchParams();
        
        if (searchQuery) params.append('search', searchQuery);
        if (activeCategory) params.append('category', activeCategory);
        if (selectedBrands.length) {
          selectedBrands.forEach(brand => params.append('brand', brand));
        }
        if (priceMin) params.append('minPrice', priceMin);
        if (priceMax) params.append('maxPrice', priceMax);
        if (minRating) params.append('minRating', minRating.toString());
        
        // If we have params, fetch filtered data
        if (params.toString()) {
          const response = await fetch(`/api/medicines?${params}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch filtered medicines');
          }
          
          const data = await response.json();
          setFilteredMedicines(data);
        } else {
          // No filters, use all medicines
          setFilteredMedicines(medicinesData);
        }
      } catch (error) {
        console.error('Error filtering medicines:', error);
        
        // Fallback to client-side filtering if API fails
        let results = [...medicinesData];

        // Apply search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          results = results.filter(
            (medicine: any) =>
              medicine.name.toLowerCase().includes(query) ||
              medicine.description.toLowerCase().includes(query) ||
              medicine.brand.toLowerCase().includes(query)
          );
        }

        // Apply category filter
        if (activeCategory) {
          results = results.filter(
            (medicine: any) => medicine.category === activeCategory
          );
        }

        // Apply brand filter
        if (selectedBrands.length > 0) {
          results = results.filter((medicine: any) =>
            selectedBrands.includes(medicine.brand)
          );
        }

        // Apply price range filter
        if (priceMin !== "") {
          results = results.filter(
            (medicine: any) => medicine.price >= parseFloat(priceMin)
          );
        }

        if (priceMax !== "") {
          results = results.filter(
            (medicine: any) => medicine.price <= parseFloat(priceMax)
          );
        }

        // Apply rating filter
        if (minRating !== null) {
          results = results.filter((medicine: any) => medicine.rating >= minRating);
        }

        setFilteredMedicines(results);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add delay for typing
    const timer = setTimeout(() => {
      fetchFilteredMedicines();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, selectedBrands, priceMin, priceMax, minRating, medicinesData]);

  // Rest of your code remains the same
  
  // Format price to Indian Rupees
  const formatIndianPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle rating selection
  const toggleRating = (rating: number) => {
    setMinRating(minRating === rating ? null : rating);
  };

  // Handle category selection
  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Handle add to cart
  const addToCart = (medicine: any) => {
    // Convert medicine to cart item format and add to cart
    addItem({
      id: medicine.id,
      name: medicine.name,
      genericName: medicine.genericName || medicine.name.split(" ")[0],
      image: medicine.images?.[0] || medicine.image || "/assets/medicines/medicine.jpeg",
      price: medicine.price,
      dosage: medicine.dosage || (medicine.name.split(" ").length > 1 ? medicine.name.split(" ")[1] : ""),
      prescription: medicine.prescription || false,
    });

    // Show added confirmation
    setAddedToCart(medicine.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setSelectedBrands([]);
    setMinRating(null);
    setActiveCategory(null);
  };

  // The JSX render remains mostly the same
  // Just ensure image paths are correctly referenced
  
  return (
    // Your existing JSX with fixed image references
    <div className="min-h-screen bg-primary/5">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-primary">Our Medicines</h1>

          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search medicines..."
              className="pl-10 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-between items-center"
          >
            <span className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </span>
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filter Section */}
          <div
            className={`col-span-12 md:col-span-3 bg-white rounded-lg shadow-sm p-6 ${
              showFilters ? "block" : "hidden"
            } md:block`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Reset All
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="w-full"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    className="w-full"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={brand}
                        className="mr-2"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
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
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        className="mr-2"
                        checked={minRating === rating}
                        onChange={() => toggleRating(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="text-sm">
                        {rating} Stars & Above
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  Showing {filteredMedicines.length} of {medicinesData.length}{" "}
                  products
                </p>
                {filteredMedicines.length === 0 && !isLoading && (
                  <p className="text-xs text-red-500">
                    No matches found. Try adjusting your filters.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <Button
                variant={activeCategory === null ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    activeCategory === category ? "secondary" : "outline"
                  }
                  className="bg-white rounded-full text-sm"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Loading state */}
            {isLoading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Loading medicines...</p>
                </div>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link href={`/product/${medicine.id}`} className="block">
                      <div className="aspect-square relative bg-gray-100">
                        <Image
                          src={
                            medicine.images?.[0] || 
                            medicine.image || 
                            "/assets/medicines/medicine.jpeg"
                          }
                          alt={medicine.name}
                          fill
                          className="object-contain p-4"
                        />
                        {medicine.prescription && (
                          <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
                            Prescription
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/product/${medicine.id}`} className="block">
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {medicine.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {medicine.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Brand: {medicine.brand}
                        </p>
                      </Link>

                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(medicine.rating)
                                ? "text-highlight"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs ml-1 text-muted-foreground">
                          {medicine.rating.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-highlight">
                          {formatIndianPrice(medicine.price)}
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full"
                          disabled={addedToCart === medicine.id}
                          onClick={() => addToCart(medicine)}
                        >
                          {addedToCart === medicine.id ? (
                            <span className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" /> Added
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <ShoppingCart className="h-4 w-4 mr-1" /> Add
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center bg-white rounded-lg shadow-sm p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No medicines found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any medicines matching your criteria.
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
