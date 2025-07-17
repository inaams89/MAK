// app/api/submit-application/route.js
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const application = await req.json();
    await client.create(application);
    return NextResponse.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({
      error: error.message.includes('unauthorized')
        ? 'Authentication error. Please check Sanity token.'
        : 'Failed to submit application. Please try again.',
    }, { status: 500 });
  }
}
