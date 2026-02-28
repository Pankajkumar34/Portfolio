import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/model/user';
import { generateToken } from '@/lib/jwt';
import connectDB from '@/lib/connectDB';

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, email, password, image } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image || ''
    });

    const token = generateToken(user._id);

    const response = NextResponse.json(
      { 
        message: 'User created successfully', 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      },
      { status: 201 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
