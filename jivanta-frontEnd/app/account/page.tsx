"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  X, User, ShoppingCart, History, HelpCircle, 
  Settings, LogOut, Filter, Search, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg"
};

// Mock order data
const mockOrders = [
  { 
    id: "202401", 
    date: "March 2, 2024", 
    status: "Delivered", 
    items: 3, 
    total: 127.99,
    products: [
      { name: "Blood Pressure Monitor", price: 49.99, quantity: 1 },
      { name: "Pulse Oximeter", price: 29.00, quantity: 1 },
      { name: "Digital Thermometer", price: 49.00, quantity: 1 }
    ]
  },
  { 
    id: "202402", 
    date: "February 25, 2024", 
    status: "Shipped", 
    items: 2, 
    total: 89.50,
    products: [
      { name: "First Aid Kit", price: 39.50, quantity: 1 },
      { name: "Pain Relief Medication", price: 50.00, quantity: 1 }
    ]
  },
  { 
    id: "202403", 
    date: "February 10, 2024", 
    status: "Delivered", 
    items: 1, 
    total: 199.99,
    products: [
      { name: "Smart Health Watch", price: 199.99, quantity: 1 }
    ]
  },
  { 
    id: "202404", 
    date: "January 15, 2024", 
    status: "Cancelled", 
    items: 4, 
    total: 156.75,
    products: [
      { name: "Vitamins Pack", price: 45.75, quantity: 1 },
      { name: "Fitness Tracker", price: 79.00, quantity: 1 },
      { name: "Heating Pad", price: 32.00, quantity: 1 }
    ]
  }
];

export default function AccountSettings() {
  const router = useRouter();
  const pathname = usePathname();
  
  // State management
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Determine which nav item is active
  const getActiveSection = () => {
    if (pathname === "/account") return "orders";
    return pathname.split("/").pop() || "orders";
  }

  // Order filtering functionality
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API loading delay
    const timer = setTimeout(() => {
      let filtered = [...mockOrders];
      
      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter(order => 
          order.status.toLowerCase() === statusFilter.toLowerCase()
        );
      }
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(order => 
          order.id.includes(searchTerm) || 
          order.products.some(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      setFilteredOrders(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [statusFilter, searchTerm]);

  // Logout functionality
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens
    // For demo purposes, we'll just redirect to home
    router.push("/");
  };
  
  // Toggle order details view
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Get status color based on order status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-primary/5">
      {/* Mobile Header - Visible on small screens only */}
      <div className="md:hidden p-4 bg-white border-b shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium">Account</span>
        </div>
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 bg-white md:min-h-screen md:border-r">
          {/* Desktop Header - Hidden on mobile */}
          <div className="hidden md:flex p-6 border-b items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-medium">{userData.name}</h2>
              <p className="text-xs text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          
          <nav className="p-4 md:p-6">
            <p className="text-sm text-muted-foreground mb-4 hidden md:block">Manage your account</p>
            
            <div className="space-y-2">
              <Link href="/account/cart" className="block">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-3 font-normal ${getActiveSection() === 'cart' ? 'bg-primary/10' : ''}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart
                </Button>
              </Link>
              
              <Link href="/account/orders" className="block">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-3 font-normal ${getActiveSection() === 'orders' ? 'bg-primary/10' : ''}`}
                >
                  <History className="h-5 w-5" />
                  Order History
                </Button>
              </Link>
              
              <Link href="/account/help" className="block">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-3 font-normal ${getActiveSection() === 'help' ? 'bg-primary/10' : ''}`}
                >
                  <HelpCircle className="h-5 w-5" />
                  Help
                </Button>
              </Link>
              
              <Link href="/account/settings" className="block">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start gap-3 font-normal ${getActiveSection() === 'settings' ? 'bg-primary/10' : ''}`}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t hidden md:block">
              <Button 
                variant="destructive" 
                className="w-full gap-2 justify-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Right Content Area */}
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b pb-4 mb-6 flex flex-col md:flex-row justify-between gap-4">
              <h1 className="text-xl font-semibold">Order History</h1>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-9 w-full md:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Orders List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="py-20 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-l-2 border-primary"></div>
                </div>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div 
                      className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`${getStatusColor(order.status)} text-xs px-2 py-1 rounded`}>{order.status}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t text-sm flex justify-between items-center">
                        <span className="text-muted-foreground">{order.items} items • ${order.total.toFixed(2)}</span>
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          toggleOrderDetails(order.id);
                        }}>
                          {expandedOrderId === order.id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Expanded Order Details */}
                    {expandedOrderId === order.id && (
                      <div className="bg-muted/20 p-4 border-t">
                        <h4 className="font-medium mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.products.map((product, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">
                                  {product.quantity}x
                                </div>
                                <span>{product.name}</span>
                              </div>
                              <span>${product.price.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="pt-3 mt-3 border-t flex justify-between font-medium">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>No orders found matching your criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Footer with Logout - Visible on small screens only */}
      <div className="md:hidden p-4 bg-white border-t shadow-sm mt-4">
        <Button 
          variant="destructive" 
          className="w-full gap-2 justify-center"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}