import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

// GET all medicines
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    
    // Handle query params for filtering
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const search = searchParams.get('search');
    
    // Build query object
    let query: any = {};
    
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    const medicines = await Medicine.find(query);
    
    return NextResponse.json(medicines);
  } catch (error) {
    console.error('Failed to fetch medicines:', error);
    return NextResponse.json({ error: 'Failed to fetch medicines' }, { status: 500 });
  }
}

// POST a new medicine
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const medicine = new Medicine(data);
    await medicine.save();
    
    return NextResponse.json({ message: 'Medicine Added', medicine }, { status: 201 });
  } catch (error) {
    console.error('Failed to add medicine:', error);
    return NextResponse.json({ error: 'Failed to add medicine' }, { status: 500 });
  }
}