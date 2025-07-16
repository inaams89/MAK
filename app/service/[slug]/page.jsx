// app/service/[slug]/page.js
import ServicesSlug from "@/components/ServiceSlug";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = await client.fetch(
    `*[_type == "serviceCategory" && slug.current == $slug][0]{
      title,
      seo {
        metaName,
        metaDescription,
        keywords
      },
      "image": image.asset->url
    }`,
    { slug }
  );

  if (!service) {
    return {
      title: "Page Not Found",
    };
  }

  const defaultDescription =
    "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.";

  const defaultKeywords = [
    "security services",
    "manned guarding",
    "CCTV surveillance",
    "alarm response",
    "security consultancy",
    "UK security",
    "property security",
    "commercial security",
    "event security",
    "Mak Security UK",
  ];

  const metaTitle = service.seo?.metaName || service.title || "Mak Security UK | Professional Security Solutions";
  const metaDescription = service.seo?.metaDescription || defaultDescription;
  const metaKeywords = Array.isArray(service.seo?.keywords) ? service.seo.keywords.join(", ") : defaultKeywords.join(", ");
  const metaImage = service.image || "/images/mak-security-logo.png";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://mak-security-uk/service/${slug}`,
      images: [metaImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  };
}

export async function fetchInitialDetails(slug) {
  console.log("Fetching service with slug:", slug);
  try {
    const data = await client.fetch(
      `*[_type == "serviceCategory" && slug.current == $slug][0]{
        name,
        title,
        subtitle,
        description,
        description2,
        description3,
        "image": image.asset->url,
        seo {
          metaName,
          metaDescription,
          keywords
        },
        address,
        latitude,
        longitude
      }`,
      { slug }
    );

    if (!data) {
      console.error("No service found for slug:", slug);
      return null;
    }

    return data;
  } catch (error) {
    console.error("An error occurred while fetching service:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const initialService = await fetchInitialDetails(slug);

  if (!initialService) {
    notFound();
  }

  return <ServicesSlug initialservice={initialService} />;
}
