import { useCallback } from 'react';

export function useCategorySelection(values, updateField) {
  const selectedSlugs = values.selectedCategorySlugs;

  const toggleCategory = useCallback((slug) => {
    const selected = selectedSlugs.includes(slug);
    const nextSelection = selected
      ? selectedSlugs.filter((item) => item !== slug)
      : [...selectedSlugs, slug];
    updateField('selectedCategorySlugs', nextSelection, ['selectedCategorySlugs', 'categories']);
  }, [selectedSlugs, updateField]);

  const setCategoryNotSure = useCallback((value) => {
    updateField('categoryNotSure', value, ['categoryNotSure', 'categories']);
  }, [updateField]);

  return { toggleCategory, setCategoryNotSure };
}
