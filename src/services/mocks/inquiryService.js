// Shared UI-facing adapter for all inquiry forms. Replace only after an approved
// backend contract is supplied; this preview implementation sends and stores nothing.
export async function submitInquiryPreview() {
  return {
    status: 'preview-only',
    delivered: false,
    reference: null,
  };
}
