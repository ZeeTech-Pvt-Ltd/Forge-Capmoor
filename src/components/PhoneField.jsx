import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { COUNTRIES, findCountry, nationalDigitRange } from '../lib/countries'
import { IconChevronDown, IconSearch } from './Icons'

import './PhoneField.css'

const FLAGS = `${import.meta.env.BASE_URL}flags`

/**
 * The country's flag, loaded from `public/flags` as its own file.
 *
 * One file per country rather than a sprite, because the full set is 1.9MB and
 * 56 coat-of-arms flags account for 1.6MB of it — a sprite would be a 1.9MB
 * download to open a dropdown. Behind `loading="lazy"` a visitor fetches only
 * the flags actually on screen, and each is cached from then on.
 *
 * `alt=""` because the flags are decorative: the country name is always
 * rendered as text beside one, so a label here would only make a screen reader
 * say everything twice.
 */
function Flag({ code }) {
  return (
    <img
      className="phone__flag"
      src={`${FLAGS}/${code}.svg`}
      alt=""
      width="20"
      height="15"
      loading="lazy"
      decoding="async"
    />
  )
}

/**
 * The phone field: a dial-code selector fused to a number input.
 *
 * The reference site's form pairs a country selector with the phone field, and
 * this does the same job. It is built as the ARIA combobox pattern — a search
 * input that owns the listbox, with `aria-activedescendant` tracking the
 * highlighted option — so the whole control is operable from the keyboard and
 * announced correctly. A native `<select>` cannot hold a flag, and a div-based
 * dropdown loses that behaviour, which is why this is a combobox and not
 * either.
 *
 * Selection is stored as an ISO code plus the national part of the number, and
 * only combined into an international value on submit. That keeps editing
 * honest: changing the country never rewrites digits the visitor typed.
 */
