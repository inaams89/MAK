// sanity/client.js
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-07-11',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_WRITE_TOKEN, // Required for mutations
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export const sanitySerializers = {
  types: {
    image: ({ node }) => {
      const imageUrl = node.asset ? urlFor(node.asset).url() : '/default-placeholder.jpg';
      return (
        <img
          src={imageUrl}
          alt={node.alt || 'Image'}
          style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
          className="my-4 max-w-full"
        />
      );
    },
  },
  marks: {
    link: ({ mark, children }) => (
      <a
        href={mark.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 hover:underline"
      >
        {children}
      </a>
    ),
  },
};