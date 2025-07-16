/** @type {import('next').NextConfig} */
const nextConfig = {
  
      images: {
        domains: ['157.245.40.103','encrypted-tbn0.gstatic.com','usercontent.one','cdn.sanity.io'],
      },
      
      compiler: { removeConsole: true } ,
      experimental: {
        scrollRestoration: true, // Enables back/forward cache
      },
      productionBrowserSourceMaps: false, // Prevents large source maps in production
      webpack: (config) => {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxSize: 200000, // Split files larger than 200KB
        };
        return config;
      },
  };
  
  export default nextConfig;