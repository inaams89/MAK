// app/services/page.js
import { client } from '@/sanity/client'; // Adjust the path to your Sanity client
import Services from "@/components/ServiceComponet";

export async function fetchInitialDetails() {
  try {
    // Fetch the first serviceSeo document
    const query = `*[_type == "seo" && type == "serviceSeo"][0]`;
    const data = await client.fetch(query);

    if (!data) {
      console.error('No serviceSeo data found');
      return null;
    }

    return data;
  } catch (error) {
    console.error('An error occurred while fetching serviceSeo:', error);
    return null;
  }
}

export default async function Page() {
  const initialService = await fetchInitialDetails();

  return <Services service={initialService} />;
}