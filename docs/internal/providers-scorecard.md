# Providers Scorecard — report specification

> **This document and [reports/internal/providers-scorecard.html](../../reports/internal/providers-scorecard.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — clinical operations, finance, and every provider who is scored by it.
**Purpose:** Score a named provider against thresholds, and record what was withheld from their
pay when a threshold was missed. Partly built on 8 Sep 2026 from the Sisense **Providers
Scorecard** dashboard, screen capture of the same day.

## Read this before anything else

**This report withholds people's pay.** It is the only report in this repo where a wrong
measure definition costs a named individual money rather than causing a bad decision. Three
things follow from that, and none of them is settled:

1. **Who may open it.** Not decided. It contains per-provider performance and pay consequences.
2. **What a provider can appeal, and to whom.** Not decided, and not visible anywhere in the
   source.
3. **Whether the thresholds are right.** A single group-wide threshold is applied to every
   provider with no adjustment for case mix, panel size, or the members they were given.

No currency appears anywhere in this mock-up. Withheld amounts are expressed as a share of the
pay cycle, for the same reason no rate column appears on
[Providers Compensation](providers-compensation.md): until who-may-see-this is decided, putting
money on the page decides it by default.

## The thresholds are being applied to numbers providers do not control

This is the substantive finding, and it runs through two of the visuals below.

**Cancellation rate.** The scorecard counts member, provider and automatic cancellations
together. [Session Activity](session-activity.md) shows that the entire growth in cancellations
this year is *automatic* ones — nearly tripled — and that nothing in the source defines what
triggers one. Providers are being scored on a rising number that they do not cause and nobody
can explain.

**Utilisation.** Utilisation is the threshold missed in almost every withhold event: 103 of 181.
Its denominator is available hours, of which **a third are worked but not billable** and nothing
says what is in them. A threshold that drives nearly all of the withholding is being applied to
a denominator nobody has examined.

Together those two mean the pay consequence is concentrated on the measure with the weakest
definition. That should be fixed before this is built, not after.

## Partial build

The source has three tabs — **Provider Metrics**, **Sustainable Metrics** and **Definitions**.
Only Provider Metrics is built, and only the parts legible in a screen capture. The other two
are not built.

The Session Activity report in this repo was rebuilt from a PDF export once one was available,
and the export carried real text — measure names, bucket boundaries and error messages that a
screenshot could not give. **The same export of this dashboard would let the rest be built
properly**, and given what this report does, guessing at a measure name here is worse than
leaving it out.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Billable hours | How many hours reached a bill? | _unassigned_ | _to agree_ | Built |
| Utilisation rate against threshold | Are providers billing enough of their available time? | _unassigned_ | _to agree_ | Blocked — A third of available hours are worked but not billable and nothing says what is in them. This threshold drives almost all the withholding |
| Where provider hours go | What is in the denominator? | _unassigned_ | _to agree_ | Blocked — The non-billable third has never been broken out |
| No-show rate against threshold | How often do this provider's members not attend? | _unassigned_ | _to agree_ | Blocked — Scored per provider and tied to pay, on a behaviour the provider does not control |
| Cancellation rate against threshold | How often are this provider's sessions cancelled? | _unassigned_ | _to agree_ | Blocked — Counts automatic cancellations, which nearly tripled this year and which nobody can define, alongside member and provider ones |
| Provider scorecard | How is each provider doing against the thresholds? | _unassigned_ | _to agree_ | Blocked — One group-wide threshold per measure, with no adjustment for case mix or panel |
| Providers with pay withheld | How many people did this cost money? | _unassigned_ | _to agree_ | Blocked — Needs the governance decisions above before it is built at all |
| Withheld and recovered by pay cycle | Is withheld pay being earned back? | _unassigned_ | _to agree_ | Blocked — Recovery falls every cycle, from 67% to 33%. Nobody has been asked whether that is the policy working or failing |
| Withhold by pay cycle and threshold missed | Which threshold is doing the withholding? | _unassigned_ | _to agree_ | Blocked — Utilisation in almost every case, and its definition is the weakest on the page |
| Which threshold was missed | Where is the pay consequence concentrated? | _unassigned_ | _to agree_ | Built |
| Providers by number of cycles withheld | Is this a few people repeatedly, or many people once? | _unassigned_ | _to agree_ | Blocked — Nine providers withheld from in four or more cycles of six. Either their work or the threshold is wrong for them, and this report cannot tell which |

## Open items

- **Who may open this report**, and what a provider may appeal, to whom. Both gate the whole
  thing.
- **What is in the non-billable third of available hours.** It is the utilisation denominator
  and utilisation drives nearly all the withholding.
- **Whether automatic cancellations belong in a provider's cancellation rate.** They are the
  entire growth in cancellations and nobody can define them.
- **Whether one group-wide threshold fits every provider** regardless of case mix and panel.
- **Recovery is falling** — 67% of withheld pay recovered in the first cycle, 33% by the sixth.
  Nobody has been asked whether that is the policy working or failing.
- **Nine providers withheld from in four or more cycles out of six.**
- **The Sustainable Metrics and Definitions tabs** are not built and need a readable export.
- **Owner** — unassigned, like every row in every specification here. On this report that is
  less acceptable than on the others.
