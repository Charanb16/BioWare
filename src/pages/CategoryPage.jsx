import { Link, useParams } from 'react-router-dom';
import { categoryFixtures } from '../data/fixtures/categories.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categoryFixtures.find((item) => item.slug === categorySlug);
  useDocumentTitle(category ? `${category.name} | BioWare` : 'Category not found | BioWare');

  if (!category) {
    return <NotFoundPage />;
  }

  return (
    <div className="category-page">
      <nav className="breadcrumbs section-shell" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li aria-current="page">{category.name}</li>
        </ol>
      </nav>

      <section className="category-detail section-shell" aria-labelledby="category-title">
        <div className="category-detail-copy">
          <p className="eyebrow"></p>
          <h1 id="category-title">{category.name}</h1>
          <p className="category-detail-intro">
            Explore this category and tell us what your business is looking for.
          </p>
          <Link className="button button-primary category-quote-cta" to="/request-quote" state={{ selectedCategorySlugs: [category.slug] }}>
            Request a Quote <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" to="/products">
            <span aria-hidden="true">←</span> Back to all categories
          </Link>
        </div>
        <figure className={`category-detail-visual category-art--${category.tone}`}>
          <img src={category.image} alt={category.imageAlt} />
          <figcaption>Concept illustration—not product photography</figcaption>
        </figure>
      </section>

      <section className="verified-products-empty section-shell" aria-labelledby="empty-products-title">
        <p className="eyebrow">Product information</p>
        <h2 id="empty-products-title">Details are being confirmed.</h2>
        <p>
          Product information is not available for this category yet. Use “Request a Quote” above to ask about your requirements.
        </p>
      </section>
    </div>
  );
}
