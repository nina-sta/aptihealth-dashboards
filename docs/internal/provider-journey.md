# Provider journey — report specification

> **This document and [reports/internal/provider-journey.html](../../reports/internal/provider-journey.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** aptihealth clinical operations and leadership, and the data team.
**Purpose:** Show how documentation, supervision and provider configuration behave, because that is where delivered care turns into billable, defensible care.

## How to read the table

`Visual` matches the tile heading in the report exactly — that is the join key between this
document and the mock-up. A ⬥ means the visual answers a statistic CDPHP asked for.

**The measure definition is not repeated here.** It lives in the ⓘ tooltip on the tile, so
there is exactly one copy of it and it cannot drift. This document owns the three things the
tooltip cannot know: who is accountable for the data, what decision the number changes, and
whether it is buildable yet.

`Owner` is the person accountable for the data being correct — not the person who builds the
visual. Every row currently reads `_unassigned_`; assigning them is the next working session
and is the point of this document.


### General

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Providers in matching pool | How many providers can actually take a new patient? | _unassigned_ | _to agree_ | Built |
| Notes signed < 24h ⬥ | Is documentation keeping up? | _unassigned_ | _to agree_ | Built |
| Note timeliness ⬥ | How late is late, when it is late? | _unassigned_ | _to agree_ | Built |
| Roster by credential | What does the clinical roster look like month to month? | _unassigned_ | _to agree_ | Built |
| Co-sign queue ⬥ | How much unbillable work is stuck waiting for a supervisor? | _unassigned_ | _to agree_ | Built |
| Documentation to money | Where does documentation lateness turn into lost revenue? | _unassigned_ | _to agree_ | Built |
| Co-sign load by supervisor | Is the co-sign burden spread or concentrated? | _unassigned_ | _to agree_ | Built |
| Readiness flags | Which providers are silently invisible to matching? | _unassigned_ | _to agree_ | Built |
| Panel size vs target | Who is over or under their panel target? | _unassigned_ | _to agree_ | Built |
| Match failures by cause | Why can we not match some members at all? | _unassigned_ | _to agree_ | Built |
| Documentation and quality by supervisor group ⬥ | Which supervisor group is struggling on documentation and quality? | _unassigned_ | _to agree_ | Built |
| Offboarding controls | What is left dangling when a provider leaves? | _unassigned_ | _to agree_ | Built |
| Sessions held — billed vs unbilled | How much delivered care never gets billed? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Workforce And Documentation

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Medical group headcount by licence type ⬥ | What licences does the medical group actually hold? | _unassigned_ | _to agree_ | Built |
| Co-sign obligations and supervisor capacity ⬥ | Do we have enough supervisors for the clinicians who need co-sign? | _unassigned_ | _to agree_ | Built |
| Median time from session end to signed note ⬥ | How long does a note actually take to get signed? | _unassigned_ | _to agree_ | Blocked — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified |
| Co-sign rejections by reason ⬥ | Why do supervisors send notes back? | _unassigned_ | _to agree_ | Built |
| Golden Thread completeness ⬥ | Are our notes defensible in an audit? | _unassigned_ | _to agree_ | Built |

## Open items

- **Median time from session end to signed note** — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified.
