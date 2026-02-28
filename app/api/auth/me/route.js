import { NextResponse } from 'next/server';
import User from '@/model/user';
import { verifyToken } from '@/lib/jwt';
import connectDB from '@/lib/connectDB';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
console.log(token,"tokentoken=>")
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    console.log(decoded,"decodeddecodeddecoded")
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
