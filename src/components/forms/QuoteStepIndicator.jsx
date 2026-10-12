const steps = ['Products', 'Requirements', 'Business details', 'Review'];

export default function QuoteStepIndicator({ currentStep }) {
  return (
    <ol className="quote-step-indicator" aria-label="Quote request steps">
      {steps.map((label, index) => (
        <li
          className={index === currentStep ? 'is-current' : index < currentStep ? 'is-complete' : ''}
          key={label}
        >
          <span className="quote-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span aria-current={index === currentStep ? 'step' : undefined}>{label}</span>
        </li>
      ))}
    </ol>
  );
}
