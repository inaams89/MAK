import JobVacancyClient from '@/components/JobVacancyClient';
import { client, urlFor } from '@/sanity/client';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const job = await client.fetch(
    `*[_type == "jobVacancy" && slug.current == $slug][0]{
      title,
      seo {
        metaName,
        metaDescription,
        keywords
      },
      image
    }`,
    { slug }
  );

  return {
    title: job?.seo?.metaName || job?.title || 'Job Vacancy',
    description: job?.seo?.metaDescription || 'Join our team today!',
    keywords: job?.seo?.keywords?.join(', ') || 'job, vacancy, career, employment',
    openGraph: {
      title: job?.seo?.metaName || job?.title,
      description: job?.seo?.metaDescription || 'Join our team today!',
      images: job?.image ? [{ url: urlFor(job.image).url() }] : [],
      type: 'website',
    },
  };
}

export default async function JobVacancyPage({ params }) {
  const { slug } = params;

  // Fetch job data
  const job = await client.fetch(
    `*[_type == "jobVacancy" && slug.current == $slug][0] {
      _id,
      title,
      description,
      location,
      postedDate,
      applicationDeadline,
      image,
      seo {
        metaName,
        metaDescription,
        keywords
      }
    }`,
    { slug }
  );

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl text-red-600 font-semibold animate-pulse">
          Job not found
        </p>
      </div>
    );
  }

  // Preprocess the image URL to avoid passing urlFor
  const jobWithImageUrl = {
    ...job,
    imageUrl: job.image ? urlFor(job.image).url() : null,
  };

  return <JobVacancyClient job={jobWithImageUrl} />;
}