export function PhoneField({ uid, value, country, error, onValueChange, onCountryChange, inputRef }) {
  const id = `${uid}-phone`
  const errorId = `${id}-error`
  const listId = `${id}-list`
  const searchId = `${id}-search`

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(country)

  const wrapRef = useRef(null)
  const searchRef = useRef(null)
  const listRef = useRef(null)

  const selected = findCountry(country)
  const { min, max } = nationalDigitRange(selected.dial)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    // Name, ISO code and dial code all match, so "+44", "gb" and "united" each
    // find the same entry — people reach for whichever they know.
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        `+${c.dial}`.includes(q) ||
        c.dial.startsWith(q.replace(/^\+/, '')),
    )
  }, [query])

  // Close on an outside press and on Escape, and give focus back to the
  // trigger. Without the outside listener the popup survives a click into the
  // rest of the page and looks stuck.
  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        wrapRef.current?.querySelector('.phone__trigger')?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  // Typing narrows the list, and the highlighted option has to narrow with it.
  // Without this, filtering to "germ" left Germany as the only visible option
  // while `active` still pointed at Australia — so Enter quietly selected the
  // country the visitor had just filtered away.
  useEffect(() => {
    if (!open || !matches.length) return
    if (!matches.some((c) => c.code === active.code)) setActive(matches[0])
  }, [open, matches, active.code])

  // Keep the highlighted option in view when the keyboard moves it.
  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open, active, matches])

  const openList = () => {
    setQuery('')
    setActive(selected)
    setOpen(true)
  }

  const choose = (code) => {
    onCountryChange(code)
    setOpen(false)
    // The number is what they came to type, so send them straight to it.
    inputRef.current?.focus()
  }

  const onSearchKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!matches.length) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      const at = matches.findIndex((c) => c.code === active.code)
      // Wrap around, which is what a listbox is expected to do at its ends.
      const next = (at + step + matches.length) % matches.length
      setActive(matches[at === -1 ? 0 : next])
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      if (matches.length) setActive(event.key === 'Home' ? matches[0] : matches[matches.length - 1])
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (matches.length) choose(active.code)
    }
  }

  const onNumberChange = (event) => {
    // Digits only. The dial code lives in its own control, so `+`, spaces and
    // brackets carry no information here and only make the value harder to
    // validate.
    onValueChange(event.target.value.replace(/\D/g, '').slice(0, max))
  }

  /**
   * Pasting "+49 30 1234567" should fill in the German number, not a number
   * that still has 49 welded to the front of it. Handled on paste rather than
   * on every keystroke: stripping mid-typing would delete digits the visitor
   * was deliberately entering, and only a paste can reliably be read as a
   * complete international number.
   *
   * The strip only happens when what remains is still a plausible national
   * number for the selected country, so a genuine national number that happens
   * to begin with the dial code is left alone.
   */
  const onNumberPaste = (event) => {
    const text = event.clipboardData?.getData('text') ?? ''
    const digits = text.replace(/\D/g, '')
    if (!digits) return

    let next = digits
    if (digits.startsWith(selected.dial)) {
      const rest = digits.slice(selected.dial.length)
      if (rest.length >= min && rest.length <= max) next = rest
    }

    event.preventDefault()
    onValueChange(next.slice(0, max))
  }

  return (
    <div className="field phone">
      <label className="field__label" htmlFor={id}>
        Phone number
      </label>

      <div className="phone__control">
        <div className="phone__country" ref={wrapRef}>
          <button
            type="button"
            className="phone__trigger"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            /* Named for the country, not just "+61" — the flag is hidden from
               assistive technology, so without this the button announces as a
               bare dial code with nothing to say which country it belongs to.
               The visible text ("+61") is contained in the name, which is what
               WCAG 2.5.3 asks for. */
            aria-label={`Country code: ${selected.name} +${selected.dial}`}
            onClick={() => (open ? setOpen(false) : openList())}
          >
            <Flag code={selected.code} />
            <span className="phone__dial">+{selected.dial}</span>
            <IconChevronDown size={14} className="phone__caret" />
          </button>

          {open ? (
            <div className="phone__popup">
              <div className="phone__search">
                <IconSearch size={15} className="phone__search-icon" />
                <input
                  ref={searchRef}
                  id={searchId}
                  type="text"
                  className="phone__search-input"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-label="Search countries"
                  autoComplete="off"
                  placeholder="Search country or code"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onSearchKeyDown}
                  aria-activedescendant={
                    matches.some((c) => c.code === active.code) ? `${listId}-${active.code}` : undefined
                  }
                />
              </div>

              <ul className="phone__list" id={listId} role="listbox" aria-label="Country calling code" ref={listRef}>
                {matches.map((c) => {
                  const isActive = c.code === active.code
                  return (
                    <li
                      key={c.code}
                      id={`${listId}-${c.code}`}
                      role="option"
                      aria-selected={c.code === selected.code}
                      data-active={isActive}
                      className="phone__option"
                      // `pointerdown` fires before the input can blur, so the
                      // choice is registered before any focus change.
                      onPointerDown={(event) => {
                        event.preventDefault()
                        choose(c.code)
                      }}
                      /* `onMouseMove`, not `onMouseEnter`: opening the list
                         scrolls it to the current selection, and Chrome fires
                         `mouseenter` on whatever ends up under a stationary
                         cursor after a scroll. That moved the highlight off the
                         selected country the moment the list opened — the test
                         caught it landing on Antarctica. `mousemove` only fires
                         on real pointer movement. */
                      onMouseMove={() => setActive(c)}
                    >
                      <Flag code={c.code} />
                      <span className="phone__name">{c.name}</span>
                      <span className="phone__option-dial">+{c.dial}</span>
                    </li>
                  )
                })}
              </ul>

              {matches.length === 0 ? (
                <p className="phone__empty">No country matches “{query}”.</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <input
          ref={inputRef}
          id={id}
          name="phone"
          type="tel"
          className="field__input phone__input"
          autoComplete="tel-national"
          inputMode="numeric"
          placeholder={selected.placeholder}
          value={value}
          onChange={onNumberChange}
          onPaste={onNumberPaste}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          required
        />
      </div>

      {error ? (
        <p className="field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default PhoneField
