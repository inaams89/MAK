
import News from "@/components/NewsComponent";
import Services from "@/components/ServiceComponet";



export async function fetchInitialdetails() {

  const serverurls = process.env.NEXT_PUBLIC_DJANGO_URLS;
 
 
  try {
    
    const response = await fetch(`${serverurls}newseo/`);
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

export default async function Page() {

  const initialservice = await fetchInitialdetails();




  return <News news={initialservice[0]}  />;
}




