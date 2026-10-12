import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found section-shell" aria-labelledby="not-found-title">
      <p className="eyebrow">404 · Page not found</p>
      <h1 id="not-found-title">This page isn’t here.</h1>
      <p>Check the address, or return to Home.</p>
      <Link className="button button-primary" to="/">
        Back to Home <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
