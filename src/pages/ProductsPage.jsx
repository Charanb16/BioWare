import { useMemo, useState } from 'react';
import CategoryCard from '../components/products/CategoryCard.jsx';
import { categoryFixtures } from '../data/fixtures/categories.js';
import { searchCategories } from '../features/catalog/catalogUtils.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  useDocumentTitle('Products | BioWare');

  const visibleCategories = useMemo(
    () => searchCategories(categoryFixtures, query),
    [query],
  );

  return (
    <div className="products-page">
      <section className="products-intro section-shell" aria-labelledby="products-title">
        <div className="products-intro-main">
          {/* <p className="eyebrow"><span className="eyebrow-dot" /> Product categories</p> */}
          <h1 id="products-title">Explore by <em>category.</em></h1>
          <p className="products-intro-copy">
            Find a starting point for your business inquiry, or search for a category by name.
          </p>
        </div>
        <aside className="catalog-context" aria-label="Product information">
          <p>Product listings and specifications are not available yet. Category images are concept illustrations, not product photography.</p>
        </aside>
      </section>

      <section className="category-explorer section-shell" aria-labelledby="category-list-title">
        <div className="category-toolbar">
          <div>
            <p className="eyebrow">Browse categories</p>
            <h2 id="category-list-title">Find a place to start.</h2>
          </div>
          <label className="category-search">
            <span>Search categories</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “cups” or “cutlery” or “bowls” or “plates” or “boxes”"
              autoComplete="off"
            />
          </label>
        </div>

        <p className="category-result-count" aria-live="polite">
          {visibleCategories.length} {visibleCategories.length === 1 ? 'category' : 'categories'} shown
        </p>

        {visibleCategories.length > 0 ? (
          <ul className="category-grid" aria-label="Product categories">
            {visibleCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </ul>
        ) : (
          <div className="category-empty" role="status">
            <span className="empty-index">00</span>
            <div>
              <h3>No category matches that search.</h3>
              <p>Try another term or clear the search to see every category.</p>
            </div>
            <button className="text-button" type="button" onClick={() => setQuery('')}>
              Clear search <span aria-hidden="true">↺</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
