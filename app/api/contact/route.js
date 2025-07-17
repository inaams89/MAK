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
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, filename } = req.body; // Assumes file is sent as a base64 string or buffer
    const fileBuffer = Buffer.from(file, 'base64'); // Convert base64 to buffer
    const cvAsset = await client.assets.upload('file', fileBuffer, {
      filename,
    });
    return res.status(200).json({ assetId: cvAsset._id });
  } catch (error) {
    console.error('Error uploading CV:', error);
    return res.status(500).json({
      error: error.message.includes('unauthorized')
        ? 'Authentication error. Please check Sanity token.'
        : 'Failed to upload CV. Please try again.',
    });
  }
}

// pages/api/submit-application.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const application = req.body;
    await client.create(application);
    return res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({
      error: error.message.includes('unauthorized')
        ? 'Authentication error. Please check Sanity token.'
        : 'Failed to submit application. Please try again.',
    });
  }
}