export default function BrandLogo({ variant = 'header' }) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <img className="brand-logo__mark" src="/bioware-logo.svg" alt="" aria-hidden="true" />
      <span className="brand-logo__wordmark">BIOWARE</span>
    </span>
  );
}
