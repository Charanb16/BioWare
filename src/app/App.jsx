import { Route, Routes } from 'react-router-dom';
import BrandSplash from '../components/brand/BrandSplash.jsx';
import BrandSplashBoundary from '../components/brand/BrandSplashBoundary.jsx';
import SiteLayout from '../layouts/SiteLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProductsPage from '../pages/ProductsPage.jsx';
import CategoryPage from '../pages/CategoryPage.jsx';
import RequestQuotePage from '../pages/RequestQuotePage.jsx';
import SampleRequestPage from '../pages/SampleRequestPage.jsx';
import CustomManufacturingPage from '../pages/CustomManufacturingPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categorySlug" element={<CategoryPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />
          <Route path="/request-sample" element={<SampleRequestPage />} />
          <Route path="/custom-manufacturing" element={<CustomManufacturingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <BrandSplashBoundary>
        <BrandSplash />
      </BrandSplashBoundary>
    </>
  );
}
