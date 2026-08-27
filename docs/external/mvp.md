# MVP payer report — report specification

> **This document and [reports/external/mvp.html](../../reports/external/mvp.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** MVP Health Care, and internally whoever signs off before anything leaves the building.
**Purpose:** Answer what MVP asked for. This report is the CDPHP report with visuals switched off — that is the model for every payer after the first, so a measure missing from [the CDPHP report](cdphp.md) is missing here too.

**Five pages, one report,** mirroring CDPHP page for page so the two can be read side by side:
MVP Billing, MVP Patient Acquisition, MVP CN referrals, Clinical Outcomes (PHQ9), MVP
Update. Every one of them is currently empty.

## What is decided and what is not

Decided: that MVP gets its own report rather than a payer slicer on the CDPHP one, and that the
page structure follows CDPHP.

Not decided, and both block any visual going in:

- **What MVP actually asked for.** The CDPHP report exists because CDPHP sent a list of
  statistics. There is no equivalent list for MVP, so nothing here can claim to answer one.
- **Which CDPHP visuals are switched on.** "Every other payer report is CDPHP with visuals
  switched off" only becomes a report once someone says which ones are off. That is a
  contractual question as much as a data one — the 7-day follow-up standard, the HEDIS
  thresholds and the acuity definitions are all per-contract.

Until both are answered the report ships as five named, empty pages with a note saying so. It
is registered in `tools/sync.py` and appears in the report navigation, so the moment a visual
lands the specification pairing is already enforced.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

## Page — MVP Billing

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| What this report is for | What has been decided about this report, and what has not? | _unassigned_ | _to agree_ | Blocked — Not a measure. It is the note that keeps an empty report from reading as a finished one, and it comes out the moment the first real visual goes in |

## Page — Clinical Outcomes (PHQ9)

Built from the Sisense **Clinical Outcome - PHQ9, GAD7 Report** of 20 Aug 2026, cut to MVP.
The x axis on every trend here is the assessment period — Day 0, 30, 60 — not a month. These
follow one cohort forward; they are not monthly measures, which is the one place this page
departs from the every-measure-is-monthly rule and does so deliberately.

Two things about the source worth writing down, because they are easy to lose:

- **Day 0 severity bands never re-sort.** A member is grouped by the band their first score
  fell in and followed from there, so a member who improves stays in the band they started in.
  Re-sorting them each assessment would make every line look flat.
- **The five-point measure has a floor.** A Day 0 score under 5 cannot fall 5 points, so
  None-Minimal reads 0% however well those members do.

**MVP scores rise after Day 30 rather than falling,** which is the opposite of every other
payer in the source report. On 148 members that is as likely to be sampling noise as a real
result. Nothing on this page should reach MVP until someone has checked whether the
cohort is large enough to say anything.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Members with any reduction in PHQ-9 | Are members getting better at all? | _unassigned_ | _to agree_ | Built |
| Members with any reduction in GAD-7 | Are members getting better at all on anxiety, not just depression? | _unassigned_ | _to agree_ | Built |
| Members in remission at Day 90 | How many finish the programme with a score in the normal range? | _unassigned_ | _to agree_ | Built |
| Members with a 5-point reduction in PHQ-9 | How many improve by a clinically meaningful amount? | _unassigned_ | _to agree_ | Built |
| Average and median PHQ-9 across the treatment period | How far does a typical member's score fall, and when? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by Day 0 severity | Does the programme work for the sickest members, or only the mild ones? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by baseline acuity | Does our own acuity call at intake predict the outcome? | _unassigned_ | _to agree_ | Built |
| Members with a 5-point PHQ-9 reduction by Day 0 severity | Which starting band actually clears the clinical threshold? | _unassigned_ | _to agree_ | Blocked — The measure is floor-limited: a Day 0 score under 5 cannot fall 5 points, so None-Minimal reads 0% by construction. Agree whether that band is excluded from the denominator or shown at zero with the caveat |
| Members by Day 0 severity | How many members sit behind each band on this page? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 at Day 0, 30 and 60 by referral group | Do some referral sources send us members who then do better? | _unassigned_ | _to agree_ | Built |
| Members in remission by registration year | Is the programme getting better at producing remission year on year? | _unassigned_ | _to agree_ | Blocked — On 148 members the year-on-year differences here are inside the noise. Agree a minimum cohort size before this leaves the building |

## Pages with no visuals

MVP Patient Acquisition and MVP CN referrals have no rows because they have no visuals yet.
Adding a visual means adding a row in the same commit.
