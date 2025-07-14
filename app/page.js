import Home from "@/components/Home";

// Define API endpoints
const ENDPOINTS = {
  homeDetail: "setting/",
  sliders: "banners/",
  services: "service-categories/",
  aboutUs: "About/",
  approch: "approch/",
  team: "team-members/",
  testimonials: "testimonials/",
  news: "news-articles/",
  contact: "contact/",
  whyus: "whyus/",
  social: "social-media-links/",
  accreditation: "certifications/",
};

// Fetch function
async function fetchData(endpoint) {
  const serverUrl = process.env.NEXT_PUBLIC_DJANGO_URLS;
  if (!serverUrl) {
    throw new Error("Server URL is not defined in environment variables.");
  }

  try {
    const response = await fetch(`${serverUrl}${endpoint}`, {
  next: endpoint === "contact/" || endpoint==='whyus/' || endpoint==='setting/' || endpoint==='social-media-links/' || endpoint==='certifications//' ?  { revalidate: 20 } : { revalidate: 90 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null; // Handle errors gracefully
  }
}

// Fetch all data in parallel
async function fetchInitialDetails() {
  const data = await Promise.all(
    Object.values(ENDPOINTS).map((endpoint) => fetchData(endpoint))
  );

  return Object.keys(ENDPOINTS).reduce((acc, key, index) => {
    acc[key] = data[index];
    return acc;
  }, {});
}

// ✅ Server Component that fetches data
export default async function Page() {
  const initialData = await fetchInitialDetails();

  if (!initialData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <Home homeDetail={initialData} />;
}