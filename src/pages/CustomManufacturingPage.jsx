import { useState } from 'react';
import BusinessContactFields from '../components/forms/BusinessContactFields.jsx';
import CategoryChooser from '../components/forms/CategoryChooser.jsx';
import FieldError from '../components/forms/FieldError.jsx';
import InMemoryFileAttachments from '../components/forms/InMemoryFileAttachments.jsx';
import PreviewOnlyNotice from '../components/forms/PreviewOnlyNotice.jsx';
import { validateCategorizedInquiry } from '../schemas/inquirySharedSchema.js';
import { submitInquiryPreview } from '../services/mocks/inquiryService.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useCategorySelection } from '../hooks/useCategorySelection.js';
import { useInquiryForm } from '../hooks/useInquiryForm.js';

const initialValues = {
  selectedCategorySlugs: [],
  categoryNotSure: false,
  requirements: '',
  estimatedQuantity: '',
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  deliveryLocation: '',
};

export default function CustomManufacturingPage() {
  const [files, setFiles] = useState([]);
  const {
    values, errors, setErrors, status, setStatus, submissionError,
    setSubmissionError, updateField, clearSubmissionState,
  } = useInquiryForm(initialValues);
  const updateValue = updateField;
  const { toggleCategory, setCategoryNotSure } = useCategorySelection(values, updateValue);
  useDocumentTitle('Custom Manufacturing Inquiry | BioWare');

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
      setSubmissionError('Nothing was sent or uploaded. Please try again later.');
    }
  }

  return (
    <div className="inquiry-page">
      <section className="inquiry-intro section-shell" aria-labelledby="custom-title">
        <p className="eyebrow"><span className="eyebrow-dot" /> Business inquiry · Custom requirements</p>
        <h1 id="custom-title">Tell us what you’re <em>looking to make.</em></h1>
        <p>Describe your product idea. This inquiry does not confirm manufacturing capability or acceptance.</p>
      </section>

      <section className="inquiry-shell section-shell" aria-label="Custom manufacturing inquiry form">
        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <CategoryChooser
            idPrefix="custom"
            selectedSlugs={values.selectedCategorySlugs}
            notSure={values.categoryNotSure}
            error={errors.categories}
            onToggle={toggleCategory}
            onNotSureChange={setCategoryNotSure}
          />

          <div className="inquiry-fields">
            <label className="form-field" htmlFor="custom-requirements">
              <span>Product idea and requirements</span>
              <textarea id="custom-requirements" rows="5" value={values.requirements} onChange={(event) => updateValue('requirements', event.target.value)} />
            </label>
            <label className="form-field" htmlFor="custom-quantity">
              <span>Estimated quantity, if known</span>
              <input id="custom-quantity" value={values.estimatedQuantity} onChange={(event) => updateValue('estimatedQuantity', event.target.value)} />
            </label>
            <InMemoryFileAttachments files={files} onChange={(nextFiles) => { setFiles(nextFiles); clearSubmissionState(); }} />
          </div>

          <section className="inquiry-contact" aria-labelledby="custom-contact-title">
            <div className="inquiry-section-heading">
              <p className="eyebrow">Contact details</p>
              <h2 id="custom-contact-title">How can we get back to you?</h2>
            </div>
            <BusinessContactFields idPrefix="custom" values={values} errors={errors} onChange={updateValue} />
          </section>

          <p className="inquiry-preview-disclosure">Nothing will be sent or uploaded from this page.</p>
          {submissionError && <p className="quote-submit-error" role="alert">{submissionError}</p>}
          <PreviewOnlyNotice status={status} title="No custom-manufacturing inquiry was sent." />
          <div className="inquiry-form-actions">
            <button className="button button-primary" type="submit" disabled={status === 'preview-only'}>
              Preview inquiry <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
