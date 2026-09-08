# Referrals — report specification

> **This document and [reports/internal/referrals.html](../../reports/internal/referrals.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — _to agree_.
**Purpose:** _Not yet written._ Set on 8 Sep 2026 as a deliberate placeholder: **the CDPHP
CN referrals page, copied**, to be argued with rather than to be believed.

## This report is a copy, on purpose

Every visual here is the CDPHP report's **CN referrals** page — same measures, same headings,
same definitions in the ⓘ tooltips. The headings are identical because the measures are
identical; the heading is this repo's join key, and forking a definition by renaming it is the
failure the key exists to prevent.

One thing does differ, and it is the reason this cannot stay as it is: the CDPHP page counts
one payer, and an internal report should count all of them. Until this report is scoped, every
figure on it is a payer cut standing in for an all-payer one.

**And the title overclaims.** Every tile here is *care navigator* referrals. A report called
Referrals should cover referrals — HCP practices, PCP practices, health plans, health systems,
self sign-up — of which care navigators are one channel among several.

## What has to be decided before this stops being a copy

- **What this report answers that the CDPHP page does not.** If the honest answer is "nothing
  except the payer filter", then this should be a slicer on that page and not a report.
- **Its relationship to the four referral measures on the [Patient journey](patient-journey.md)** —
  Routine referrals, Access by referral channel, Urgent referrals — time to care by reason, and
  Referral to first appointment conversion rate. They are referral measures that already have a
  home.
- **Its relationship to [Care Navigators](care-navigators.md)**, which was built on the same day
  and already carries the care-navigator view in a wider form, including the referral source
  reconciliation and the DI outcome work.
- **All channels, or one.** The title says all. The content is one.

Until those are answered, the two blockers already recorded against the CDPHP page apply
unchanged here: duplicate practice names, and the missing referring facility at registration.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Total CN referrals | How much referral volume arrives, and how much becomes a member? | _unassigned_ | _to agree_ | Blocked — Copied from the CDPHP page, so it counts one payer. An internal report needs all of them |
| CN referrals per month | Is referral volume growing? | _unassigned_ | _to agree_ | Blocked — Same payer cut as above |
| CN referrals per working day | Is a quiet month quiet, or short? | _unassigned_ | _to agree_ | Blocked — Same payer cut as above |
| Weekly CN referral counts by care navigator | Who is carrying the volume? | _unassigned_ | _to agree_ | Blocked — The source groups by a field labelled "Facility" whose values are people. Also duplicated, in a wider form, on Care Navigators |
| Monthly CN referrals by referring facility | Which facilities send us members? | _unassigned_ | _to agree_ | Blocked — The same facility appears two or three times in the source, so every facility total is understated |
| Registered members by referring facility | Can we tell who referred a member once they register? | _unassigned_ | _to agree_ | Blocked — 96% of registered members carry no referring facility |

## Open items

- **Scope.** This report is a copy and says so. Deciding what it is for is the whole of the
  next piece of work, and it may end with the report being deleted in favour of a slicer.
- **The title covers more than the content.** Care-navigator referrals are one channel.
- **Overlap with Care Navigators and the Patient journey**, both of which carry referral
  measures already.
- **Duplicate practice names** and **missing referring facility at registration** — inherited
  from the CDPHP page along with everything else.
- **Owner** — unassigned, like every row in every specification here.
