# Session Activity — report specification

> **This document and [reports/internal/session-activity.html](../../reports/internal/session-activity.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — clinical operations and scheduling.
**Purpose:** Say what is booked, what happened to it, and what a session left behind. Partly
built on 8 Sep 2026 from the Sisense **Session Activity** dashboard of 27 Aug 2026.

## Only the headline band is built

The source dashboard carries roughly thirty visuals across three tabs — Week by Week Discovery,
Last 12 Weeks Scheduling and Next 4 Weeks Schedule — plus a Definitions and Notes tab.

**Ten of them are built here: the headline cards.** The rest are not, because in the capture
available the chart titles and axis labels cannot be read. Every measure in this repo is
supposed to arrive with a definition somebody has agreed; a chart whose title is a guess agrees
nothing and is worse than an empty tile, because it looks finished.

What is needed to finish it is small: a readable capture of the chart headers, or the source's
own **Definitions and Notes** tab — which, given what these documents are for, is worth more
than the pictures.

## What the built tiles found

Three things worth acting on came out of the headline band alone:

- **The no-show tile contradicts itself.** The count reads 0 and the rate reads 3.8%. One of
  the two measures is wrong and nobody has said which.
- **Two capacity tiles ship `#N/A`.** Remaining intake provider hours and unused diagnostic
  interview hours both return no value in the source. The second one matters more than it
  looks: it is the measure that would say whether the 36-day wait from diagnostic interview to
  first session is a capacity problem or a scheduling one.
- **A third of completed sessions carry no PHQ-9 score.** Every outcome measure on the payer
  reports rests on that coverage figure, and it is not stated on any of them.

## Two units for one measure

Session-to-note completion is here in **days** (1.70) and on
[Providers Compensation](providers-compensation.md) in **hours**, by CPT code. Same measure,
two scales, two reports. Worse, this dashboard shows two averages of it — per note and per
provider — that differ by how they are weighted, and nobody has said which the business is held
to. Both need resolving before either report is built.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Sessions scheduled, next four weeks | How full is the book, and is there room for an urgent member? | _unassigned_ | _to agree_ | Built |
| Sessions scheduled, following four weeks | How full is the book one window further out? | _unassigned_ | _to agree_ | Built |
| Projected session growth | Is session volume going up or down? | _unassigned_ | _to agree_ | Blocked — The projection basis is not stated anywhere in the source. A −13% figure with no stated method cannot be acted on |
| Completed sessions | How much did we actually deliver? | _unassigned_ | _to agree_ | Built |
| Cancelled sessions | How much booked work fell through? | _unassigned_ | _to agree_ | Blocked — Two cancellation rates appear in the source, 14.8% and 11.2%, on different tiles. Which denominator each uses is not stated |
| No-shows | How often does a member not turn up? | _unassigned_ | _to agree_ | Blocked — The count reads 0 and the rate reads 3.8%. One of the two is broken |
| Remaining intake provider hours | Can a newly referred member be seen? | _unassigned_ | _to agree_ | Blocked — The source returns #N/A. Shipped broken |
| Unused diagnostic interview hours | Is the wait to a first session a capacity problem or a scheduling one? | _unassigned_ | _to agree_ | Blocked — The source returns #N/A. Shipped broken, and it is the one number that would explain the longest wait on the patient journey |
| Session to note completion | How long after a session does its note appear? | _unassigned_ | _to agree_ | Blocked — Expressed in days here and in hours on Providers Compensation, and the source shows two differently weighted averages without saying which counts |
| Completed sessions with a PHQ score | What share of our sessions can appear in an outcome measure at all? | _unassigned_ | _to agree_ | Blocked — All-time from a fixed date, so it moves too slowly to show a recent fall. A monthly version is the one worth having |

## Open items

- **The rest of the dashboard.** Roughly twenty visuals across three tabs are not built. They
  need a readable capture of the tile headers, or the Definitions and Notes tab.
- **The no-show contradiction** — count 0, rate 3.8%.
- **Two `#N/A` measures** that have been on screen long enough that readers have stopped seeing
  them.
- **Two cancellation rates** — 14.8% and 11.2% — on the same dashboard with no stated
  denominators.
- **The projection basis** behind −13.03% session growth.
- **Days or hours** for session-to-note completion, and per-note or per-provider weighting.
- **PHQ coverage as a monthly measure** rather than an all-time one counted from a fixed date.
- **Owner** — unassigned, like every row in every specification here.
