import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'vendor', 'seller']),
  fssaiCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, username, email, password, role, fssaiCode } = registerSchema.parse(body);

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Validate FSSAI code for sellers
    if (role === 'seller' && (!fssaiCode || fssaiCode.length !== 14)) {
      return NextResponse.json(
        { error: 'FSSAI Code must be 14 digits for sellers' },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      username,
      email,
      password,
      role,
      ...(role === 'seller' && { fssaiCode }),
    });

    await user.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
  console.error("Zod Validation Error:", error.errors); // Debug log
  return NextResponse.json(
    { error: 'Invalid input data', details: error.errors },
    { status: 400 }
  );
}


    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}