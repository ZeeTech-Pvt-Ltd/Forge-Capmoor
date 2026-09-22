import { useEffect, useId, useRef, useState } from 'react'

import { Link, useRoute } from '../lib/router'
import { DEFAULT_COUNTRY, findCountry, nationalDigitRange } from '../lib/countries'
import { detectCountry } from '../lib/geo'
import { IconArrowRight } from './Icons'
import { PhoneField } from './PhoneField'

import './SignUpForm.css'

/**
 * Delivery endpoint for the account form.
 *
 * Set `VITE_CONTACT_ENDPOINT` in the environment before deploying (see
 * .env.example). Until it is set, the form validates normally and then tells
 * the visitor plainly that nothing was sent — it never reports a success it
 * did not have, and it never sends anyone to the thank-you page.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELD_ORDER = ['firstName', 'lastName', 'email', 'phone']

/**
 * The number is now held as a dial code plus a national part, so the check is
 * against E.164's 15-digit ceiling for the pair rather than a flat count. That
 * ceiling is why a 3-digit prefix leaves less room than a 1-digit one — see
 * `nationalDigitRange`.
 */
function validate(values) {
  const errors = {}
  const country = findCountry(values.phoneCountry)

  if (!values.firstName.trim()) {
    errors.firstName = 'Please enter your first name.'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Please enter your last name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter an email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }

  const { min, max } = nationalDigitRange(country.dial)
  const national = values.phone.replace(/\D/g, '')

  if (!national) {
    errors.phone = 'Please enter a phone number.'
  } else if (national.length < min || national.length > max) {
    errors.phone = `Please enter a valid ${country.name} phone number.`
  }

  return errors
}

/**
 * One labelled input plus its inline error. Private to this file.
 *
 * The `id` is prefixed with the form's useId() so the label/input/error triple
 * stays unique if the form is ever rendered twice on one page. The `name` is
 * left plain — browser autofill and password managers key off it, and a
 * generated name would break both.
 */
function Field({
  uid,
  field,
  label,
  type,
  autoComplete,
  inputMode,
  placeholder,
  value,
  error,
  onChange,
  inputRef,
}) {
  const id = `${uid}-${field}`

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={field}
        type={type}
        className="field__input"
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        required
      />
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * The account form.
 *
 * One implementation behind three placements: the closing band on the
 * homepage (dark), /signup (light) and /contact (light). `tone` swaps the
 * field colours through scoped custom properties, so the markup is identical
 * in both and only the token block below differs.
 *
 * It is a real, validated, labelled form — not a decorative mock. Native
 * constraint attributes give the browser's own affordances; script validation
 * gives the messages we control; and every outcome is announced through a
 * polite live region.
 */
export function SignUpForm({ tone = 'light', submitLabel = 'Create an account' }) {
  const uid = useId()
  const { navigate } = useRoute()

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountry: DEFAULT_COUNTRY,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)

  const refs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phone: phoneRef,
  }

  // A ref rather than state: the detection below resolves asynchronously, so it
  // reads this long after render. State would have closed over the value as it
  // was at mount, and a visitor who picked their country in the meantime would
  // have had that choice overwritten when the request came back.
  const countryTouched = useRef(false)

  /**
   * Preselect the dial code from the visitor's country.
   *
   * This is a convenience, never a correction: it only ever runs before the
   * visitor has touched the selector, and it does nothing at all when detection
   * has no answer. The form is usable throughout — the field renders with
   * `DEFAULT_COUNTRY` immediately and simply changes if a country comes back.
   */
  useEffect(() => {
    let alive = true

    detectCountry().then((code) => {
      if (!alive || !code || countryTouched.current) return
      setValues((previous) =>
        previous.phoneCountry === DEFAULT_COUNTRY ? { ...previous, phoneCountry: code } : previous,
      )
    })

    return () => {
      alive = false
    }
  }, [])

  const update = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }))
    }
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])

    if (firstInvalid) {
      // Send focus to the first field that needs attention.
      refs[firstInvalid].current?.focus()
      setStatus('invalid')
      return
    }

    if (!ENDPOINT) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Forge Capmoor] VITE_CONTACT_ENDPOINT is not set: the account form cannot deliver. See .env.example.',
        )
      }
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          // Both forms: `phone` is the E.164-shaped value a backend can dial
          // without parsing, and the two parts are sent alongside so a wrong
          // dial code is still diagnosable after the fact.
          phone: `+${findCountry(values.phoneCountry).dial}${values.phone.replace(/\D/g, '')}`,
          phoneCountry: values.phoneCountry.toUpperCase(),
          source: 'forge-capmoor.net',
        }),
      })

      if (!response.ok) throw new Error(`Request failed with ${response.status}`)

      setStatus('success')
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneCountry: values.phoneCountry,
      })
      // Only a delivered submission earns the confirmation page.
      navigate('/thank-you')
    } catch {
      setStatus('error')
    }
  }

  const busy = status === 'submitting'

  return (
    <form className={`form form--${tone}`} onSubmit={handleSubmit} noValidate>
      <div className="form__fields">
        <Field
          uid={uid}
          field="firstName"
          label="First name"
          type="text"
          autoComplete="given-name"
          placeholder="Alex"
          value={values.firstName}
          error={errors.firstName}
          onChange={update('firstName')}
          inputRef={firstNameRef}
        />
        <Field
          uid={uid}
          field="lastName"
          label="Last name"
          type="text"
          autoComplete="family-name"
          placeholder="Jones"
          value={values.lastName}
          error={errors.lastName}
          onChange={update('lastName')}
          inputRef={lastNameRef}
        />
        <Field
          uid={uid}
          field="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="alexjones@gmail.com"
          value={values.email}
          error={errors.email}
          onChange={update('email')}
          inputRef={emailRef}
        />
        <PhoneField
          uid={uid}
          value={values.phone}
          country={values.phoneCountry}
          error={errors.phone}
          inputRef={phoneRef}
          onValueChange={(next) => {
            setValues((previous) => ({ ...previous, phone: next }))
            if (errors.phone) setErrors((previous) => ({ ...previous, phone: undefined }))
            if (status !== 'idle' && status !== 'submitting') setStatus('idle')
          }}
          onCountryChange={(next) => {
            countryTouched.current = true
            setValues((previous) => ({ ...previous, phoneCountry: next }))
            // The old message named the old country, so it no longer applies.
            if (errors.phone) setErrors((previous) => ({ ...previous, phone: undefined }))
          }}
        />
      </div>

      {/* Honeypot: hidden from people, attractive to naive bots. */}
      <div className="form__honeypot" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={busy}>
        {busy ? 'Sending…' : submitLabel}
        {busy ? null : <IconArrowRight size={18} className="btn__icon" />}
      </button>

      <p className="form__status" role="status" aria-live="polite">
        {status === 'invalid' ? 'Please check the highlighted fields.' : null}
        {status === 'success' ? 'Thank you, that reached us. We will be in touch shortly.' : null}
        {status === 'unconfigured'
          ? 'This form is not connected to a delivery service yet, so nothing was sent.'
          : null}
        {status === 'error'
          ? 'Something went wrong sending that. Please try again in a moment.'
          : null}
      </p>

      <p className="form__consent">
        By submitting this form you accept our{' '}
        <Link to="/privacy" className="form__consent-link">
          privacy policy
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="form__consent-link">
          terms of use
        </Link>
        , and you acknowledge the{' '}
        <Link to="/risk-disclosure" className="form__consent-link">
          risk disclosure
        </Link>
        . Trading carries a risk of loss.
      </p>
    </form>
  )
}

export default SignUpForm
