import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <li className="category-card">
      <Link className="category-card-link" to={`/products/${category.slug}`}>
        <span className={`category-visual category-art--${category.tone}`}>
          <img
            className="category-visual-image"
            src={category.image}
            alt={category.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="category-card-copy">
          <span className="category-card-title">{category.name}</span>
          <span className="category-card-action">Explore category <span aria-hidden="true">↗</span></span>
        </span>
      </Link>
    </li>
  );
}
