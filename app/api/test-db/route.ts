import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}
