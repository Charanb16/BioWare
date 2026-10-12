export default function ConnectionError({
  title = "We couldn't connect right now.",
  message = 'Please try again in a moment.',
  onRetry,
  retryLabel = 'Retry',
  retrying = false,
}) {
  return (
    <section className="connection-error" role="alert" aria-live="assertive" aria-atomic="true">
      <span className="connection-error__mark" aria-hidden="true">!</span>
      <div className="connection-error__content">
        <h2>{title}</h2>
        <p>{message}</p>
        {typeof onRetry === 'function' && (
          <button className="button button-secondary" type="button" onClick={onRetry} disabled={retrying}>
            {retrying ? 'Retrying…' : retryLabel}
          </button>
        )}
      </div>
    </section>
  );
}
