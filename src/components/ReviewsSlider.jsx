'use client'

import { useCallback, useRef } from 'react'

import { IconChevronDown } from './Icons'

import './ReviewsSlider.css'

const STARS = [1, 2, 3, 4, 5]

// One star path, reused for the outline and the filled layer. The fill is a
// clipped copy of the same drawing, which is how a half star renders without a
// second icon or a gradient with a generated id.
const STAR_PATH =
  'M12 3.1l2.76 5.6 6.18.9-4.47 4.36 1.06 6.15L12 17.2l-5.53 2.9 1.06-6.15L3.06 9.6l6.18-.9L12 3.1z'

function Stars({ rating }) {
  return (
    <span className="reviews__rating" role="img" aria-label={`Rated ${rating} out of 5`}>
      {STARS.map((star) => {
        // A rating of 4.5 fills four stars completely and the fifth halfway.
        const fill = Math.max(0, Math.min(1, rating - star + 1))

        return (
          <span className="reviews__star" key={star}>
            <svg className="reviews__star-outline" viewBox="0 0 24 24" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>

            {fill > 0 ? (
              <span className="reviews__star-fill" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={STAR_PATH} />
                </svg>
              </span>
            ) : null}
          </span>
        )
      })}

      <span className="reviews__rating-value">{rating.toFixed(1)}</span>
    </span>
  )
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

/**
 * The reviews carousel.
 *
 * Built on native horizontal scrolling with `scroll-snap`, not on a transform
 * and an index. That means a trackpad, a touch screen and the arrow keys all
 * work without any code, the position cannot desync from what is on screen,
 * and a reader with JavaScript disabled still gets every review in a
 * horizontally scrollable row. The buttons are an addition, not the mechanism.
 *
 * The two arrows are `<button>` elements with real labels, not divs with click
 * handlers, so they are reachable by keyboard and announced correctly.
 */
export default function ReviewsSlider({ reviews }) {
  const trackRef = useRef(null)

  const move = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return

    // Advance by one card plus the gap between cards. The card width comes
    // from the DOM rather than from `clientWidth`, because the track now shows
    // three cards at a time on a wide screen and scrolling a full track would
    // skip past them.
    const card = track.querySelector('.reviews__card')
    if (!card) return

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [])

  return (
    <div className="reviews__slider">
      <ul className="reviews__track" ref={trackRef} aria-label="Reviews">
        {reviews.map((review, index) => (
          <li className="reviews__card" key={review.name}>
            <div className="reviews__card-top">
              <Stars rating={review.rating} />
            </div>

            <blockquote className="reviews__quote">
              <p>{review.quote}</p>
            </blockquote>

            <footer className="reviews__author">
              {review.avatar ? (
                <img
                  className="reviews__avatar"
                  src={review.avatar}
                  alt=""
                  width={42}
                  height={42}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span
                  className={`reviews__avatar reviews__avatar--${index % 3}`}
                  aria-hidden="true"
                >
                  {initials(review.name)}
                </span>
              )}

              <span className="reviews__author-text">
                <span className="reviews__name">{review.name}</span>
                <span className="reviews__city">{review.city}</span>
              </span>
            </footer>
          </li>
        ))}
      </ul>

      <div className="reviews__controls">
        <button
          type="button"
          className="reviews__arrow"
          aria-label="Previous review"
          onClick={() => move(-1)}
        >
          {/* The chevron is drawn pointing down, so the two directions are the
              same glyph rotated. One icon, two buttons. */}
          <IconChevronDown size={20} className="reviews__arrow-icon reviews__arrow-icon--prev" />
        </button>

        <button
          type="button"
          className="reviews__arrow"
          aria-label="Next review"
          onClick={() => move(1)}
        >
          <IconChevronDown size={20} className="reviews__arrow-icon reviews__arrow-icon--next" />
        </button>
      </div>
    </div>
  )
}
