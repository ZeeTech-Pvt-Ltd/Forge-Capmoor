'use client'

import { useCallback, useRef } from 'react'

import { IconChevronDown } from './Icons'

import './ReviewsSlider.css'

/**
 * The reviews carousel.
 *
 * Built on native horizontal scrolling with `scroll-snap`, not on a transform
 * and an index. That means a trackpad, a touch screen and the arrow keys all
 * work without any code, the position cannot desync from what is on screen,
 * and a reader with JavaScript disabled still gets every review stacked
 * vertically. The buttons are an addition, not the mechanism.
 *
 * The two arrows are `<button>` elements with real labels, not divs with click
 * handlers, so they are reachable by keyboard and announced correctly.
 */
export default function ReviewsSlider({ reviews }) {
  const trackRef = useRef(null)

  const move = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return

    // Each card is exactly the width of the track, so scrolling by one
    // `clientWidth` advances exactly one card.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  return (
    <div className="reviews__slider">
      <ul className="reviews__track" ref={trackRef} aria-label="Reviews">
        {reviews.map((review) => (
          <li className="reviews__card" key={review.name}>
            <blockquote className="reviews__quote">
              <p>{review.quote}</p>
            </blockquote>

            <footer className="reviews__author">
              <span className="reviews__name">{review.name}</span>
              <span className="reviews__city">{review.city}</span>
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
