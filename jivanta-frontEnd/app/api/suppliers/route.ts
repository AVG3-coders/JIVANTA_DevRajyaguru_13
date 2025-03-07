import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

// GET all suppliers
export async function GET() {
  try {
    await connectDB();
    const suppliers = await Supplier.find({});
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

// POST a new supplier
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const supplier = new Supplier(data);
    await supplier.save();
    
    return NextResponse.json({ message: 'Supplier Added', supplier }, { status: 201 });
  } catch (error) {
    console.error('Failed to add supplier:', error);
    return NextResponse.json({ error: 'Failed to add supplier' }, { status: 500 });
  }
}