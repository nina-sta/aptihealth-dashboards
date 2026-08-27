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

Every widget from the Sisense **Clinical Outcome - PHQ9, GAD7 Report** of 20 Aug 2026, cut to
MVP. Thirty-seven visuals in eight bands, in the order the page reads them: Headline,
Trajectory, Who they are, Improvement and remission, Time to improvement, GAD-7, By referral
source, Submission file.

The x axis on every trend here is the assessment period — Day 0, 30, 60, and further where the
source goes further — not a month. These follow one cohort forward; they are not monthly
measures, which is the one place this page departs from the every-measure-is-monthly rule and
does so deliberately.

Five things about the source worth writing down, because they are easy to lose:

- **Day 0 severity bands never re-sort.** A member is grouped by the band their first score fell
  in and followed from there. Re-sorting them each assessment would make every line look flat.
- **The five-point measures have a floor.** A Day 0 score under 5 cannot fall 5 points, so
  None-Minimal reads 0% however well those members do. True of the PHQ-9 and GAD-7 versions
  alike, and they have to be resolved together.
- **GAD-7 has four bands, PHQ-9 has five,** and the cut points differ. The two instruments'
  charts are not read off one scale.
- **Diagnosis rows do not sum to the population.** A member can carry several diagnoses, so that
  matrix is counts only — a share of the total there would be nonsense.
- **The newest registration cohort has no Day 360 bar** because it has not aged. Reading its
  absence as a fall is the mistake those visuals invite.

Two departures from the source. It puts the member count on a second axis of the average-score
chart; the count is constant across all three assessments, so it is the tile subtitle instead —
a second axis is not allowed here and in this case carries nothing. And the severity bands use
the categorical palette rather than the source's red-to-green ramp: five ordinal steps want a
sequential scale and this repo does not define one, which is worth deciding.

**MVP scores rise after Day 30 rather than falling,** which is the opposite of every other payer
in the source report, and it runs through every visual on this page. On 148 members that is as
likely to be sampling noise as a real result. Nothing here should reach MVP until someone has
checked whether the cohort is large enough to say anything at all.

The submission-file tile carries **invented names, member ids and dates of birth**. The real file
is protected health information; the mock-up exists to agree the column list.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Members with any reduction in PHQ-9 | Are members getting better at all? | _unassigned_ | _to agree_ | Built |
| Members with any reduction in GAD-7 | Are members getting better on anxiety, not just depression? | _unassigned_ | _to agree_ | Built |
| Members in remission at Day 90 | How many finish with a score in the normal range? | _unassigned_ | _to agree_ | Built |
| Members with a 5-point reduction in PHQ-9 | How many improve by a clinically meaningful amount? | _unassigned_ | _to agree_ | Built |
| Average and median PHQ-9 across the treatment period | How far does a typical member's score fall, and when? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by Day 0 severity | Does the programme work for the sickest members, or only the mild ones? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by Day 0 severity through Day 180 | Does improvement continue past 90 days, or stop there? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by baseline acuity | Does our own acuity call at intake predict the outcome? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 at Day 0 by Day 0 severity | What is the average starting score inside each band? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by external risk score bracket | Does the bought-in risk score line up with the instrument? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 by registration year | Are newer cohorts starting sicker or finishing better? | _unassigned_ | _to agree_ | Built |
| Members by Day 0 severity | How many members sit behind each band on this page? | _unassigned_ | _to agree_ | Built |
| Population by age at referral | Who are we treating, by age at referral? | _unassigned_ | _to agree_ | Built |
| Population by gender identity | Who are we treating, by gender identity? | _unassigned_ | _to agree_ | Built |
| Population by race | Who are we treating, by race? | _unassigned_ | _to agree_ | Built |
| Population by education | Who are we treating, by education? | _unassigned_ | _to agree_ | Built |
| Population by marital status | Who are we treating, by marital status? | _unassigned_ | _to agree_ | Built |
| Population by living situation | Who are we treating, by living situation? | _unassigned_ | _to agree_ | Built |
| Population by work status | Who are we treating, by work status? | _unassigned_ | _to agree_ | Built |
| PHQ-9 Day 0 severity by diagnosis category | Which diagnoses arrive sickest? | _unassigned_ | _to agree_ | Built |
| PHQ-9 item 9 — thoughts of being better off dead | How many members report suicidal ideation at intake, and how strongly? | _unassigned_ | _to agree_ | Built |
| Members with a 5-point PHQ-9 reduction by Day 0 severity | Which starting band actually clears the clinical threshold? | _unassigned_ | _to agree_ | Blocked — The measure is floor-limited: a Day 0 score under 5 cannot fall 5 points, so None-Minimal reads 0% by construction. Agree whether that band leaves the denominator or stays at zero with the caveat |
| Members with any drop in PHQ-9 by registration year | Is the share of members who improve at all holding up? | _unassigned_ | _to agree_ | Built |
| Members in remission by registration year | Is the programme getting better at producing remission year on year? | _unassigned_ | _to agree_ | Built |
| Members in remission by assessment day | When does remission stop climbing? | _unassigned_ | _to agree_ | Built |
| Members with clinically significant improvement at Day 30 | Does the early signal predict the year? | _unassigned_ | _to agree_ | Built |
| Members with a 50% PHQ-9 improvement at Day 60 | How many halve their score inside 60 days? | _unassigned_ | _to agree_ | Built |
| Days to a 50% PHQ-9 reduction by Day 0 severity | Do sicker members take longer to halve their score? | _unassigned_ | _to agree_ | Built |
| Days to a 50% PHQ-9 reduction by work status | Does working, or not working, change how fast a member improves? | _unassigned_ | _to agree_ | Built |
| Days to a 50% PHQ-9 reduction by housing | Does housing stability change how fast a member improves? | _unassigned_ | _to agree_ | Built |
| Average GAD-7 by Day 0 severity | Does anxiety respond the way depression does? | _unassigned_ | _to agree_ | Built |
| Members with a 5-point GAD-7 reduction by Day 0 GAD-7 severity | Which anxiety band clears the clinical threshold? | _unassigned_ | _to agree_ | Blocked — Floor-limited in the same way as the PHQ-9 version. The two measures have to be resolved together, not one at a time |
| Average PHQ-9 at Day 0, 30 and 60 by referral group | Do some referral sources send us members who then do better? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 at Day 0, 30 and 60 by referral channel | Which channel, not which named referrer, sends the sickest members? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 at Day 0 by self-reported referral source | What do members themselves say brought them in, and do those groups differ? | _unassigned_ | _to agree_ | Built |
| Average PHQ-9 at Day 0, 30 and 60 by primary payor | How does this payer compare with every other payer we serve? | _unassigned_ | _to agree_ | Built |
| mvp_MMddyyyy_PHQ9 | What exactly do we send the payer, field by field? | _unassigned_ | _to agree_ | Built |

## Pages with no visuals

MVP Patient Acquisition and MVP CN referrals have no rows because they have no visuals yet.
Adding a visual means adding a row in the same commit.
