# Καθημερινά V14.0.4A — Library Restore Hotfix

This is the stable V14.0.4 pre-Kumon baseline with the Library tab restored. V14.0.4 had a missing `v14LibraryCard()` helper, so the Library renderer could crash and appear empty. V14.0.4A defines the shelf-card helper, keeps the Library mapped to the existing `more` view, and preserves the one-first-button / levels-cleanup behavior.


V14.0.4A removes competing first actions. Today now has one dominant first button, the 1–5 mastery cards are progress markers only, the worksheet shortcut is removed from Today, and Levels is cleaned so it points back to the guided Today path instead of offering multiple competing actions.

Main tabs:
- **Today** — assigned daily path and current concept worksheet.
- **Levels** — mastery ladder with stepping-stone levels and concept atoms.
- **Library** — study shelves for alphabet/sounds, vocabulary, grammar, dialogues, exam import, settings/backup.
- **Worksheets** — graded worksheet work with accuracy, wrong-answer correction, and repetition.
- **Review** — weak spots, due reviews, mistakes, saved recordings, and progress proof.

Mastery rules introduced:
- Concept atoms are studied in order: isolated practice → contrast practice → mixed review → mastery check.
- Worksheets are graded.
- Wrong answers create correction work and weak spots.
- Weak spots remain outside the main timed session.
- Nouns are now detected with article/gender from existing cards as the base for V14.1 enrichment.
- Verbs are flagged for future tense/form enrichment.
- A curriculum audit panel shows how many existing cards, vocabulary records, dialogues, and turns are mapped.

Preserved:
- `const LS='gta_v12_state'`
- Tap-to-translate
- Record save/delete
- User-only recording guard
- Hard letters + diphthongs drill
- Weak spots warm-up outside timer
- Existing SRS/progress data

V14.1 should deepen the worksheet engine with more concept iterations, explicit noun plural fields, verb tense tables, and a full curriculum manifest for every item.


V14.0.1 Today polish:
- Replaced unlabeled 1–5 boxes with Study → Practice → Worksheet → Correct → Master.
- Moved curriculum audit language off the main Today emotion path.
- Rewrote current concept into current level + today’s concept.
- Made the graded worksheet feel required, not optional.
- Clarified timer math: main path time versus correction/repetition reserve.
- Replaced vague “Skip this step” during active session with “I know this · next step.”


V14.0.2 Clickable Mastery Steps:
- Study / Practice / Worksheet / Correct / Master cards now open clear step guidance.
- Added a learner-facing “How to pass today” checklist.
- Kept Start Today’s Path as the obvious first action.
- Renamed the extra worksheet shortcut to “Jump to today’s worksheet.”
- Rewrote today’s concept language to be more learner-friendly.


V14.0.2 Levels/Library polish:
- Levels tab now shows the current learning location first, then the full ladder, then the audit.
- “Study in Library first” opens the exact study page for the current concept instead of dropping the learner on generic Library shelves.
- Concept cards now offer Study and Worksheet separately.
- Library keeps the exact concept study page above the browse shelves, so the learner is not forced to hunt.

V14.0.3 polish:
- Moved Start Today’s Path higher on Today.
- Compressed the repeated weak-spots/timer explanation.
- Added tap hints to Study → Practice → Worksheet → Correct → Master.
- Added a clearer “First action” card.
- Added a live-style pass checklist with Start, Study, Worksheet, Correct, 95%, and Mastery evidence states.
- Kept the graded worksheet shortcut, but made it clearly secondary.


V14.0.4A One First Button + Levels Cleanup:
- Today has one dominant first action: Start Today’s Path.
- Study / Practice / Worksheet / Correct / Master are now non-clickable progress markers on Today.
- Removed the “Jump to today’s worksheet” shortcut from Today.
- Levels page now has one current-level action: Continue current level in Today.
- Concept lists are for viewing the sequence, not launching random worksheets.
- Curriculum audit is collapsed lower on Levels.