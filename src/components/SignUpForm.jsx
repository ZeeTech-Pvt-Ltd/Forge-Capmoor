'use client'

import { useEffect, useRef, useState } from 'react'

import { Link, useRoute } from '../lib/router'
import { DEFAULT_COUNTRY, findCountry, nationalDigitRange } from '../lib/countries'
import { detectCountry } from '../lib/geo'
import { IconArrowRight } from './Icons'
import { PhoneField } from './PhoneField'

import './SignUpForm.css'

/**
 * Delivery endpoint for the account form.
 *
 * The shared registration relay is the default, so a build with no environment
 * still delivers. NEXT_PUBLIC_CONTACT_ENDPOINT remains as an override for a
 * staging host. Either way the value is inlined at build time.
 *
 * ACCOUNT_PASSWORD is a template constant, not a secret: every site on this
 * template ships it in the public bundle. OFFER_NAME routes the lead to Forge
 * Capmoor; omitting it drops the lead into a shared default funnel. The relay
 * adds the visitor's IP itself from the connection, so the browser never sends
 * it.
 */
const DEFAULT_ENDPOINT = 'https://meridianc-au.com/webactive-gb.php'
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || DEFAULT_ENDPOINT
const OFFER_NAME = 'ForgeCapmoor-Site'
const ACCOUNT_PASSWORD = 'Lh23s3'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELD_ORDER = ['firstName', 'lastName', 'email', 'phone', 'agree']

/** Only the codes documented for this relay, mapped by the relay's field. */
const RELAY_FIELD_BY_CODE = {
  10001: 'firstName',
  10006: 'firstName',
  10002: 'lastName',
  10007: 'lastName',
  10003: 'email',
  10008: 'email',
  10005: 'phone',
}

/** The relay appends a support code such as " (#8plo9)"; visitors do not need it. */
function cleanServerMessage(message) {
  return String(message).replace(/\s*\(#[A-Za-z0-9]+\)\s*$/, '').trim()
}

function phoneDigits(value) {
  return value.replace(/\D/g, '')
}

/**
 * A typed or pasted number may already carry the selected dial code. Strip it
 * only when what remains is a plausible national number, so a genuine national
 * number that happens to begin with the same digits is left alone.
 */
function withoutDialPrefix(digits, country) {
  const { min, max } = nationalDigitRange(country.dial)
  if (!digits.startsWith(country.dial)) return digits

  const rest = digits.slice(country.dial.length)
  if (rest.length < min || rest.length > max) return digits

  return rest
}

/** Parse `_debug.affilix_raw` without trusting its shape. */
function fieldErrorsFrom(debug) {
  const raw = debug?.affilix_raw
  if (!raw) return {}

  let parsed = raw
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return {}
    }
  }

  const list = Array.isArray(parsed?.errors) ? parsed.errors : []
  const mapped = {}

  for (const item of list) {
    const field = RELAY_FIELD_BY_CODE[Number(item?.code)]
    if (field && typeof item.message === 'string') {
      mapped[field] = cleanServerMessage(item.message)
    }
  }

  return mapped
}

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
  const typed = phoneDigits(values.phone)

  if (!typed) {
    errors.phone = 'Please enter a phone number.'
  } else if (typed.startsWith('0')) {
    // The dial code is already selected beside the field, so the trunk zero is
    // both redundant and wrong once the number is sent as E.164.
    errors.phone =
      'Please enter the number without the leading 0. The country code is already selected.'
  } else {
    const national = withoutDialPrefix(typed, country)

    if (national.startsWith('0')) {
      errors.phone =
        'Please enter the number without the leading 0. The country code is already selected.'
    } else if (national.length < min || national.length > max) {
      errors.phone = `Please enter a valid ${country.name} phone number.`
    }
  }

  if (!values.agree) {
    errors.agree = 'Please accept the privacy policy and terms to continue.'
  }

  return errors
}

/**
 * One labelled input plus its inline error. Private to this file.
 *
 * The `id` is the field name itself, which is what the verification harness and
 * password managers select on. The `name` stays plain for the same reason.
 */
