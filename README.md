# Καθημερινά V14.0.4D — Unknown Words + Post-Answer Review Queue

Stable V14.0.4C baseline plus a focused post-answer learning review layer.

## What changed from V14.0.4C

- English still stays hidden before listening answers.
- After grading, translation reveal still shows transcript, meaning, question translations, choices, and glossary.
- Glossary words can now be tapped individually and added to Review.
- Self-check choices now affect learning honestly:
  - **I understood the words** = strong pass, no vocabulary queue.
  - **I used context** = words go to Unknown Words review.
  - **I guessed** = words go to Unknown Words review and the listening item is pushed back for review.
  - **Add these words to review** = glossary goes to Unknown Words review.
- Review tab now includes an **Unknown Words** queue with hear / known / remove actions.
- Adds a lightweight Unknown Words review flow inside Worksheets.

## Daily flow remains

Today → Study concept in Library → Start worksheet → Grade → Reveal English → Save unknown words → Review.

## Stability boundary

This build stays on the stable pre-Kumon V14 line. It does not reintroduce V15 routers, heavy mastery locks, or looping navigation.

## Version

V14.0.4D
