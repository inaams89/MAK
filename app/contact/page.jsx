// app/contact/page.jsx
import { client } from '@/sanity/client';
import Contact from '@/components/Contact';

export async function generateMetadata() {
  const contactData = await client.fetch(
    `*[_type == "contact"][0]{
      title,
      seo {
        metaName,
        metaDescription,
        keywords
      }
    }`
  );

  return {
    title: contactData?.seo?.metaName || 'Mak Security UK | Contact Us',
    description:
      contactData?.seo?.metaDescription ||
      'Get in touch with Mak Security UK for professional security solutions, including manned guarding, CCTV surveillance, and more.',
    keywords:
      contactData?.seo?.keywords?.join(', ') ||
      'security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK',
    openGraph: {
      title: contactData?.seo?.metaName || 'Mak Security UK | Contact Us',
      description:
        contactData?.seo?.metaDescription ||
        'Get in touch with Mak Security UK for professional security solutions.',
      url: 'https://mak-security-uk/contact',
      images: ['/images/mak-security-logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: contactData?.seo?.metaName || 'Mak Security UK | Contact Us',
      description:
        contactData?.seo?.metaDescription ||
        'Get in touch with Mak Security UK for professional security solutions.',
      images: ['/images/mak-security-logo.png'],
    },
  };
}

export async function fetchContactData() {
  try {
    const contactData = await client.fetch(
      `*[_type == "contact"][0]{
        title,
        subtitle,
        content,
        "image": image.asset->url,
        image { alt },
        email,
        phone,
        address,
        seo {
          metaName,
          metaDescription,
          keywords
        }
      }`,
      {},
      { next: { revalidate: 60 } }
    );

    if (!contactData) {
      console.error('No contact data found');
      return null;
    }

    return contactData;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return null;
  }
}

export default async function Page() {
  const contactData = await fetchContactData();


  return <Contact contactData={contactData} />;
}
