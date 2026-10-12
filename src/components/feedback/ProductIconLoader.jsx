import { categoryFixtures } from '../../data/fixtures/categories.js';

function CategoryGlyph({ slug }) {
  switch (slug) {
    case 'cutlery':
      return <><path d="M6 3v8m3-8v5.5a3 3 0 0 1-3 3V21m10-18v18m0-18c2.4 2.5 3 5 3 8h-3" /></>;
    case 'coffee-cups':
      return <><path d="M4 5h13v10a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5Zm13 3h2a3 3 0 0 1 0 6h-2M3 22h16" /></>;
    case 'bowls-plates':
      return <><path d="M3 11a9 9 0 0 0 18 0H3Zm3 5h12m-9 4h6m-3-17v2" /></>;
    case 'food-packaging':
      return <><path d="m3 7 9-4 9 4v12l-9 3-9-3V7Zm0 0 9 4 9-4m-9 4v11m-4-15 9 4" /></>;
    default:
      return <><circle cx="12" cy="12" r="8" /><path d="M7 13c2-4 7-6 10-4-1 5-4 8-8 8" /></>;
  }
}

export default function ProductIconLoader({ message = 'Loading products…' }) {
  return (
    <div className="product-icon-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="product-icon-loader__icons" aria-hidden="true">
        {categoryFixtures.map((category) => (
          <span className="product-icon-loader__item" key={category.slug}>
            <svg className="product-icon-loader__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <CategoryGlyph slug={category.slug} />
            </svg>
          </span>
        ))}
      </div>
      <p className="product-icon-loader__message">{message}</p>
    </div>
  );
}
