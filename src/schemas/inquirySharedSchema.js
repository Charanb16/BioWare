const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiryContact(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter an email address in a valid format.';
  }

  return errors;
}

export function validateCategorySelection(values) {
  if (values.selectedCategorySlugs.length > 0 || values.categoryNotSure) {
    return {};
  }

  return { categories: 'Choose a category or select “Not sure yet.”' };
}

export function validateCategorizedInquiry(values) {
  return {
    ...validateInquiryContact(values),
    ...validateCategorySelection(values),
  };
}
