import FieldError from './FieldError.jsx';

export default function BusinessContactFields({ idPrefix, values, errors, onChange }) {
  const fullNameErrorId = `${idPrefix}-name-error`;
  const emailErrorId = `${idPrefix}-email-error`;

  return (
    <div className="inquiry-fields">
      <div className="form-field-row">
        <label className="form-field" htmlFor={`${idPrefix}-name`}>
          <span>Full name <b aria-hidden="true">*</b></span>
          <input
            id={`${idPrefix}-name`}
            required
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => onChange('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? fullNameErrorId : undefined}
          />
          <FieldError id={fullNameErrorId} message={errors.fullName} />
        </label>
        <label className="form-field" htmlFor={`${idPrefix}-company`}>
          <span>Company name, if applicable</span>
          <input
            id={`${idPrefix}-company`}
            autoComplete="organization"
            value={values.companyName}
            onChange={(event) => onChange('companyName', event.target.value)}
          />
        </label>
      </div>
      <div className="form-field-row">
        <label className="form-field" htmlFor={`${idPrefix}-email`}>
          <span>Business email <b aria-hidden="true">*</b></span>
          <input
            id={`${idPrefix}-email`}
            required
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => onChange('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? emailErrorId : undefined}
          />
          <FieldError id={emailErrorId} message={errors.email} />
        </label>
        <label className="form-field" htmlFor={`${idPrefix}-phone`}>
          <span>Phone, if needed</span>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </label>
      </div>
      <label className="form-field" htmlFor={`${idPrefix}-location`}>
        <span>Country / delivery location, if known</span>
        <input
          id={`${idPrefix}-location`}
          value={values.deliveryLocation}
          onChange={(event) => onChange('deliveryLocation', event.target.value)}
        />
      </label>
      <p className="form-help">Fields marked * are required.</p>
    </div>
  );
}
