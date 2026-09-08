# Advanced Care Note Metrics — report specification

> **This document and [reports/internal/advanced-care-note-metrics.html](../../reports/internal/advanced-care-note-metrics.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — care management, and whoever answers to MVP for the touchpoint
requirement.
**Purpose:** Show whether the case-management contact we are contractually committed to is
actually happening. Built on 8 Sep 2026 from the Sisense care-management dashboard of
27 Aug 2026.

**Three bands:** the care activity notes themselves, then touchpoint adherence, then the
worklists.

## What this report is, and what it is not

A **care activity note** is the record of a touchpoint — an attempt to reach a member in care
management. So this report is about contact, not about clinical documentation. The
documentation measures — notes signed under 24 hours, time from session end to signed note,
Golden Thread completeness — are on the [Provider journey](provider-journey.md) and stay
there. Nothing on this page duplicates them.

**The source is MVP-shaped.** The touchpoint requirement is an MVP contractual obligation, and
every list in the source dashboard is filtered to MVP members. The measures here are written
payer-agnostically because the same question will be asked of the next contract that carries a
touchpoint clause, but today the only population with a requirement is MVP.

## The finding on the page

Note volume grew almost six-fold over the year — 96 notes in September, 555 in August. The
share where the member actually attended halved over the same stretch, 59% to 32%.

A rate falling as its denominator grows is usually a definition problem rather than a
performance one. Either notes are being written for contact that is not happening, or what
counts as *attended* changed under us. Nothing in the data separates the two, and this is the
first thing to resolve — every adherence number below is built on the same field.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Care activity notes written | How much case-management contact is being attempted? | _unassigned_ | _to agree_ | Built |
| Care activity notes — member attended or not | Is the growth in notes reaching anybody? | _unassigned_ | _to agree_ | Blocked — Depends on what "attended" means on a care activity note. The rate halves as volume grows, which reads as a definition change rather than a result |
| Share of care activity notes where the member attended | Are we getting better or worse at reaching members? | _unassigned_ | _to agree_ | Blocked — Same definition as the row above |
| Care activity notes by acuity | Do sicker members get more contact, and are they any easier to reach? | _unassigned_ | _to agree_ | Built |
| Members meeting their required touchpoints | Are we meeting the contract? | _unassigned_ | _to agree_ | Blocked — The required number of touchpoints per acuity is assumed, not confirmed. Every adherence figure moves if the assumption is wrong |
| Members with no successful touchpoint | Who did we fail to reach at all? | _unassigned_ | _to agree_ | Built |
| Touchpoint outcome by communication type | Which channel actually reaches people? | _unassigned_ | _to agree_ | Built |
| Touchpoint adherence by acuity | Where does adherence break down? | _unassigned_ | _to agree_ | Blocked — Same assumed requirement as above |
| Touchpoints by provider | Who is reaching their members and who is not? | _unassigned_ | _to agree_ | Blocked — The 6%-to-71% spread is either how people work or which members they were handed. Nothing here separates them, so this cannot yet be used to manage anybody |
| Members eligible for care management | Which named members are we on the hook for this month? | _unassigned_ | _to agree_ | Blocked — The real list is protected health information. Who may open it has not been decided |
| Touchpoint adherence by member | Which named members are short of their required contact? | _unassigned_ | _to agree_ | Blocked — Same access decision, and the same assumed requirement |
| Members with no session in 90 days | Who has gone quiet? | _unassigned_ | _to agree_ | Built |

## What the source dashboard does that this report does not

- **Count and rate on one grid.** The source puts note counts and the attendance rate in the
  same table. They are different units, so they are two visuals here.
- **Two bar charts for one split.** Note count by acuity and attended-note count by acuity sit
  side by side in the source, which asks the reader to line up four rows across two visuals.
  One stacked row per acuity says it in one place.
- **The same table twice, current month and prior month.** A month chip does that job once.
- **All 201 providers, unsorted, with no rate.** The rate is what makes the list readable and
  the sort is what makes it actionable. Top 5 by default, on a chip.
- **Protected health information.** Full name, date of birth, email, mobile, insurance id and
  group id all appear in the source lists. None of them are here; the worklists carry invented
  member ids and nothing that identifies a person.

## Open items

- **What "attended" means on a care activity note.** The single most important open question on
  this page. Three visuals are blocked on it and the headline finding cannot be interpreted
  without it.
- **The required touchpoints per acuity.** Assumed here to rise 1, 2, 3, 4 with acuity. This is
  a contractual figure and nobody has confirmed it. Four visuals move if it is wrong.
- **Who may open a member worklist.** Three tiles are lists of named members. The decision gates
  all three, and is the same decision open on [Care Navigators](care-navigators.md).
- **Provider touchpoint spread** — 6% to 71% success across the group. Before this is used to
  manage anyone, we need to know whether case-mix explains it.
- **Whether this report stays payer-agnostic.** Today only MVP has a touchpoint requirement. If
  a second contract adds one with different thresholds, the adherence measures need a per-payer
  requirement rather than one assumed ladder.
- **Owner** — unassigned, like every row in every specification here.
