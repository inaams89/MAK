
import NewsDetail from "@/components/NewsDetails";



export async function fetchInitialdetails(slug) {
  const serverurls = process.env.NEXT_PUBLIC_DJANGO_URL;
 
 
  try {
    
    const response = await fetch(`${serverurls}new/${slug}/`);
    const data = await response.json();
    console.log("data",response)

// console.log("data",response)
//     const result = await response.json();
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




  return <NewsDetail initialservice ={initialservice}  />;
}




