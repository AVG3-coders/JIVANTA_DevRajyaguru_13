import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Medicine from '@/models/Medicine';
import { nanoid } from 'nanoid';

// GET all orders
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const url = new URL(request.url);
    const doctorId = url.searchParams.get('doctorId');
    
    const query = doctorId ? { doctorId } : {};
    const orders = await Order.find(query).sort({ orderDate: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST a new order
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Generate a unique order ID
    const orderId = `ORD-${nanoid(6)}-${new Date().getFullYear()}`;
    
    // Set current date as order date
    const orderDate = new Date();
    
    const orderData = {
      ...data,
      id: orderId,
      orderDate
    };
    
    const order = new Order(orderData);
    await order.save();
    
    // Update medicine stocks and sales counts
    for (const item of data.items) {
      await Medicine.findOneAndUpdate(
        { id: item.medicineId },
        { 
          $inc: { 
            stock: -item.quantity,
            sales: item.quantity 
          } 
        }
      );
    }
    
    return NextResponse.json({ 
      message: 'Order Placed Successfully', 
      order,
      orderId
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to place order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}