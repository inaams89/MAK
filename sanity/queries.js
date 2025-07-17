// lib/queries.js
export const settingsQuery = `*[_type == "settingContent"][0] {
  phone,
  email,
  facedbook,
  xurl,
  instagram,
  linkedin,
  addresstitle,
  city,
  house,
  street,
  address,

}`;

export const serviceCategoriesQuery = `*[_type == "serviceCategory"] {
  _id,
  name,
  slug,
  "subServices": *[_type == "service" && references(^._id)] {
    _id,
    title,
    slug
  }
}`;

export const serviceAreasQuery = `*[_type == "serviceArea"] {
  _id,
  area,
  slug
}`;
export const footerLinksQuery = `*[_type == "footerLink" && isActive == true] | order(order asc) {
  _id,
  name,
  url
}`;

export const footerContentQuery = `*[_type == "footerContent" && isActive == true][0] {
  title,
  content
}`;

// Optional: If you have a `news` schema
export const newsQuery = `*[_type == "newsArticle"] | order(publishedDate desc) [0...3] {
  _id,
  title,
  slug,
  author,
publishedDate,
}`;

export async function getJobBySlug(slug) {
  const query = `*[_type == "jobVacancy" && slug.current == $slug][0]`;
  return client.fetch(query, { slug });
}

export async function getAllJobSlugs() {
  const query = `*[_type == "jobVacancy"]{ "slug": slug.current }`;
  return client.fetch(query);
}