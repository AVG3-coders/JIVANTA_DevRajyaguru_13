
import { create } from "zustand";
import { persist } from "zustand/middleware";
// Define types
export interface CartItem {
  id: string;
  name: string;
  genericName: string;
  image: string;
  price: number;
  quantity: number;
  dosage: string;
  instructions?: string;
  prescription?: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

// Helper to fetch medicine details from API
export async function fetchMedicineById(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/medicines/${id}`);
    if (!response.ok) throw new Error("Medicine not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return null;
  }
}

// Create persistent store with Zustand
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Update quantity if item exists
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Add new item with quantity 1
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      // Remove item from cart
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // Calculate subtotal
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get total number of items
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "jivanta-cart", // localStorage key
    }
  )
);

// Helper functions for cart operations

// Format price to INR currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
};

// Calculate taxes (assuming 18% GST)
export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.18;
};

// Calculate shipping (free above ₹1000, otherwise ₹100)
export const calculateShipping = (subtotal: number): number => {
  return subtotal >= 1000 ? 0 : 100;
};

// Calculate order total
export const calculateTotal = (subtotal: number): number => {
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  return subtotal + tax + shipping;
};

// Check if medicine requires prescription
export const requiresPrescription = (cartItems: CartItem[]): boolean => {
  return cartItems.some((item) => item.prescription);
};

// Save cart to localStorage manually (backup method)
export const saveCartToLocalStorage = (cart: CartItem[]): void => {
  localStorage.setItem("jivanta-cart-backup", JSON.stringify(cart));
};

// Load cart from localStorage manually (backup method)
export const loadCartFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem("jivanta-cart-backup");
  return cart ? JSON.parse(cart) : [];
};

// Convert DB medicine to cart item
export const medicineToCartItem = (
  medicine: any,
  quantity: number = 1
): CartItem => {
  return {
    id: medicine.id,
    name: medicine.name,
    genericName: medicine.genericName || "",
    image: medicine.images?.[0] || "/placeholder.svg",
    price: medicine.price,
    quantity: quantity,
    dosage: medicine.dosage?.split(":")[1]?.trim().split(" ")[0] || "",
    instructions: medicine.usage,
    prescription: medicine.prescription || false,
  };
};

// Handle checkout process
export const handleCheckout = async (
  cartItems: CartItem[],
  doctorId: string,
  shippingAddress: any
): Promise<{ success: boolean; orderId?: string; error?: string }> => {
  try {
    // Format order data
    const orderData = {
      doctorId,
      items: cartItems.map((item) => ({
        medicineId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculateTotal(useCart.getState().getSubtotal()),
      status: "processing",
      paymentMethod: "online", // Could be dynamic
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      shippingAddress: shippingAddress,
    };

    // Send order to API
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const data = await response.json();

    // Clear cart on successful order
    useCart.getState().clearCart();

    return {
      success: true,
      orderId: data.id,
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
