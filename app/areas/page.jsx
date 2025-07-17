import { client } from '@/sanity/client';

export default async function ServiceAreasPage() {
  const serviceAreas = await client.fetch(`*[_type == "serviceArea"]{title, slug, description, image}`);
  return (
    <div>
      <h1>Service Areas</h1>
      {serviceAreas.map((area) => (
        <div key={area.slug.current}>
          <h2>{area.title}</h2>
          {area.image && <img src={area.image.asset.url} alt={area.title || 'Service Area image'} />}
        </div>
      ))}
    </div>
  );
}