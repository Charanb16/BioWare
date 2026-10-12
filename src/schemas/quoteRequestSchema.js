import { validateCategorySelection, validateInquiryContact } from './inquirySharedSchema.js';

export function validateQuoteStep(step, values) {
  if (step === 0) {
    return validateCategorySelection(values);
  }

  if (step === 2) {
    const contactErrors = validateInquiryContact({
      fullName: values.fullName,
      email: values.businessEmail,
    });

    if (contactErrors.email) {
      contactErrors.businessEmail = contactErrors.email;
      delete contactErrors.email;
    }

    return contactErrors;
  }

  return {};
}
