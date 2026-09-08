# Session Activity — report specification

> **This document and [reports/internal/session-activity.html](../../reports/internal/session-activity.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — clinical operations, scheduling, and the product team who own the
video platform.
**Purpose:** Say what was booked, what was held, and where booked work is lost. Built on
8 Sep 2026 from the Sisense **Session Activity** dashboard, PDF export of the same day.

**Six bands:** volume and growth, billing and notes, booking and cancelling, attendance,
delivery and capacity, then access and satisfaction.

## The definitions tab of the source does not load

The source dashboard has a **Definitions** tab carrying a *Terms and Metric Definitions*
dictionary and a *Sisense Differences Dictionary*. Both visuals fail:

> Error querying your data model — The dimension, `Dev Elasticube.[Terms Dictionary.Term]`, was not found
>
> Error querying your data model — The dimension, `Dev Elasticube.[QS Sisense Differences Dictionary.Field]`, was not found

This matters more than any single measure on the page. The one place the source tried to record
what its numbers mean has been broken long enough that nobody mentions it, which is precisely
the failure this repo exists to prevent — and it is why the definitions live in the ⓘ tooltips
here rather than in a separate dictionary that can rot on its own.

A third visual, average days from service to a processed note, also fails, with an internal
ticket reference printed on the tile:

> Analytical Engine Error: `java.lang.ClassCastException` — BE#208517 Internal

It is built here as a `not documented` card rather than dressed up with a number, because it is
the measure that would join the unprocessed-note backlog to the billing delay.

## What the source dashboard does that this report does not

The source has roughly thirty-five visuals. This report has twenty-four, and the difference is
almost entirely one measure shown several times over:

- **Seven cancellation visuals** — a rate and a count for member, for provider and for
  automatic cancellations, plus a combined one — become two: one rate chart with three series
  and one count chart with three series. They are one measure cut three ways and belong on one
  pair of axes where they can be compared.
- **Member and provider shown as separate visuals** for booking pattern, cancellation pattern
  and rescheduling pattern. A chip does that, and the interesting thing is the difference
  between the two, which two visuals make the reader hold in their head.
- **Four sessions-per-day visuals** — overall, and one per role — become one with three series.
  The overall figure is the weighted average of the other three and adds nothing.
- **A count and a rate on one visual with a second axis,** for scheduled sessions and for
  billable encounters. Two units, two visuals, per the rule in this repo.
- **Dropped calls split by party and by device** as separate visuals with a rate and a count
  each: one visual and a chip.

## Findings worth acting on

- **Automatic cancellations nearly tripled** over the year while member and provider
  cancellations stayed flat. Nothing in the source defines what triggers one.
- **The completed-session rate has fallen two points,** every month a little lower than the
  last. Growing volume hides it in the counts, which is why the rate has its own tile.
- **Self sign-up members attend their first diagnostic interview far better** than members
  somebody else referred — 74% against 52% for HCP referrals. That is the same finding, from
  the other end, as the pending-registration inversion on
  [Outreach and Prioritization](outreach-and-prioritization.md).
- **A quarter of active members have nothing booked ahead of them,** which is the largest queue
  on the outreach report seen from the delivery side.
- **Only 31% of completed sessions carry a satisfaction rating,** so every satisfaction figure
  describes a third of the work.
- **Cancellations recorded after the session start time** are counted as cancellations here and
  may also be counted as no-shows. Whether a session can be both is undecided.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Sessions scheduled | How much was booked and what happened to it? | _unassigned_ | _to agree_ | Built |
| Completed session rate | Are we holding the sessions we book? | _unassigned_ | _to agree_ | Built |
| Month-over-month session growth | Is session volume growing? | _unassigned_ | _to agree_ | Blocked — Swings ±8% month to month, so a single reading says almost nothing. Needs a smoothing or comparison basis before it is quoted |
| Month-over-month note growth | Are notes keeping pace with sessions? | _unassigned_ | _to agree_ | Built |
| Sessions and notes due, next 14 days | What is coming, and what paperwork will it generate? | _unassigned_ | _to agree_ | Built |
| Sessions by CPT code | Which codes are we delivering under? | _unassigned_ | _to agree_ | Blocked — The source excludes an "Other" CPT bucket and does not say what is in it or how large it is |
| Billable encounters and notes processed | How much delivered work has not turned into money? | _unassigned_ | _to agree_ | Built |
| Average days from service to a processed note | How long does billing wait for the paperwork? | _unassigned_ | _to agree_ | Blocked — The source visual fails with java.lang.ClassCastException and carries an internal ticket reference, BE#208517 |
| Booking lead time | How far ahead do sessions get booked? | _unassigned_ | _to agree_ | Built |
| Cancellation rate by who cancelled | Who is cancelling, and is it changing? | _unassigned_ | _to agree_ | Built |
| Cancelled sessions by who cancelled | How many sessions does each kind of cancellation cost? | _unassigned_ | _to agree_ | Blocked — What triggers an automatic cancellation is not defined anywhere. It is the fastest-growing category on the page |
| Cancellation notice period | How much warning do we get? | _unassigned_ | _to agree_ | Blocked — Cancellations recorded after the session start may also count as no-shows. Whether a session can be both is undecided |
| Cancellation reasons | Why do people cancel? | _unassigned_ | _to agree_ | Blocked — Raw system strings, not an agreed list. Three separate "conflict" reasons, an "sms" reason describing a channel rather than a cause, and "other" second largest |
| Reschedules by notice period | How much warning does a reschedule come with? | _unassigned_ | _to agree_ | Built |
| No-show rate | Is attendance getting worse? | _unassigned_ | _to agree_ | Built |
| Members by no-show behaviour | Is this a general problem or a small group? | _unassigned_ | _to agree_ | Built |
| No-shows and cancellations by time of day | Are some slots worse than others? | _unassigned_ | _to agree_ | Built |
| Sessions per provider per day by role | How much is each kind of provider delivering? | _unassigned_ | _to agree_ | Blocked — Not comparable across roles: prescriber sessions are shorter, so the ratio is a session-length difference, not a productivity one |
| Providers delivering sessions by role | Is output changing, or headcount? | _unassigned_ | _to agree_ | Built |
| Members with and without a future session | Who is about to fall out of care? | _unassigned_ | _to agree_ | Built |
| Dropped calls | How often does the technology fail mid-session? | _unassigned_ | _to agree_ | Built |
| Diagnostic interview outcome by referral channel | Does the channel a member arrives through predict whether they turn up? | _unassigned_ | _to agree_ | Built |
| HCP referrals — time from referral to a booked DI | How fast do we book a referred member in? | _unassigned_ | _to agree_ | Blocked — The source's top bucket is "120+ hours", which is five days and holds the largest group. Everything slower than five days looks identical, and that is where the problem is |
| Sessions by patient satisfaction rating | What do members say about their sessions? | _unassigned_ | _to agree_ | Blocked — The source carries both an "average PSS score" and an "average PSS rating" without saying how they differ, and only 31% of sessions carry either |

## Open items

- **The Definitions tab is broken** — both dictionary visuals fail on a missing dimension.
- **BE#208517** — the average-days-to-processed-note visual fails with a Java exception and has
  a ticket number printed on it.
- **What triggers an automatic cancellation.** Fastest-growing category, undefined.
- **Whether a session can be both cancelled and a no-show,** for cancellations recorded after
  the start time.
- **The cancellation reason list** — raw system values, never agreed.
- **The "Other" CPT bucket** the source excludes without describing.
- **PSS score versus PSS rating** — two measures, one name, no stated difference.
- **The 120+ hour bucket** on referral-to-booking, which hides the whole tail.
- **Refresh cadence** — the source says it queries notes, calendar and billing activity every
  two hours. Whether the Power BI build matches that has not been decided.
- **Owner** — unassigned, like every row in every specification here.
