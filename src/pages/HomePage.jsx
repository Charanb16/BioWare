import { Link } from 'react-router-dom';
import CategoryCard from '../components/products/CategoryCard.jsx';
import { categoryFixtures } from '../data/fixtures/categories.js';

export default function HomePage() {
  return (
    <>
      <section id="top" className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          {/* <p className="eyebrow"><span className="eyebrow-dot" /> Biodegradable products · Business enquiries</p> */}
          <h1 id="hero-title">Useful materials start with <em>better options.</em></h1>
          <p className="hero-lede">
           Thoughtful products engineered from renewable agro-resources. Explore our categories to see how we fit your business needs.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/products">
              Browse categories <span aria-hidden="true">↗</span>
            </Link>
            {/* <Link className="text-link" to="/request-quote">
              Request a quote <span aria-hidden="true">↗</span>
            </Link> */}
          </div>
        </div>

        {/* <div className="hero-art" role="img" aria-label="An abstract leaf mark framed by botanical orbit lines.">
          <div className="art-topline"><span>BioWare</span><span>B2B</span></div>
          <div className="orbit orbit-outer" aria-hidden="true" />
          <div className="orbit orbit-inner" aria-hidden="true" />
          <div className="art-seed" aria-hidden="true">
            <svg viewBox="0 0 84 104">
              <path d="M42 91V35M42 59C22 59 12 48 12 29c19 0 30 11 30 30Zm0-14c0-19 11-30 30-30 0 19-11 30-30 30Z" />
              <path d="M25 91h34" />
            </svg>
          </div>
          <div className="art-caption">
            <span>AGRICULTURAL MATERIALS</span>
            <span aria-hidden="true" className="caption-rule" />
            <span>BUSINESS NEEDS</span>
          </div>
        </div> */}
        <img className="hero-art" src="/Hero-img.png" alt="." />
      </section>

      <section className="home-category-section section-shell" aria-labelledby="home-categories-title">
        <div className="home-category-heading">
          <div>
            <p className="eyebrow">Product categories</p>
            <h2 id="home-categories-title">Explore by category.</h2>
            <p>Choose a category to explore, or share what your business is looking for.</p>
          </div>
        </div>
        <ul className="category-grid home-category-grid" aria-label="Product categories">
          {categoryFixtures.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </ul>
        {/* <p className="home-category-disclosure">
          Category images are concept illustrations, not product photography. Product details and availability are being confirmed.
        </p> */}
      </section>
    </>
  );
}
