// lib/sanitySerializers.js
export const sanitySerializers = {
  types: {
    image: ({ node }) => (
      <img
        src={node.asset?.url || '/default-placeholder.jpg'}
        alt={node.alt || 'Image'}
        style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
        className="my-4"
      />
    ),
    // Add other custom types if needed (e.g., code, video)
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