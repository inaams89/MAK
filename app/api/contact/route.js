// app/api/contact/route.js
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Environment Variables:', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_WRITE_TOKEN ? 'Present' : 'Missing',
  });

  try {
    const { name, email, subject, phone, postCode, businessName, message } = await req.json();

    // Validate required fields
    if (!name || !email ||  !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Save to Sanity
    await client.create({
      _type: 'inquiry',
      name,
      email,
      subject,
      phone,
      postCode,
      businessName,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving inquiry:', error.message, error.stack);
    return NextResponse.json({ message: 'Error saving message', error: error.message }, { status: 500 });
  }
}
