// app/api/upload-cv/route.js
import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { file, filename } = await req.json();
    const fileBuffer = Buffer.from(file, 'base64');
    const cvAsset = await client.assets.upload('file', fileBuffer, { filename });

    return NextResponse.json({ assetId: cvAsset._id });
  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json({
      error: error.message.includes('unauthorized')
        ? 'Authentication error. Please check Sanity token.'
        : 'Failed to upload CV. Please try again.',
    }, { status: 500 });
  }
}
