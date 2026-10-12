import { useCallback, useState } from 'react';

export function clearFieldErrors(errors, errorKeys) {
  return errorKeys.reduce((next, key) => ({ ...next, [key]: '' }), errors);
}

export function useInquiryForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const clearSubmissionState = useCallback(() => {
    setStatus('');
    setSubmissionError('');
  }, []);

  const clearMessages = useCallback(() => {
    setErrors({});
    clearSubmissionState();
  }, [clearSubmissionState]);

  const updateField = useCallback((name, value, errorKeys = [name]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => clearFieldErrors(current, errorKeys));
    clearSubmissionState();
  }, [clearSubmissionState]);

  return {
    values,
    errors,
    setErrors,
    status,
    setStatus,
    submissionError,
    setSubmissionError,
    updateField,
    clearMessages,
    clearSubmissionState,
  };
}
