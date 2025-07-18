import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Create newsletter subscription in Sanity
    const response = await client.create({
      _type: 'newsletterSubscription',
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}