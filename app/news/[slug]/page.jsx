// app/news/[slug]/page.jsx
import NewsDetail from '@/components/NewsDetails';
import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await client.fetch(
    `*[_type == "newsArticle" && slug.current == $slug][0]{
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

  if (!article) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: article.seo?.metaName || article.title || 'Mak Security UK | News Article',
    description:
      article.seo?.metaDescription || 'Read the latest news and articles from Mak Security UK.',
    keywords:
      article.seo?.keywords?.join(', ') ||
      'security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK',
    openGraph: {
      title: article.seo?.metaName || article.title || 'Mak Security UK | News Article',
      description:
        article.seo?.metaDescription || 'Read the latest news and articles from Mak Security UK.',
      url: `https://mak-security-uk/news/${slug}`,
      images: [article.image || '/images/mak-security-logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo?.metaName || article.title || 'Mak Security UK | News Article',
      description:
        article.seo?.metaDescription || 'Read the latest news and articles from Mak Security UK.',
      images: [article.image || '/images/mak-security-logo.png'],
    },
  };
}

export async function fetchInitialDetails(slug) {
  console.log('Fetching news article with slug:', slug);
  try {
    const article = await client.fetch(
      `*[_type == "newsArticle" && slug.current == $slug][0]{
        title,
        subtitle,
        content,
        description2,
        "image": image.asset->url,
        image { alt },
        publishedDate,
        author,
        seo {
          metaName,
          metaDescription,
          keywords
        }
      }`,
      { slug }
    );

    if (!article) {
      console.error('No news article found for slug:', slug);
      return null;
    }

    return article;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const initialservice = await fetchInitialDetails(slug);

  if (!initialservice) {
    notFound();
  }

  return <NewsDetail initialservice={initialservice} />;
}
