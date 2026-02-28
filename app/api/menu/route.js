import { NextResponse } from 'next/server';
import MenuSetting from '@/model/menuSetting';
import { verifyToken } from '@/lib/jwt';
import connectDB from '@/lib/connectDB';

// Default menu items
const defaultMenuItems = [
  { id: 'hero', label: 'Hero Section', icon: '🏠', sectionName: 'hero', sectionType: 'hero', order: 1 },
  { id: 'profile', label: 'Profile', icon: '👤', sectionName: 'profile', sectionType: 'profile', order: 2 },
  { id: 'experience', label: 'Experience', icon: '💼', sectionName: 'experience', sectionType: 'experience', order: 3 },
  { id: 'skills', label: 'Skills', icon: '⚡', sectionName: 'skills', sectionType: 'skills', order: 4 },
  { id: 'companies', label: 'Companies', icon: '🏢', sectionName: 'companies', sectionType: 'companies', order: 5 },
];

// GET menu settings
export async function GET(request) {
  try {
    await connectDB();
    
    let menuSetting = await MenuSetting.findOne({ key: 'dashboard_menu' });
    
    // If no menu setting exists, create default
    if (!menuSetting) {
      menuSetting = await MenuSetting.create({
        key: 'dashboard_menu',
        items: defaultMenuItems,
      });
    }
    
    return NextResponse.json(menuSetting, { status: 200 });
  } catch (error) {
    console.error('Get menu error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST update menu settings (protected)
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
    
    const { items } = await request.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { message: 'Menu items are required' },
        { status: 400 }
      );
    }
    
    const menuSetting = await MenuSetting.findOneAndUpdate(
      { key: 'dashboard_menu' },
      { items },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(
      { message: 'Menu saved successfully', menuSetting },
      { status: 200 }
    );
  } catch (error) {
    console.error('Save menu error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
