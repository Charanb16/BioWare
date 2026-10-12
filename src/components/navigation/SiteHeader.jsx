import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo.jsx';

const navigation = [
  { label: 'Products', to: '/products' },
  { label: 'Request Samples', to: '/request-sample' },
  { label: 'Custom Manufacturing', to: '/custom-manufacturing' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="BioWare home">
          <BrandLogo />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close' : 'Open'} navigation menu</span>
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-action" to="/request-quote" onClick={closeMenu}>
            Request a Quote <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
