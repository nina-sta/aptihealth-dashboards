# Provider journey — report specification

> **This document and [reports/internal/provider-journey.html](../../reports/internal/provider-journey.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** aptihealth clinical operations and leadership, and the data team.
**Purpose:** Show how documentation, supervision and provider configuration behave, because that is where delivered care turns into billable, defensible care.

## How to read the table

`Visual` matches the tile heading in the report exactly — that is the join key between this
document and the mock-up. This report carries no *CDPHP asked* markers: it reads as a purely
internal report, and what the payer asked for is tracked in the CDPHP report.

**The measure definition is not repeated here.** It lives in the ⓘ tooltip on the tile, so
there is exactly one copy of it and it cannot drift. This document owns the three things the
tooltip cannot know: who is accountable for the data, what decision the number changes, and
whether it is buildable yet.

`Owner` is the person accountable for the data being correct — not the person who builds the
visual. Every row currently reads `_unassigned_`; assigning them is the next working session
and is the point of this document.


| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Providers in matching pool | How many providers can actually take a new patient? | _unassigned_ | _to agree_ | Built |
| Notes signed < 24h | Is documentation keeping up? | _unassigned_ | _to agree_ | Built |
| Co-sign queue | How much unbillable work is stuck waiting for a supervisor? | _unassigned_ | _to agree_ | Built |
| Readiness flags | Which providers are silently invisible to matching? | _unassigned_ | _to agree_ | Built |
| Documentation and quality by supervisor group | Which supervisor group is struggling on documentation and quality? | _unassigned_ | _to agree_ | Built |
| Co-sign load by supervisor | Is the co-sign burden spread or concentrated? | _unassigned_ | _to agree_ | Built |
| Sessions held — billed vs unbilled | How much delivered care never gets billed? | _unassigned_ | _to agree_ | Built |
| Medical group headcount by licence type | Which roles is the medical group made of, and what licence does each one hold? | _unassigned_ | _to agree_ | Blocked — Needs a provider role attribute in the model (BHS, prescriber). If only licence type is stored, the role split has to be inferred from the licence |
| Co-sign rejections by reason | Why do supervisors send notes back? | _unassigned_ | _to agree_ | Built |
| Median time from session end to signed note | How long does a note actually take to get signed? | _unassigned_ | _to agree_ | Blocked — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified |
| Golden Thread completeness | Are our notes defensible in an audit? | _unassigned_ | _to agree_ | Built |

## Open items

- **Medical group headcount by licence type** — Needs a provider role attribute in the model (BHS, prescriber). If only licence type is stored, the role split has to be inferred from the licence. No longer shown as a warning on the tile; this document is the record.
- **Median time from session end to signed note** — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified. No longer shown as a warning on the tile; this document is the record.
