# Provider journey — report specification

> **This document and [reports/internal/provider-journey.html](../../reports/internal/provider-journey.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** aptihealth clinical operations and leadership, and the data team.
**Purpose:** Follow a provider the way the business does — which providers exist and can be
matched, how long each step takes once they are, and who carries the co-sign load behind them.
That is where delivered care turns into billable, defensible care.

The report is read top-down, and the four sections below are the four bands on the page.

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


### Adoption and satisfaction

Whether providers take up the tools we give them, and whether those tools make the day better.

Both measures were set on 28 Aug 2026, when the acceptance criterion for Clinically AI was
agreed: **a happier provider, not a faster one.** The published research does not support AI
scribing as a meaningful time saver, so time saved is measured through the operational lens
and deliberately is not the provider-side success metric. Neither threshold is agreed — 50%
adoption and 80% satisfaction were said out loud as examples, not decided, which is why
neither tile draws a target line.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Clinically AI adoption | Are providers actually using the tool we bought them? | _unassigned_ | _to agree_ | Blocked — Needs a marker on the note recording that it was drafted in Clinically AI. Without one, adoption can only come from the vendor's own usage export and cannot be joined to a provider or a note type |
| Provider satisfaction with Clinically AI | Are providers happier for having it? | _unassigned_ | _to agree_ | Blocked — No survey instrument, cadence or threshold agreed. Today's figure is four pilot providers asked informally |

### Providers

Who exists, who is configured, and who can actually be matched to a member.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Providers in matching pool | How many providers can actually take a new patient? | _unassigned_ | _to agree_ | Built |
| From active provider to matchable | Where does the roster fall out between being active and being matchable? | _unassigned_ | _to agree_ | Built |
| Readiness flags | Which providers are silently invisible to matching, and why? | _unassigned_ | _to agree_ | Built |
| Medical group headcount by licence type | Which roles is the medical group made of, and what licence does each one hold? | _unassigned_ | _to agree_ | Blocked — Needs a provider role attribute in the model (BHS, prescriber, other). If only licence type is stored, the role split has to be inferred from the licence |

### Efficiency

How long each step takes, from a new provider account to a signed note.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Notes signed < 24h | Is documentation keeping up? | _unassigned_ | _to agree_ | Built |
| Median days from provider account to first session | How long does a new provider take to start delivering care? | _unassigned_ | _to agree_ | Built |
| Median time from session end to signed note | How long does a note actually take to get signed? | _unassigned_ | _to agree_ | Blocked — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified |
| Sessions held — billed vs unbilled | How much delivered care never gets billed? | _unassigned_ | _to agree_ | Built |
| Golden Thread completeness | Are our notes defensible in an audit? | _unassigned_ | _to agree_ | Built |

### Co-sign and supervision

Who cannot sign their own notes, who reviews them, and how that review goes.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Providers under co-sign | How much of the clinical roster cannot sign its own notes? | _unassigned_ | _to agree_ | Built |
| Supervisor load and note review | Is the co-sign load spread evenly, and whose notes keep coming back? | _unassigned_ | _to agree_ | Blocked — Accepted first pass and returned need a co-sign review event with an outcome per note, not just the note's current state |

## Open items

- **Clinically AI adoption** — Needs a marker on the note recording that it was drafted in Clinically AI, otherwise adoption is only knowable from the vendor's usage export and cannot be split by provider, role or note type.
- **Provider satisfaction with Clinically AI** — Needs a survey: instrument, cadence and the threshold that counts as success. Until then the tile is an anecdote from four pilot providers, and it says so.
- **Medical group headcount by licence type** — Needs a provider role attribute in the model (BHS, prescriber, other). If only licence type is stored, the role split has to be inferred from the licence. No longer shown as a warning on the tile; this document is the record.
- **Median time from session end to signed note** — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified. No longer shown as a warning on the tile; this document is the record.
- **Supervisor load and note review** — Needs a co-sign review event carrying an outcome, so a note returned once and then accepted is not counted as accepted on the first pass.
- **Median days from provider account to first session** — Assumes a provider account creation date in the model. Confirm it exists and is not overwritten when a provider is reactivated.

## What the sections are for

**Providers** is a monthly headcount question and the funnel is the shape of it: active, configured,
accepting, matchable. The readiness flags are the reasons behind the drops, so the two visuals
have to reconcile — the five flag counts add to the gap between active and matchable, and a
change to one is a change to both.

**Efficiency** is time. Every measure in it is a duration or a share of one, so nothing in this
section is a headcount.

**Co-sign and supervision** is the one place the report names individuals. The names are
invented; when it is built in Power BI, decide whether supervisors are named or aggregated
before it leaves the building.
