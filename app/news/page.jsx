// app/news/page.jsx
import News from '@/components/NewsComponent';
import { client } from '@/sanity/client';

export async function generateMetadata() {
  const newsSeo = await client.fetch(
    `*[_type == "seo" && type == "newsSeo"][0]{
      metaName,
      metaDescription,
      keywords
    }`
  );

  return {
    title: newsSeo?.metaName || 'Mak Security UK | Latest News & Articles',
    description:
      newsSeo?.metaDescription ||
      'Stay updated with the latest news and articles from Mak Security UK, covering security services, industry insights, and more.',
    keywords: newsSeo?.keywords?.join(', ') || [
      'security services',
      'manned guarding',
      'CCTV surveillance',
      'alarm response',
      'security consultancy',
      'UK security',
      'property security',
      'commercial security',
      'event security',
      'Mak Security UK',
    ],
    openGraph: {
      title: newsSeo?.metaName || 'Mak Security UK | Latest News & Articles',
      description:
        newsSeo?.metaDescription ||
        'Stay updated with the latest news and articles from Mak Security UK, covering security services, industry insights, and more.',
      url: 'https://mak-security-uk/news',
      images: ['/images/mak-security-logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: newsSeo?.metaName || 'Mak Security UK | Latest News & Articles',
      description:
        newsSeo?.metaDescription ||
        'Stay updated with the latest news and articles from Mak Security UK, covering security services, industry insights, and more.',
      images: ['/images/mak-security-logo.png'],
    },
  };
}

export async function fetchNewsArticles() {
  try {
    const articles = await client.fetch(`
      *[_type == "newsArticle"] | order(publishedDate desc) {
        title,
        subtitle,
        slug,
        "image": image.asset->url,
        image { alt },
        publishedDate
      }
    `);

    if (!articles || articles.length === 0) {
      console.error('No news articles found');
      return [];
    }

    return articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

export async function fetchNewsSeo() {
  try {
    const newsSeo = await client.fetch(`
      *[_type == "seo" && type == "newsSeo"][0]{
        metaName,
        metaDescription,
        keywords
      }
    `);
    return newsSeo || null;
  } catch (error) {
    console.error('Error fetching newsSeo:', error);
    return null;
  }
}

export default async function Page() {
  const newsArticles = await fetchNewsArticles();
  const newsSeo = await fetchNewsSeo();

  return <News news={newsSeo} services={newsArticles} />;
}
