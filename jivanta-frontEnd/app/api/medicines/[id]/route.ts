import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

// GET a single medicine by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const medicine = await Medicine.findOne({ id: params.id });
    
    if (!medicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }
    
    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Failed to fetch medicine:', error);
    return NextResponse.json({ error: 'Failed to fetch medicine' }, { status: 500 });
  }
}

// PUT (update) a medicine
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const data = await request.json();
    const medicine = await Medicine.findOneAndUpdate(
      { id: params.id },
      data,
      { new: true }
    );
    
    if (!medicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Medicine Updated', medicine });
  } catch (error) {
    console.error('Failed to update medicine:', error);
    return NextResponse.json({ error: 'Failed to update medicine' }, { status: 500 });
  }
}

// DELETE a medicine
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const medicine = await Medicine.findOneAndDelete({ id: params.id });
    
    if (!medicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Medicine Deleted' });
  } catch (error) {
    console.error('Failed to delete medicine:', error);
    return NextResponse.json({ error: 'Failed to delete medicine' }, { status: 500 });
  }
}