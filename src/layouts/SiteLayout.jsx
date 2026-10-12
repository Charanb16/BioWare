import { Outlet } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/navigation/SiteHeader.jsx';

export default function SiteLayout() {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
