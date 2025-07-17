// components/Acccard.jsx
'use client';

import Image from 'next/image';

export default function AccradationCard({ accreditation }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      {accreditation.logo && (
        <Image
          src={accreditation.logo}
          alt={accreditation.name || 'accreadtion'}
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
      )}
      <h3 className="text-xl font-bold">{accreditation.name}</h3>
      <p className="text-gray-500">{accreditation.description}</p>
      <p className="text-sm text-gray-400">{accreditation.obtainedDate}</p>
    </div>
  );
}