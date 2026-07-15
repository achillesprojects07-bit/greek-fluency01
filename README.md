# Καθημερινά V14.0.8

## Extensive first curriculum — stable V14 architecture

V14.0.8 expands the first roadmap from 25 broad concept steps to **107 real lessons across 12 levels** without rebuilding the app or introducing V15-style weight.

### Learning structure

Every lesson follows the same stable route:

Today → exact Library lesson → study 12 models → immediate 12-question worksheet → final English/translation reveal → optional Review → next lesson.

- One graded worksheet softly opens the next sequential lesson.
- Weak scores, mistakes, and unknown words go to Review but never block progress.
- Continuous Fluency Mode begins only after all 107 lessons have at least one graded worksheet.
- Level 0 keeps the corrected deep pronunciation lessons and unique question banks.
- Levels 1–11 reuse the existing phrase, vocabulary, and grammar data through lightweight lesson definitions rather than duplicating the full content dataset.
- Grammar source entries that are not marked verified retain a visible **Needs tutor verification** badge.

### Estimated first-pass size

- 107 lessons
- 12 study models per lesson
- 12 standard worksheet questions per lesson
- approximately 28–40 hours for one first pass, depending on speaking repetition and Review

### Preserved

- `const LS='gta_v12_state'`
- Today / Levels / Library / Worksheets / Review tabs
- Greek-first worksheets and post-grade English reveal
- optional Review gate
- Continuous Fluency Mode after roadmap completion
- network-first document loading with offline fallback
- Κα + gold sun icons

### Safe deployment

Upload all release files together. The cache name is `gta-v14-0-8-extensive-curriculum`, and the manifest starts at `index.html?v=14.0.8`. Existing progress remains under `gta_v12_state`.
