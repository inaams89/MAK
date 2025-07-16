// app/areas-covered/page.js
import { client } from '@/sanity/client'; // Adjust the path to your Sanity client
import ServiceArea from '@/components/ServiceArea';

export async function fetchInitialDetails() {
  try {
    // Fetch the first serviceAreaSeo document
    const query = `*[_type == "seo" && type == "serviceAreaSeo"][0]`;
    const data = await client.fetch(query);

    if (!data) {
      console.error('No serviceAreaSeo data found');
      return null;
    }

    return data;
  } catch (error) {
    console.error('An error occurred while fetching serviceAreaSeo:', error);
    return null;
  }
}

export default async function Page() {
  const initialService = await fetchInitialDetails();

  return <ServiceArea service={initialService} />;
}