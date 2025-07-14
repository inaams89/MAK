import Contact from "@/components/Contact";
import Home from "@/components/Home";
import News from "@/components/NewsComponent";
import ServiceArea from "@/components/ServiceArea";
import Services from "@/components/ServiceComponet";
// Define all endpoints in a single object for easy management
const ENDPOINTS = {
  homeDetail: "setting/",
 
};

// Helper function to fetch data from a given endpoint
async function fetchData(endpoint) {
  const serverUrl = process.env.NEXT_PUBLIC_DJANGO_URLS;
  if (!serverUrl) {
    throw new Error("Server URL is not defined in environment variables.");
  }

  const response = await fetch(`${serverUrl}${endpoint}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
  return response.json();
}

// Fetch all initial data in parallel
export async function fetchInitialDetails() {
  try {
    const data = await Promise.all(
      Object.values(ENDPOINTS).map((endpoint) => fetchData(endpoint))
    );

    // Map the fetched data to the corresponding keys
    const initialData = Object.keys(ENDPOINTS).reduce((acc, key, index) => {
      acc[key] = data[index];
      return acc;
    }, {});

    return initialData;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return null;
  }
}

export default async function Page() {
  
  const initialData = await fetchInitialDetails();

  // if (!initialData) {
  //   return <div>Error loading data. Please try again later.</div>;
  // }

  return <Contact homeDetail={initialData} />;


}