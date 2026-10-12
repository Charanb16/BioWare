export function searchCategories(categories, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return categories;
  }

  return categories.filter(({ name, slug }) => {
    const searchableText = `${name} ${slug.replaceAll('-', ' ')}`.toLocaleLowerCase();
    return searchableText.includes(normalizedQuery);
  });
}
