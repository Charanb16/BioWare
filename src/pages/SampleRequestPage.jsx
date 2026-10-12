import BusinessContactFields from '../components/forms/BusinessContactFields.jsx';
import CategoryChooser from '../components/forms/CategoryChooser.jsx';
import FieldError from '../components/forms/FieldError.jsx';
import PreviewOnlyNotice from '../components/forms/PreviewOnlyNotice.jsx';
import { submitInquiryPreview } from '../services/mocks/inquiryService.js';
import { validateCategorizedInquiry } from '../schemas/inquirySharedSchema.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useCategorySelection } from '../hooks/useCategorySelection.js';
import { useInquiryForm } from '../hooks/useInquiryForm.js';

const initialValues = {
  selectedCategorySlugs: [],
  categoryNotSure: false,
  estimatedQuantity: '',
  intendedUse: '',
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  deliveryLocation: '',
};

export default function SampleRequestPage() {
  const {
    values, errors, setErrors, status, setStatus, submissionError,
    setSubmissionError, updateField,
  } = useInquiryForm(initialValues);
  const updateValue = updateField;
  const { toggleCategory, setCategoryNotSure } = useCategorySelection(values, updateValue);
  useDocumentTitle('Request a Sample | BioWare');

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateCategorizedInquiry(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      document.querySelector('.field-error')?.scrollIntoView({ block: 'center' });
      return;
    }

    try {
      const result = await submitInquiryPreview();
      setStatus(result.status);
    } catch {
      setSubmissionError('Your inquiry was not sent. Please try again later.');
    }
  }

  return (
    <div className="inquiry-page">
      <section className="inquiry-intro section-shell" aria-labelledby="sample-title">
        <p className="eyebrow"><span className="eyebrow-dot" /> Business inquiry · Sample request</p>
        <h1 id="sample-title">Ask about a <em>sample.</em></h1>
        <p>Tell us what you would like to evaluate. Sample availability, cost, and delivery terms would need confirmation.</p>
      </section>

      <section className="inquiry-shell section-shell" aria-label="Sample request form">
        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <CategoryChooser
            idPrefix="sample"
            selectedSlugs={values.selectedCategorySlugs}
            notSure={values.categoryNotSure}
            error={errors.categories}
            onToggle={toggleCategory}
            onNotSureChange={setCategoryNotSure}
          />

          <div className="inquiry-fields">
            <label className="form-field" htmlFor="sample-quantity">
              <span>Estimated sample quantity, if known</span>
              <input id="sample-quantity" value={values.estimatedQuantity} onChange={(event) => updateValue('estimatedQuantity', event.target.value)} />
            </label>
            <label className="form-field" htmlFor="sample-use">
              <span>What would you like to evaluate?</span>
              <textarea id="sample-use" rows="4" value={values.intendedUse} onChange={(event) => updateValue('intendedUse', event.target.value)} />
            </label>
          </div>

          <section className="inquiry-contact" aria-labelledby="sample-contact-title">
            <div className="inquiry-section-heading">
              <p className="eyebrow">Contact details</p>
              <h2 id="sample-contact-title">Where should we direct the inquiry?</h2>
            </div>
            <BusinessContactFields idPrefix="sample" values={values} errors={errors} onChange={updateValue} />
          </section>

          <p className="inquiry-preview-disclosure">Nothing will be sent from this page.</p>
          {submissionError && <p className="quote-submit-error" role="alert">{submissionError}</p>}
          <PreviewOnlyNotice status={status} title="No sample request was sent." />
          <div className="inquiry-form-actions">
            <button className="button button-primary" type="submit" disabled={status === 'preview-only'}>
              Preview sample request <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
