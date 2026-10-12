import { categoryFixtures } from '../../data/fixtures/categories.js';
import FieldError from './FieldError.jsx';

export default function CategoryChooser({
  idPrefix,
  selectedSlugs,
  notSure,
  error,
  onToggle,
  onNotSureChange,
  legendText = 'Which category are you asking about?',
  helpText = 'Choose all categories that apply.',
  notSureText = 'Not sure yet — I’d like help choosing.',
}) {
  const errorId = `${idPrefix}-category-error`;

  return (
    <fieldset className="quote-fieldset" aria-describedby={error ? errorId : undefined}>
      <legend>{legendText}</legend>
      <p className="form-help">{helpText}</p>
      <div className="quote-category-options">
        {categoryFixtures.map((category) => (
          <label className="quote-category-option" key={category.slug}>
            <input
              type="checkbox"
              checked={selectedSlugs.includes(category.slug)}
              onChange={() => onToggle(category.slug)}
            />
            <span className="quote-category-option-copy">
              <strong>{category.name}</strong>
            </span>
            <span className="quote-option-number" aria-hidden="true">{category.number}</span>
          </label>
        ))}
      </div>
      <label className="quote-not-sure">
        <input type="checkbox" checked={notSure} onChange={(event) => onNotSureChange(event.target.checked)} />
        <span>{notSureText}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
