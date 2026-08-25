# Report specifications

One document per report. Each one is paired with a mock-up under `reports/` and the two are
a single deliverable: **change one, change the other in the same commit.**

| Specification | Mock-up | Audience |
| --- | --- | --- |
| [Patient journey](internal/patient-journey.md) | [`reports/internal/patient-journey.html`](../reports/internal/patient-journey.html) | Internal — leadership, product, data |
| [Provider journey](internal/provider-journey.md) | [`reports/internal/provider-journey.html`](../reports/internal/provider-journey.html) | Internal — clinical ops, leadership, data |
| [CDPHP payer report](external/cdphp.md) | [`reports/external/cdphp.html`](../reports/external/cdphp.html) | External — the payer |

## Why these documents exist

The mock-ups are how we argue about the numbers with people who think in pictures. These
documents are how that argument reaches the data team without being re-litigated. The chain
is deliberate:

> business need → a visual we can point at → an agreed definition → a Power BI measure

A visual with no documented need is decoration. A documented need with no owner is a wish.

## What lives where

**The measure definition lives in the report, not here** — in the ⓘ tooltip on the tile.
One copy, so it cannot drift, and it is right next to the picture of itself.

**This document owns what the tooltip cannot know:**

- **Owner** — the person accountable for the data being correct. Not the person who builds
  the visual, and not a team name. If nobody owns it, that is the finding.
- **Business impact** — the decision this number changes. If the honest answer is "none",
  the visual should come out.
- **Status** — built, or blocked on a specific named thing.

## Internal versus external

**Internal** reports are how we run: every visual should trace to somebody who acts on it.

**External** reports go to payers. CDPHP is built first and on purpose is the largest —
every other payer report is this one with visuals switched off, so a measure missing here is
missing for every payer. Anything internal-only (supervisor groups, individual panels,
offboarding hygiene) needs a deliberate decision before it leaves the building.

## Keeping it honest

```bash
python3 tools/sync.py
```

Fails if a report and its specification disagree, if a report has no specification, if the
shared chart code has drifted between reports, or if something marked *CDPHP asked* in an
internal report is missing from the CDPHP report. Run it before you call a piece of work done.
