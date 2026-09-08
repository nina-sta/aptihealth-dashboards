# Outreach and Prioritization — report specification

> **This document and [reports/internal/outreach-and-prioritization.html](../../reports/internal/outreach-and-prioritization.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — care navigators and outreach specialists, and whoever sets their
priorities.
**Purpose:** Say where members are stuck and in what order to chase them. Built on 8 Sep 2026
from the Sisense **Outreach and Prioritization** dashboard of 27 Aug 2026.

**Three bands:** the queues, then registration, then the lists.

## Only one of six tabs is built

The source dashboard has six tabs — Registration, Assessment, Scheduling, Retention, Care Navs
and Care Mgmt. **Only the Registration tab was captured**, and only it is built here. The other
five are named in the source and not in this report.

That is a deliberate stop rather than an omission to fill in later from guesswork: the whole
point of these mock-ups is to agree what a measure means, and a measure invented from a tab
nobody has seen agrees nothing. The seven queues in the first band come from the source's own
priority diagram, so the shape of the missing tabs is known even where their visuals are not.

Care Mgmt is the exception — its content was captured separately and is built as
[Advanced Care Note Metrics](advanced-care-note-metrics.md), not here.

## The finding on the page

**HCP referrals are one registration in five and roughly six pending registrations in seven.**
The channel that supplies the fewest members supplies almost the whole backlog.

That inversion has an innocent explanation and a serious one, and the data cannot separate
them. An HCP referral is made on a member's behalf by somebody else, so the member may never
have agreed to anything — in which case the largest queue on the page is not a backlog to chase
but a pile of referrals that were never real. Until somebody decides which it is, the
prioritisation this report exists to drive is built on sand.

## What the source dashboard does that this report does not

- **A page of instructions and an illustration.** The source opens with a banner, a stock
  illustration, a process diagram and four numbered paragraphs of encouragement. A report is
  not a training deck; the process diagram's content survives as the seven queues, and the rest
  does not.
- **Six tabs for seven queues.** They are one list — seven places a member can stop between
  being referred and being in care — and the size of each is the entire prioritisation
  argument. One sorted bar chart says it.
- **Six channel series.** Folded to five. The five-colour rule in this repo is a
  colour-blindness limit, not a preference: Embrace 365 goes to Other and health plans and
  health systems become one row.
- **Referring clinician names and work email addresses** in the worklist grids. Neither is
  here. Those are personal data about our referrers, which is a different problem from member
  PHI and no more publishable.
- **Member email, mobile and name** in the third worklist. Not here either; the list carries
  invented member ids.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Outreach queues | Where are members stuck, and which pile is biggest? | _unassigned_ | _to agree_ | Built |
| Members waiting somewhere | How much outstanding work is there in total? | _unassigned_ | _to agree_ | Blocked — Needs a deduplication rule. A member stalled at registration must not also be counted in the no-session queue, and no rule for that has been written |
| Members pending registration | How many referrals never became a member? | _unassigned_ | _to agree_ | Built |
| Monthly registrants by channel | Where do our members actually come from? | _unassigned_ | _to agree_ | Built |
| Pending registration by channel | Which channel supplies the backlog? | _unassigned_ | _to agree_ | Blocked — Whether an unregistered HCP referral is a member to chase or a referral that was never real is undecided, and it decides whether the largest queue is work at all |
| HCP referrals with a DI booked and no registration | Who has an appointment booked and no account? | _unassigned_ | _to agree_ | Blocked — The real list is protected health information, and it also carries referring clinicians' work emails. Who may open it has not been decided |
| Referrals pending registration, no DI booked | Who else is sitting in the registration queue? | _unassigned_ | _to agree_ | Blocked — Same access decision. The source also marks this list "limited to available data", so it is not the whole queue and nobody has said what is missing |
| Registered members with no DI and no future session | Who got an account and then stopped? | _unassigned_ | _to agree_ | Blocked — Same access decision |

## Open items

- **Are unregistered HCP referrals real members?** The single question this report turns on.
  Six of every seven pending registrations come from a channel where somebody else made the
  referral on the member's behalf.
- **A deduplication rule for the queues.** The seven overlap. Without a rule, the total is
  wrong and any queue-to-queue comparison is too.
- **The five unbuilt tabs** — Assessment, Scheduling, Retention, Care Navs. They were not
  captured. Each needs its own screenshots before anything is specified.
- **"Limited to available data"** — the source's own caveat on one worklist. Nobody has said
  what is missing or why, so the queue size behind that list is unknown rather than merely
  approximate.
- **Who may open a member worklist.** Three tiles here are lists of named members, and one also
  carries referrer contact details. The same decision is open on
  [Care Navigators](care-navigators.md) and [Advanced Care Note Metrics](advanced-care-note-metrics.md);
  it should be taken once for all three.
- **Owner** — unassigned, like every row in every specification here.
