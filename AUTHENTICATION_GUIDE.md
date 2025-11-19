/**
 * Authentication System Usage Examples
 * 
 * This file demonstrates how to use the authentication system
 * in your Next.js application.
 */

// ============================================
// 1. REGISTRATION EXAMPLE
// ============================================

// In a client component or API route:
async function registerUser(name: string, email: string, password: string) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error);
  }
  
  return data;
}

// ============================================
// 2. LOGIN WITH NEXTAUTH (CLIENT SIDE)
// ============================================

import { signIn, signOut, useSession } from 'next-auth/react';

// Login function
async function loginUser(email: string, password: string) {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    console.error('Login failed:', result.error);
    return { success: false, error: result.error };
  }

  return { success: true };
}

// Use session in a component
function ProfileComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

// ============================================
// 3. PROTECTING API ROUTES (SERVER SIDE)
// ============================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

async function protectedApiRoute(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Access user info from session
  const userId = session.user.id;
  const userRole = session.user.role;

  return NextResponse.json({
    message: 'Protected data',
    user: session.user,
  });
}

// ============================================
// 4. PROTECTING PAGES (SERVER COMPONENT)
// ============================================

import { redirect } from 'next/navigation';

async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome {session.user.name}</p>
    </div>
  );
}

// ============================================
// 5. ROLE-BASED ACCESS CONTROL
// ============================================

async function adminOnlyRoute(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Admin-only logic here
  return NextResponse.json({ message: 'Admin access granted' });
}

// ============================================
// 6. MANUAL PASSWORD OPERATIONS
// ============================================

import { hashPassword, comparePassword } from '@/lib/hash';

async function manualPasswordHandling() {
  // Hash a password
  const hashedPassword = await hashPassword('myPassword123');
  
  // Compare passwords
  const isMatch = await comparePassword('myPassword123', hashedPassword);
  
  return isMatch; // true
}

// ============================================
// 7. WORKING WITH USER MODEL DIRECTLY
// ============================================

import dbConnect from '@/lib/db';
import User from '@/models/User';

async function createAdminUser() {
  await dbConnect();

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'securePassword123', // Will be hashed automatically
    role: 'admin',
  });

  return admin;
}

async function findUserAndVerifyPassword(email: string, password: string) {
  await dbConnect();

  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    return false;
  }

  // Use the model's comparePassword method
  const isValid = await user.comparePassword(password);
  
  return isValid;
}

// ============================================
// 8. SESSION PROVIDER SETUP (app/layout.tsx)
// ============================================

/*
'use client';

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
*/

export {};
