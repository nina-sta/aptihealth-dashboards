# Patient journey — report specification

> **This document and [reports/internal/patient-journey.html](../../reports/internal/patient-journey.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** aptihealth leadership and product, and the data team who will build it in Power BI.
**Purpose:** Show the member's path from referral to discharge so we can agree which numbers we run the business on, then hand those definitions to data science.

## How to read the table

`Visual` matches the tile heading in the report exactly — that is the join key between this
document and the mock-up. This report no longer marks which visuals answer a CDPHP question;
the ⬥ marker lives in the payer report and in the provider report, not here.

**The measure definition is not repeated here.** It lives in the ⓘ tooltip on the tile, so
there is exactly one copy of it and it cannot drift. This document owns the three things the
tooltip cannot know: who is accountable for the data, what decision the number changes, and
whether it is buildable yet.

`Owner` is the person accountable for the data being correct — not the person who builds the
visual. Every row currently reads `_unassigned_`; assigning them is the next working session
and is the point of this document.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Acquisition and access funnel | Where in sign-up do people fall out? | _unassigned_ | _to agree_ | Built |
| Where members drop out — inactivation by journey stage | Do people leave before care starts or after it finishes? | _unassigned_ | _to agree_ | Built |
| Members served | How many people have we ever treated for this payer? | _unassigned_ | _to agree_ | Built |
| Engaged members | How many are in care right now? | _unassigned_ | _to agree_ | Built |
| Days from registration to inactivation | How long do people last before going inactive? | _unassigned_ | _to agree_ | Blocked — Needs an inactivation reason field to separate lapsed from clinically discharged |
| Routine referrals | How much routine referral volume arrived last month? | _unassigned_ | _to agree_ | Built |
| Access by referral channel | Which channel converts, and how fast? | _unassigned_ | _to agree_ | Built |
| Median days to first appointment — urgent vs routine | How long is the wait, and does urgency change it? | _unassigned_ | _to agree_ | Built |
| Urgent referrals — time to care by reason | Which urgent reasons wait longest? | _unassigned_ | _to agree_ | Built |
| Acuity 4 by referral channel and admission source | Is high acuity really mostly hospital and ED discharges? | _unassigned_ | _to agree_ | Built |
| Self sign-up by how they heard about us | What is actually bringing self sign-ups in? | _unassigned_ | _to agree_ | Built |
| ACP consent to touchpoints met | Where does the ACP path lose people — eligibility, consent, or the touchpoints themselves? | _unassigned_ | _to agree_ | Blocked — Confirm where ACP eligibility and consent are stored. The touchpoint count is built today; neither flag has a confirmed field |
| Diagnostic interviews — first-time vs repeat | How much intake capacity goes to people we have already assessed? | _unassigned_ | _to agree_ | Blocked — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days |

## Open items

- **ACP consent to touchpoints met** — Confirm where ACP eligibility and consent are stored. The touchpoint count is built today; neither flag has a confirmed field.
- **Days from registration to inactivation** — Needs an inactivation reason field to separate lapsed from clinically discharged.
- **Diagnostic interviews — first-time vs repeat** — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days.
