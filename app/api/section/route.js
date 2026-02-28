import { NextResponse } from 'next/server';
import Section from '@/model/section';
import { verifyToken } from '@/lib/jwt';
import connectDB from '@/lib/connectDB';

// GET all sections or single section
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const sectionName = searchParams.get('sectionName');
    
    if (sectionName) {
      const section = await Section.findOne({ sectionName });
      if (!section) {
        return NextResponse.json(
          { message: 'Section not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(section, { status: 200 });
    }
    
    const sections = await Section.find({ isActive: true });
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    console.error('Get sections error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create or update section (protected)
export async function POST(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const { sectionName, content, isActive } = await request.json();
    
    if (!sectionName) {
      return NextResponse.json(
        { message: 'Section name is required' },
        { status: 400 }
      );
    }
    
    const section = await Section.findOneAndUpdate(
      { sectionName },
      { content, isActive },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(
      { message: 'Section saved successfully', section },
      { status: 200 }
    );
  } catch (error) {
    console.error('Save section error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
