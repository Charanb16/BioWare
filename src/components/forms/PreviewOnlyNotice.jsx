export default function PreviewOnlyNotice({ status, title = 'Nothing was sent.' }) {
  if (status !== 'preview-only') {
    return null;
  }

  return (
    <section className="inquiry-preview-result" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>Nothing was sent or uploaded. Your details and selected filenames will be cleared when you leave this page.</p>
    </section>
  );
}
