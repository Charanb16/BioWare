import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QuoteStepIndicator from '../components/forms/QuoteStepIndicator.jsx';
import CategoryChooser from '../components/forms/CategoryChooser.jsx';
import FieldError from '../components/forms/FieldError.jsx';
import { categoryFixtures } from '../data/fixtures/categories.js';
import { validateQuoteStep } from '../schemas/quoteRequestSchema.js';
import { submitInquiryPreview } from '../services/mocks/inquiryService.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useCategorySelection } from '../hooks/useCategorySelection.js';
import { useInquiryForm } from '../hooks/useInquiryForm.js';

const stepHeadings = [
  'What are you exploring?',
  'Share your requirements.',
  'A little about your business.',
  'Review your inquiry.',
];

const emptyDraft = {
  selectedCategorySlugs: [],
  categoryNotSure: false,
  productOrVariant: '',
  estimatedQuantity: '',
  quantityNotSure: false,
  frequency: 'not-sure',
  preferredPackaging: '',
  customization: '',
  additionalSpecifications: '',
  fullName: '',
  companyName: '',
  businessEmail: '',
  phone: '',
  deliveryLocation: '',
  businessType: '',
};

export default function RequestQuotePage() {
  const location = useLocation();
  const {
    values, errors, setErrors, status: previewStatus, setStatus: setPreviewStatus,
    submissionError, setSubmissionError, updateField, clearMessages,
  } = useInquiryForm(() => {
    const requested = Array.isArray(location.state?.selectedCategorySlugs)
      ? location.state.selectedCategorySlugs
      : [];
    const knownSlugs = new Set(categoryFixtures.map(({ slug }) => slug));
    return {
      ...emptyDraft,
      selectedCategorySlugs: requested.filter((slug) => knownSlugs.has(slug)),
    };
  });
  const [step, setStep] = useState(0);
  const updateValue = updateField;
  const { toggleCategory, setCategoryNotSure } = useCategorySelection(values, updateValue);
  useDocumentTitle('Request a Quote | BioWare');

  const selectedCategories = useMemo(
    () => categoryFixtures.filter(({ slug }) => values.selectedCategorySlugs.includes(slug)),
    [values.selectedCategorySlugs],
  );

  useEffect(() => {
    document.getElementById('quote-step-heading')?.focus();
  }, [step]);

  function changeStep(nextStep) {
    setStep(nextStep);
    clearMessages();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateQuoteStep(step, values);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      document.querySelector('.field-error')?.scrollIntoView({ block: 'center' });
      return;
    }

    if (step < 3) {
      changeStep(step + 1);
      return;
    }

    try {
      const result = await submitInquiryPreview();
      setPreviewStatus(result.status);
    } catch {
      setSubmissionError('Your inquiry was not sent. Please try again later.');
    }
  }

  return (
    <div className="quote-page">
      <section className="quote-intro section-shell" aria-labelledby="quote-page-title">
        <p className="eyebrow"><span className="eyebrow-dot" /> Business inquiry · Quote-led</p>
        <h1 id="quote-page-title">Let’s start with <em>what you need.</em></h1>
        <p>
          Tell us what your business needs. You can review your details before you finish.
        </p>
      </section>

      <section className="quote-shell section-shell" aria-label="Request a quote form">
        <QuoteStepIndicator currentStep={step} />

        <form className="quote-form" onSubmit={handleSubmit} noValidate>
          <div className="quote-form-heading" key={step}>
            <p className="eyebrow">Step {String(step + 1).padStart(2, '0')} / 04</p>
            <h2 id="quote-step-heading" tabIndex="-1">{stepHeadings[step]}</h2>
          </div>

          {step === 0 && (
            <CategoryChooser
              idPrefix="quote"
              selectedSlugs={values.selectedCategorySlugs}
              notSure={values.categoryNotSure}
              error={errors.categories}
              onToggle={toggleCategory}
              onNotSureChange={setCategoryNotSure}
              legendText="Choose one or more categories"
              helpText="Select the categories most relevant to your inquiry."
            />
          )}

          {step === 1 && (
            <div className="quote-fields">
              <label className="form-field">
                <span>Product or variant, if known</span>
                <input value={values.productOrVariant} onChange={(event) => updateValue('productOrVariant', event.target.value)} />
              </label>
              <div className="form-field-row">
                <label className="form-field">
                  <span>Estimated quantity</span>
                  <input value={values.estimatedQuantity} onChange={(event) => updateValue('estimatedQuantity', event.target.value)} disabled={values.quantityNotSure} />
                </label>
                <label className="form-field">
                  <span>Expected purchasing frequency</span>
                  <select value={values.frequency} onChange={(event) => updateValue('frequency', event.target.value)}>
                    <option value="not-sure">Not sure yet</option>
                    <option value="one-time">One-time</option>
                    <option value="recurring">Recurring</option>
                  </select>
                </label>
              </div>
              <label className="quote-not-sure">
                <input type="checkbox" checked={values.quantityNotSure} onChange={(event) => updateValue('quantityNotSure', event.target.checked)} />
                <span>Not sure yet — I’d like to discuss quantities.</span>
              </label>
              <label className="form-field">
                <span>Preferred packaging, if any</span>
                <input value={values.preferredPackaging} onChange={(event) => updateValue('preferredPackaging', event.target.value)} />
              </label>
              <label className="form-field">
                <span>Customization requirements, if applicable</span>
                <textarea rows="3" value={values.customization} onChange={(event) => updateValue('customization', event.target.value)} />
              </label>
              <label className="form-field">
                <span>Additional specifications</span>
                <textarea rows="4" value={values.additionalSpecifications} onChange={(event) => updateValue('additionalSpecifications', event.target.value)} />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="quote-fields">
              <div className="form-field-row">
                <label className="form-field">
                  <span>Full name <b aria-hidden="true">*</b></span>
                  <input required autoComplete="name" value={values.fullName} onChange={(event) => updateValue('fullName', event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'full-name-error' : undefined} />
                  <FieldError id="full-name-error" message={errors.fullName} />
                </label>
                <label className="form-field">
                  <span>Company name, if applicable</span>
                  <input autoComplete="organization" value={values.companyName} onChange={(event) => updateValue('companyName', event.target.value)} />
                </label>
              </div>
              <div className="form-field-row">
                <label className="form-field">
                  <span>Business email <b aria-hidden="true">*</b></span>
                  <input required type="email" autoComplete="email" value={values.businessEmail} onChange={(event) => updateValue('businessEmail', event.target.value)} aria-invalid={Boolean(errors.businessEmail)} aria-describedby={errors.businessEmail ? 'business-email-error' : undefined} />
                  <FieldError id="business-email-error" message={errors.businessEmail} />
                </label>
                <label className="form-field">
                  <span>Phone, if needed</span>
                  <input type="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateValue('phone', event.target.value)} />
                </label>
              </div>
              <label className="form-field">
                <span>Country and delivery location</span>
                <input autoComplete="country-name" value={values.deliveryLocation} onChange={(event) => updateValue('deliveryLocation', event.target.value)} />
              </label>
              <label className="form-field">
                <span>Business type</span>
                <input value={values.businessType} onChange={(event) => updateValue('businessType', event.target.value)} />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="quote-review">
              <div className="quote-review-section">
                <div className="quote-review-heading"><h3>Categories</h3><button type="button" className="text-button" onClick={() => changeStep(0)}>Edit</button></div>
                <p>{selectedCategories.length ? selectedCategories.map(({ name }) => name).join(', ') : 'Not sure yet.'}</p>
              </div>
              <div className="quote-review-section">
                <div className="quote-review-heading"><h3>Requirements</h3><button type="button" className="text-button" onClick={() => changeStep(1)}>Edit</button></div>
                <dl>
                  <div><dt>Product / variant</dt><dd>{values.productOrVariant || 'Not provided'}</dd></div>
                  <div><dt>Estimated quantity</dt><dd>{values.quantityNotSure ? 'Not sure yet' : values.estimatedQuantity || 'Not provided'}</dd></div>
                  <div><dt>Purchasing frequency</dt><dd>{values.frequency === 'one-time' ? 'One-time' : values.frequency === 'recurring' ? 'Recurring' : 'Not sure yet'}</dd></div>
                  <div><dt>Preferred packaging</dt><dd>{values.preferredPackaging || 'Not provided'}</dd></div>
                  <div><dt>Customization</dt><dd>{values.customization || 'Not provided'}</dd></div>
                  <div><dt>Additional specifications</dt><dd>{values.additionalSpecifications || 'Not provided'}</dd></div>
                </dl>
              </div>
              <div className="quote-review-section">
                <div className="quote-review-heading"><h3>Business details</h3><button type="button" className="text-button" onClick={() => changeStep(2)}>Edit</button></div>
                <dl>
                  <div><dt>Name</dt><dd>{values.fullName}</dd></div>
                  <div><dt>Company</dt><dd>{values.companyName || 'Not provided'}</dd></div>
                  <div><dt>Email</dt><dd>{values.businessEmail}</dd></div>
                  <div><dt>Phone</dt><dd>{values.phone || 'Not provided'}</dd></div>
                  <div><dt>Delivery location</dt><dd>{values.deliveryLocation || 'Not provided'}</dd></div>
                  <div><dt>Business type</dt><dd>{values.businessType || 'Not provided'}</dd></div>
                </dl>
              </div>
              {!previewStatus && <p className="quote-preview-disclosure">Nothing will be sent or saved from this page.</p>}
              {submissionError && <p className="quote-submit-error" role="alert">{submissionError}</p>}
              {previewStatus === 'preview-only' && (
                <div className="quote-preview-result" role="status">
                  <h3>No inquiry was sent.</h3>
                  <p>Your details remain on this page and were not sent or saved.</p>
                  <Link className="text-link" to="/">Return to Home <span aria-hidden="true">↗</span></Link>
                </div>
              )}
            </div>
          )}

          <div className="quote-form-actions">
            {step > 0 ? (
              <button className="button button-secondary" type="button" onClick={() => changeStep(step - 1)}>
                <span aria-hidden="true">←</span> Back
              </button>
            ) : <span />}
            {step < 3 ? (
              <button className="button button-primary" type="submit">
                Continue <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button className="button button-primary" type="submit" disabled={previewStatus === 'preview-only'}>
                Finish review <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
