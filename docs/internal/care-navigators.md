# Care Navigators — report specification

> **This document and [reports/internal/care-navigators.html](../../reports/internal/care-navigators.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — the care navigation team and whoever runs it.
**Purpose:** Show what the navigation team brings in, how far those members get, and who is
stuck. Built on 8 Sep 2026 from the Sisense **Care Navigators** dashboard of 27 Aug 2026.

**Three bands, read top-down:** referral volume, then from referral into care, then the
worklists the team actually works from.

## Relationship to the CDPHP report

The CDPHP report has a **CN referrals** page. It is the same team seen through one payer's
eyes, and it is deliberately narrower. Four measures appear in both reports under the same
heading, which is the join key this repo uses — that is intentional and means they must carry
the same definition:

- Registration to diagnostic interview
- Diagnostic interview to first session
- Registered members by referring facility

The CDPHP page counts CDPHP members; this report counts everyone. If the two ever disagree by
more than the payer cut explains, it is the definition that has drifted, not the data.

## What the source dashboard does that this report does not

- **Doughnuts.** The source uses three — referring facility, payer, acuity. All three are bar
  charts here. One category at 96%, or eight payer slices, cannot be read as angles, and acuity
  is ordinal so a circle throws away the order.
- **A daily / weekly / monthly toggle** on referral counts. Monthly only here. Daily is noise
  at this volume and weekly puts fifty-one labels on an axis that fits twelve.
- **Four separate worklists** with nearly identical columns. They are one list with different
  filters and should be built once with a filter. Two of them survive here as the filters that
  carry a distinct decision; the rest of the columns are on the first list.
- **Protected health information.** The source lists member emails, mobile numbers and dates of
  birth. Every worklist here carries invented member ids and no contact details at all. Who may
  open the real list is a decision nobody has taken, and it has to be taken before this is built.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Total referrals | How much does the team bring in, and how much of it becomes a member? | _unassigned_ | _to agree_ | Built |
| Referrals logged by care navigator | Who is carrying the volume? | _unassigned_ | _to agree_ | Blocked — The source groups this by a field labelled "Care Navigator Facility" whose values are people. Confirm which field is being grouped before this is built |
| Monthly referrals by referring facility | Which facilities send us members, and is the mix changing? | _unassigned_ | _to agree_ | Blocked — The same facility appears two or three times in the source, so every facility total is understated. Deduplicate the practice list first |
| Referral payer mix | Which payers are we bringing in members for? | _unassigned_ | _to agree_ | Blocked — CDPHP, CDPHP Medicaid and CDPHP Medicare are listed as three unrelated slices. Decide whether this report wants the payer or the line of business |
| Referral source by month | Do the volume, navigator and facility charts reconcile? | _unassigned_ | _to agree_ | Built |
| Registration to diagnostic interview | How long does a member wait for their assessment? | _unassigned_ | _to agree_ | Built |
| Diagnostic interview to first session | How long does a member wait for care after being assessed? | _unassigned_ | _to agree_ | Built |
| Members by acuity at referral | How sick are the members arriving? | _unassigned_ | _to agree_ | Blocked — Acuity at referral is not the same field as the baseline acuity used on the outcomes reports. Confirm which one this is |
| Diagnostic interviews by attempts to complete | How many members never get assessed at all? | _unassigned_ | _to agree_ | Built |
| Registered members by referring facility | Can we tell who referred a member once they have registered? | _unassigned_ | _to agree_ | Blocked — 96% of registered members carry no referring facility. Until it is populated at registration, no facility-level outcome measure exists |
| Initial DI outcome by days from referral | Does booking a member further out make them likelier to miss? | _unassigned_ | _to agree_ | Built |
| Members referred, with DI outcome | Which named members need chasing, and where did they stop? | _unassigned_ | _to agree_ | Blocked — The real list is protected health information. Who may open it has not been decided |
| Members whose diagnostic interview was not attended | Who booked an assessment and did not turn up? | _unassigned_ | _to agree_ | Blocked — Same access decision as the list above |
| Members with a completed DI and no session booked | Who cleared the assessment and then stopped? | _unassigned_ | _to agree_ | Blocked — Same access decision as the list above |
| Referrals by HCP practice | How bad is the duplicate-practice problem? | _unassigned_ | _to agree_ | Built — as evidence rather than as a measure. It comes out when the practice list is deduplicated |

## Open items

- **Who may open a member worklist.** Four tiles here are lists of named members. The source
  puts emails, mobile numbers and dates of birth on screen. Nobody has decided who this report
  is shared with, and that decision gates all four.
- **Duplicate practice names.** A typed name and a system slug are counted as separate
  practices throughout. Every facility figure in this report is understated until that is fixed
  at source, and the last tile exists only to show it.
- **Referring facility at registration** — recorded on the referral, lost at registration, so
  96% of registered members have none. Nothing facility-level can be joined to an outcome.
- **"Care Navigator Facility"** — the field the source groups navigators by. Its values are
  people, so either the field is misnamed or the wrong one is being grouped.
- **Payer versus line of business** — CDPHP appears three times in the payer mix. One of them
  is the payer; the other two are plans under it.
- **Acuity at referral versus baseline acuity** — two fields, two reports, one word. Confirm
  which this tile uses before anyone compares it with the outcomes work.
- **Owner** — unassigned, like every row in every specification here.
