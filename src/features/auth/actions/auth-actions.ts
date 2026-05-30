'use server';

import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';

export async function createSession(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax' as const,
    });

    return { success: true };
  } catch (error) {
    console.error('Session creation error:', error);
    return { success: false, error: 'Could not create session' };
  }
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}
