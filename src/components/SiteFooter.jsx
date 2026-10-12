import { Link } from 'react-router-dom';
import BrandLogo from './brand/BrandLogo.jsx';
import { categoryFixtures } from '../data/fixtures/categories.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-group">
          <Link className="footer-brand" to="/" aria-label="BioWare home">
            <BrandLogo variant="footer" />
          </Link>
          <p>Product exploration and business enquiries.</p>
          <p className="footer-disclosure">Category images are illustrative, not product photography.</p>
        </div>

        <nav className="footer-link-group" aria-label="Product categories">
          <h2 className="footer-group-title">Explore categories</h2>
          <ul className="footer-link-list">
            {categoryFixtures.map((category) => (
              <li key={category.slug}>
                <Link to={`/products/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
