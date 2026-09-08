# Providers Compensation — report specification

> **This document and [reports/internal/providers-compensation.html](../../reports/internal/providers-compensation.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — clinical operations, finance, and whoever sets provider pay.
**Purpose:** Show what providers deliver that reaches a bill, and what stops the rest.
Built on 8 Sep 2026 from the Sisense **Providers Compensation** dashboard of 27 Aug 2026.

**Four bands:** what a provider is paid on, what stops a session being billed, capacity ahead,
and case mix.

## No money appears in this report

Neither does any in the source. Compensation here is measured in **billable sessions, billable
hours and RVUs** — the units pay is calculated *from*, not pay itself. No rate, no salary and
no earnings figure is on the page, and none should be added without deciding first who may
open the report. That decision has not been taken.

Provider names are invented throughout, as everywhere else in this repo.

## The chain the report is built on

> a session is delivered → a note is completed → the session becomes billable → it carries a
> CPT code → the code and the hours give an RVU

Every band is one link in that chain. **Note timeliness is on this page for that reason**: an
unsigned note is an unbilled session, so a documentation measure is also a compensation
measure. It carries the same heading as the version on the [Provider journey](provider-journey.md)
and the CDPHP report because it is the same measure — the heading is this repo's join key, and
the definition must not fork.

The rest of the documentation family — notes signed under 24 hours, median time from session
end to signed note, Golden Thread completeness — stays on the Provider journey and is not
repeated here.

## What the source dashboard does that this report does not

- **Two matrices for one comparison.** Billable sessions are split into a behavioral-health
  grid and a prescriber grid, which makes the two impossible to compare and leaves intake and
  case management out entirely. One stacked column carries all four roles.
- **RVU totals and hours in separate grids.** The division is left to the reader. RVU per hour
  is the measure this report exists to produce, so it is a column.
- **A doughnut for note timeliness** on the last seven service days, alongside a weekly stacked
  version of the same thing. The weekly one survives; a snapshot of a measure that has a trend
  is the trend read badly.
- **Two matrices of calendar links,** one per week, for available slots. Two series on one axis
  is the comparison those grids were trying to make.
- **A day-level grid per provider per CPT code,** five times over. At day level the numbers are
  ones and twos and nothing can be read from them; monthly with a provider matrix says the same
  thing.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Billable sessions | How much of what we deliver reaches a bill? | _unassigned_ | _to agree_ | Built |
| Billable sessions by CPT code | Is the earning mix shifting, or just the volume? | _unassigned_ | _to agree_ | Built |
| Billable sessions by provider role | Which roles carry the billable work? | _unassigned_ | _to agree_ | Built |
| Billable hours and RVUs by provider | What does an hour of each provider's time produce? | _unassigned_ | _to agree_ | Blocked — RVU per hour is not comparable across roles: a prescriber billing 99213 and a therapist billing 90837 are different jobs. Whether pay may be read from this number at all is undecided |
| Sessions delivered but not billable | How much delivered work are we failing to bill? | _unassigned_ | _to agree_ | Built |
| Note timeliness | Are notes signed in time for the session to be billed? | _unassigned_ | _to agree_ | Built |
| Average hours to a completed note by CPT code | Which kind of session generates the late notes? | _unassigned_ | _to agree_ | Blocked — Depends on a session-end timestamp existing in the model. The same blocker as on the Provider journey |
| Available appointment slots by day | How much bookable time is going unused? | _unassigned_ | _to agree_ | Built |
| Available slots by provider | Who has open time? | _unassigned_ | _to agree_ | Built |
| Primary diagnosis by provider | What is each provider actually treating? | _unassigned_ | _to agree_ | Blocked — A session carries a primary and a secondary diagnosis and the source shows both in one grid without distinguishing them. Only the primary is counted here, and that has to be confirmed |

## Open items

- **Whether compensation may be read from RVU per hour.** The number varies by more than half
  across the group and code mix could explain all of it. Before this report is used to set or
  defend anyone's pay, somebody has to say whether the measure is comparable across roles — and
  if it is not, what it is for.
- **Who may open this report.** No money is on the page, but billable hours and RVUs per named
  provider are the inputs to pay. The access decision has not been taken, and it should be
  taken before a rate column is ever added.
- **Session-end timestamp** — the note-completion measures depend on it existing in the model.
  Unconfirmed, and the same blocker sits on the Provider journey.
- **Primary versus secondary diagnosis** — the source does not distinguish them. The case-mix
  matrix counts primary only, on an assumption.
- **The 15% unbillable share is flat all year.** Nobody has been asked to move it, which is
  either because it is accepted or because nobody has seen it in one number before.
- **Owner** — unassigned, like every row in every specification here.