function Field({
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
  const id = field

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
  const { navigate } = useRoute()

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountry: DEFAULT_COUNTRY,
    agree: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const agreeRef = useRef(null)
  const companyRef = useRef(null)

  const refs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phone: phoneRef,
    agree: agreeRef,
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
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    setValues((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }))
    }
    if (serverMessage) setServerMessage('')
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // The hidden field is off-screen, so only a bot fills it. Stop silently:
    // no request and no confirmation page.
    if (companyRef.current?.value.trim()) return

    setServerMessage('')
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])

    if (firstInvalid) {
      // Send focus to the first field that needs attention.
      refs[firstInvalid].current?.focus()
      setStatus('invalid')
      return
    }

    const country = findCountry(values.phoneCountry)
    const national = withoutDialPrefix(phoneDigits(values.phone), country)

    setStatus('submitting')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: values.email.trim(),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          password: ACCOUNT_PASSWORD,
          phone: `+${country.dial}${national}`,
          offerName: OFFER_NAME,
        }),
      })

      // The relay answers 200 with an error envelope even when it rejects the
      // lead. The body decides, and an empty or non-JSON body is never success.
      const data = await response.json().catch(() => null)
      const message = typeof data?.message === 'string' ? cleanServerMessage(data.message) : ''

      if (!response.ok) {
        setStatus('error')
        setServerMessage(
          message || 'The registration service is unavailable right now. Please try again in a moment.',
        )
        return
      }

      if (!data || data.status !== 'success') {
        const fieldErrors = fieldErrorsFrom(data?._debug)

        if (Object.keys(fieldErrors).length > 0) {
          setErrors((previous) => ({ ...previous, ...fieldErrors }))
          setStatus('invalid')
          return
        }

        setStatus('error')
        setServerMessage(
          message || 'Something went wrong. Please check your details and try again.',
        )
        return
      }

      setStatus('success')
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneCountry: values.phoneCountry,
        agree: false,
      })
      // Only an explicit success earns the confirmation page.
      navigate('/thank-you')
    } catch {
      setStatus('error')
      setServerMessage(
        'We could not reach the registration service just now. Please try again in a moment.',
      )
    }
  }

  const busy = status === 'submitting'

  return (
    <form className={`form form--${tone}`} onSubmit={handleSubmit} noValidate>
      <div className="form__fields">
        <Field
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
          value={values.phone}
          country={values.phoneCountry}
          error={errors.phone}
          inputRef={phoneRef}
          onValueChange={(next) => {
            setValues((previous) => ({ ...previous, phone: next }))
            if (errors.phone) setErrors((previous) => ({ ...previous, phone: undefined }))
            if (serverMessage) setServerMessage('')
            if (status !== 'idle' && status !== 'submitting') setStatus('idle')
          }}
          onCountryChange={(next) => {
            countryTouched.current = true
            setValues((previous) => ({ ...previous, phoneCountry: next }))
            // The old message named the old country, so it no longer applies.
            if (errors.phone) setErrors((previous) => ({ ...previous, phone: undefined }))
            if (serverMessage) setServerMessage('')
          }}
        />
      </div>

      {/* Honeypot: hidden from people, attractive to naive bots. */}
      <div className="form__honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          ref={companyRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form__consent">
        <input
          ref={agreeRef}
          id="agree"
          name="agree"
          type="checkbox"
          checked={values.agree}
          onChange={update('agree')}
          aria-invalid={errors.agree ? 'true' : undefined}
          aria-describedby={errors.agree ? 'agree-error' : undefined}
          required
        />
        <label htmlFor="agree">
          I accept our{' '}
          <Link to="/privacy" className="form__consent-link">
            privacy policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="form__consent-link">
            terms of use
          </Link>
          , and I acknowledge the{' '}
          <Link to="/risk-disclosure" className="form__consent-link">
            risk disclosure
          </Link>
          . Trading carries a risk of loss.
        </label>
      </div>

      {errors.agree ? (
        <p className="field__error form__consent-error" id="agree-error">
          {errors.agree}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={busy}>
        {busy ? 'Sending…' : submitLabel}
        {busy ? null : <IconArrowRight size={18} className="btn__icon" />}
      </button>

      <p className="form__status" role="status" aria-live="polite">
        {status === 'invalid' ? 'Please check the highlighted fields.' : null}
        {status === 'success' ? 'Thank you, that reached us. We will be in touch shortly.' : null}
        {status === 'error' ? serverMessage : null}
      </p>
    </form>
  )
}

export default SignUpForm