// pages/index.js
import { client } from '@/sanity/client';
import Home from '@/components/Home';

// GROQ queries for each content type
const QUERIES = {
  homeDetail: `*[_type == "settingContent"][0] {
    title,
    sutitle,
    phone,
    email,
    addresstitle,
    city,
    house,
    street,
    address,
    xurl,
    instagram,
    facedbook,
    linkedin,
    copyrights,
    content,
    content2,
    content3,
    seo
  }`,
  sliders: `*[_type == "banner" && isActive == true] | order(order asc) {
    title,
    image {
      asset-> {
        url
      }
    },
    link,
    order,
    isActive
  }`,
  services: `*[_type == "serviceCategory"] {
    name,
    title,
    sutitle,
    description,
    description2,
    description3,
    image {
      asset-> {
        url
      }
    },
    slug,
    seo,
    address,
    latitude,
    longitude
  }`,
  aboutUs: `*[_type == "about"][0] {
    title,
    sutitle,
    content,
    image {
      asset-> {
        url
      }
    },
    seo
  }`,
  approch: `*[_type == "approch"] {
    title,
    content,
    image {
      asset-> {
        url
      }
    }
  }`,
  team: `*[_type == "teamMember"] {
    name,
    role,
    bio,
    photo {
      asset-> {
        url
      }
    },
    seo
  }`,
  testimonials: `*[_type == "testimonial"] {
    clientName,
    feedback,
    date,
    seo
  }`,
  news: `*[_type == "newsArticle"] {
    title,
    subtitle,
    content,
    description2,
    publishedDate,
    author,
    image {
      asset-> {
        url
      }
    },
    slug,
    seo
  }`,
  contact: `*[_type == "contact"][0] {
    title,
    sutitle,
    content,
    image {
      asset-> {
        url
      }
    },
    seo
  }`,
  whyus: `*[_type == "whyUs"][0] {
    title,
    content,
    benefits[]-> {
      title,
      icon,
      description
    }
  }`,
  social: `*[_type == "socialMediaLink"] {
    platform,
    url,
    icon {
      asset-> {
        url
      }
    },
    seo
  }`,
  accreditation: `*[_type == "certification"] {
    name,
    description,
    logo {
      asset-> {
        url
      }
    },
    obtainedDate,
    seo
  }`,
};

// Fetch function using Sanity client
async function fetchData(query) {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error(`Error fetching data for query ${query}:`, error);
    return null; // Handle errors gracefully
  }
}

// Fetch all data in parallel
async function fetchInitialDetails() {
  const data = await Promise.all(
    Object.values(QUERIES).map((query) => fetchData(query))
  );

  return Object.keys(QUERIES).reduce((acc, key, index) => {
    acc[key] = data[index];
    return acc;
  }, {});
}

// Server Component that fetches data
export default async function Page() {
  const initialData = await fetchInitialDetails();
  console.log("hiiiiiiiiiiiiiiiii")

  if (!initialData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <Home homeDetail={initialData} />;
}