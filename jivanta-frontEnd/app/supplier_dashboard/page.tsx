"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Pill,
  Package,
  Users,
  Settings,
  BellRing,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Upload,
  Edit,
  Trash2,
  ArrowUpDown,
  Calendar,
  DollarSign,
  FileBarChart,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupplierDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddMedicineForm, setShowAddMedicineForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    brand: "PharmaLife",
    category: "",
    price: "",
    description: "",
    dosage: "",
    activeIngredients: "",
    sideEffects: "",
    warnings: "",
    prescription: false,
    stock: "100"
  });
  
  // Dummy existing medicines
  const [medicines, setMedicines] = useState([
    {
      id: "med-1",
      name: "Azithromycin 250mg",
      genericName: "Azithromycin",
      price: 29.99,
      stock: 124,
      category: "Antibiotics",
      prescription: true,
      image: "/placeholder.svg"
    },
    {
      id: "med-2",
      name: "PainRelief Plus",
      genericName: "Ibuprofen + Paracetamol",
      price: 15.50,
      stock: 432,
      category: "Pain Relief",
      prescription: false,
      image: "/placeholder.svg"
    }
  ]);
  
  // Dummy orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD-2023-001",
      date: "2023-03-05",
      customer: "Metro Healthcare",
      items: 3,
      total: 235.99,
      status: "Delivered"
    },
    {
      id: "ORD-2023-002",
      date: "2023-03-02",
      customer: "City Medical Center",
      items: 5,
      total: 419.50,
      status: "Processing"
    },
    {
      id: "ORD-2023-003",
      date: "2023-02-28",
      customer: "Wellness Clinic",
      items: 2,
      total: 87.25,
      status: "Shipped"
    }
  ]);
  
  // Dummy customers data
  const [customers, setCustomers] = useState([
    {
      id: "CUST-001",
      name: "Metro Healthcare",
      contactPerson: "John Smith",
      email: "john@metrohealthcare.com",
      phone: "+1 555-123-4567",
      location: "New York, NY",
      orders: 12,
      since: "Jan 2023"
    },
    {
      id: "CUST-002",
      name: "City Medical Center",
      contactPerson: "Sarah Johnson",
      email: "sarah@citymedical.org",
      phone: "+1 555-987-6543",
      location: "Chicago, IL",
      orders: 8,
      since: "Feb 2023"
    },
    {
      id: "CUST-003",
      name: "Wellness Clinic",
      contactPerson: "Michael Davis",
      email: "michael@wellnessclinic.com",
      phone: "+1 555-456-7890",
      location: "San Francisco, CA",
      orders: 5,
      since: "Mar 2023"
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.genericName || !formData.price) {
      setErrorMessage("Please fill all required fields");
      setSuccessMessage("");
      return;
    }
    
    // In a real app, you'd send this to an API
    const newMedicine = {
      id: `med-${Date.now()}`,
      name: formData.name,
      genericName: formData.genericName,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      prescription: formData.prescription,
      image: "/placeholder.svg"
    };
    
    // Add to state (in a real app, this would come after API success)
    setMedicines([...medicines, newMedicine]);
    
    // Reset form
    setFormData({
      name: "",
      genericName: "",
      brand: "PharmaLife",
      category: "",
      price: "",
      description: "",
      dosage: "",
      activeIngredients: "",
      sideEffects: "",
      warnings: "",
      prescription: false,
      stock: "100"
    });
    
    setFormSubmitted(true);
    setSuccessMessage("Medicine added successfully");
    setErrorMessage("");
    
    // In a real app, you might keep the form open for adding more
    setTimeout(() => {
      setShowAddMedicineForm(false);
      setFormSubmitted(false);
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm h-full hidden md:block">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">
              J
            </div>
            <h1 className="text-xl font-semibold">Jivanta Supplier</h1>
          </div>
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab("overview")}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${activeTab === "overview" ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("medicines")}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${activeTab === "medicines" ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <Pill className="h-5 w-5 mr-3" />
                Medicines
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${activeTab === "orders" ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <Package className="h-5 w-5 mr-3" />
                Orders
              </button>
            </li>
          </ul>
          
          <div className="mt-8 pt-4 border-t">
            <ul className="space-y-1">
            
              <li>
                <Link href="/" className="flex items-center px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100">
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h2 className="text-lg font-medium">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "medicines" && "Medicine Management"}
              {activeTab === "orders" && "Order History"}
              {activeTab === "settings" && "Account Settings"}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-medium text-sm">PL</span>
              </div>
              <span className="ml-2 font-medium text-sm hidden sm:block">PharmaLife Ltd.</span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {activeTab === "medicines" && (
            <>
              {/* Medicines Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Your Medicines</h1>
                  <p className="text-muted-foreground">Manage and add medicines to the platform</p>
                </div>
                
                <Button 
                  onClick={() => setShowAddMedicineForm(!showAddMedicineForm)} 
                  className="flex items-center gap-2"
                >
                  {showAddMedicineForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {showAddMedicineForm ? "Cancel" : "Add Medicine"}
                </Button>
              </div>
              
              {/* Search and Filter */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search medicines..."
                      className="pl-10 w-full"
                    />
                  </div>
                  <select 
                    aria-label="Filter by category"
                    className="border rounded-md px-3 py-2 bg-transparent text-sm">
                    <option value="">All Categories</option>
                    <option value="antibiotics">Antibiotics</option>
                    <option value="painRelief">Pain Relief</option>
                  <select 
                    aria-label="Filter by stock status"
                    className="border rounded-md px-3 py-2 bg-transparent text-sm">
                    <option value="">Stock Status</option>
                    <option value="inStock">In Stock</option>
                    <option value="lowStock">Low Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                </div>
              </div>
              
              {/* Success or Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {successMessage}
                </div>
              )}
              
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {errorMessage}
                </div>
              )}
              
              {/* Add Medicine Form */}
              {showAddMedicineForm && (
                <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                  <div className="border-b px-6 py-4">
                    <h3 className="text-lg font-medium">Add New Medicine</h3>
                    <p className="text-muted-foreground text-sm">Enter medicine details below</p>
                  </div>
                  
                  <form onSubmit={handleAddMedicine} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Medicine Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Amoxicillin 500mg"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="genericName" className="block text-sm font-medium mb-1">
                          Generic Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="genericName"
                          name="genericName"
                          value={formData.genericName}
                          onChange={handleInputChange}
                          placeholder="e.g. Amoxicillin Trihydrate"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="brand" className="block text-sm font-medium mb-1">
                          Brand
                        </label>
                        <Input
                          id="brand"
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                          Category
                        </label>
                        <select 
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input px-3 py-2 bg-transparent"
                        >
                          <option value="">Select Category</option>
                          <option value="Antibiotics">Antibiotics</option>
                          <option value="Pain Relief">Pain Relief</option>
                          <option value="Cardiovascular">Cardiovascular</option>
                          <option value="Diabetes">Diabetes</option>
                          <option value="Vitamins">Vitamins & Supplements</option>
                          <option value="Allergies">Allergies</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium mb-1">
                          Price (USD) <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="e.g. 19.99"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="stock" className="block text-sm font-medium mb-1">
                          Initial Stock
                        </label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleInputChange}
                          placeholder="e.g. 100"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Enter medicine description..."
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dosage" className="block text-sm font-medium mb-1">
                          Dosage
                        </label>
                        <Input
                          id="dosage"
                          name="dosage"
                          value={formData.dosage}
                          onChange={handleInputChange}
                          placeholder="e.g. 1 tablet 3 times daily"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="activeIngredients" className="block text-sm font-medium mb-1">
                          Active Ingredients
                        </label>
                        <Input
                          id="activeIngredients"
                          name="activeIngredients"
                          value={formData.activeIngredients}
                          onChange={handleInputChange}
                          placeholder="e.g. Amoxicillin Trihydrate 500mg"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="sideEffects" className="block text-sm font-medium mb-1">
                          Side Effects
                        </label>
                        <Textarea
                          id="sideEffects"
                          name="sideEffects"
                          value={formData.sideEffects}
                          onChange={handleInputChange}
                          placeholder="Enter potential side effects..."
                          rows={2}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="warnings" className="block text-sm font-medium mb-1">
                          Warnings
                        </label>
                        <Textarea
                          id="warnings"
                          name="warnings"
                          value={formData.warnings}
                          onChange={handleInputChange}
                          placeholder="Enter any warnings or contraindications..."
                          rows={2}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="flex items-center">
                          <input
                            id="prescription"
                            name="prescription"
                            type="checkbox"
                            checked={formData.prescription}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor="prescription" className="ml-2 block text-sm font-medium">
                            Prescription Required
                          </label>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Medicine Images
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm font-medium">Drag & drop images here</p>
                          <p className="text-xs text-muted-foreground">or</p>
                          <button
                            type="button"
                            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50"
                          >
                            Browse Files
                          </button>
                          <p className="mt-1 text-xs text-muted-foreground">
                            PNG, JPG up to 5MB each
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddMedicineForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Medicine
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Medicine List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Medicine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {medicines.map((medicine) => (
                        <tr key={medicine.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md">
                                <Image
                                  src={medicine.image}
                                  alt={medicine.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{medicine.name}</div>
                                <div className="text-sm text-gray-500">{medicine.genericName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{medicine.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">${medicine.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{medicine.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {medicine.prescription ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Prescription
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                OTC
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button 
                                aria-label="Edit medicine"
                                className="text-primary hover:text-primary/80"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                aria-label="Delete medicine"
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <Pill className="h-6 w-6 text-blue-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Total Medicines</p>
                      <h3 className="text-2xl font-bold">{medicines.length}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-md">
                      <Package className="h-6 w-6 text-green-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Orders This Month</p>
                      <h3 className="text-2xl font-bold">24</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-md">
                      <Users className="h-6 w-6 text-purple-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                      <h3 className="text-2xl font-bold">18</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-md">
                      <AlertCircle className="h-6 w-6 text-orange-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                      <h3 className="text-2xl font-bold">3</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button 
                        onClick={() => {
                          setActiveTab("medicines");
                          setShowAddMedicineForm(true);
                        }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <Plus className="h-5 w-5 text-primary mr-3" />
                          <span>Add New Medicine</span>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                        </div>
                      </div>
                    )}
                  </main>
                </div>
              </div>
    );
}
