// app/areas-covered/[slug]/page.jsx
import { client } from "@/sanity/client";
import ServicesAreaDetail from "@/components/ServiceAreaDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const serviceArea = await client.fetch(
    `*[_type == "serviceArea" && slug.current == $slug][0]{
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

  if (!serviceArea) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: serviceArea.seo?.metaName || serviceArea.title || "Mak Security UK | Professional Security Solutions",
    description:
      serviceArea.seo?.metaDescription ||
      "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
    keywords: serviceArea.seo?.keywords?.join(", ") || [
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
    ],
    openGraph: {
      title: serviceArea.seo?.metaName || serviceArea.title || "Mak Security UK | Professional Security Solutions",
      description:
        serviceArea.seo?.metaDescription ||
        "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
      url: `https://mak-security-uk/areas-covered/${slug}`,
      images: [serviceArea.image || "/images/mak-security-logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: serviceArea.seo?.metaName || serviceArea.title || "Mak Security UK | Professional Security Solutions",
      description:
        serviceArea.seo?.metaDescription ||
        "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
      images: [serviceArea.image || "/images/mak-security-logo.png"],
    },
  };
}

export async function fetchInitialDetails(slug) {
  try {
    const data = await client.fetch(
      `*[_type == "serviceArea" && slug.current == $slug][0]{
        area,
        title,
        subtitle,
        description,
        description2,
        "image": image.asset->url,
        images[] {
          asset->{
            url
          },
          alt
        },
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
      console.error("No service area found for slug:", slug);
      return null;
    }

    return data;
  } catch (error) {
    console.error("An error occurred while fetching service area:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const initialservice = await fetchInitialDetails(slug);

  if (!initialservice) {
    notFound();
  }

  return <ServicesAreaDetail initialservice={initialservice} />;
}
