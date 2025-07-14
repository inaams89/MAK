
import ServicesSlug from "@/components/ServiceSlug";



export async function fetchInitialdetails(slug) {
    console.log("slugs",slug)
  const serverurls = process.env.NEXT_PUBLIC_DJANGO_URL;
 
 
  try {
    
    const response = await fetch(`${serverurls}service-categorie/${slug}/`);
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Failed to fetch properties:", response.statusText);
      return null;
    }

    

    return data;

  } catch (error) {
    console.error("An error occurred while fetching properties:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = await params

  const initialservice = await fetchInitialdetails(slug);




  return <ServicesSlug initialservice ={initialservice}  />;
}




