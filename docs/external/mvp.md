# MVP payer report — report specification

> **This document and [reports/external/mvp.html](../../reports/external/mvp.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** MVP Health Care, and internally whoever signs off before anything leaves the building.
**Purpose:** Answer what MVP asked for. This report is the CDPHP report with visuals switched off — that is the model for every payer after the first, so a measure missing from [the CDPHP report](cdphp.md) is missing here too.

**Five pages, one report,** mirroring CDPHP page for page so the two can be read side by side:
MVP Billing, MVP Patient Acquisition, MVP CN referrals, Clinical Outcomes (PHQ9), MVP
Update. Every one of them is currently empty.

## What is decided and what is not

Decided: that MVP gets its own report rather than a payer slicer on the CDPHP one, and that the
page structure follows CDPHP.

Not decided, and both block any visual going in:

- **What MVP actually asked for.** The CDPHP report exists because CDPHP sent a list of
  statistics. There is no equivalent list for MVP, so nothing here can claim to answer one.
- **Which CDPHP visuals are switched on.** "Every other payer report is CDPHP with visuals
  switched off" only becomes a report once someone says which ones are off. That is a
  contractual question as much as a data one — the 7-day follow-up standard, the HEDIS
  thresholds and the acuity definitions are all per-contract.

Until both are answered the report ships as five named, empty pages with a note saying so. It
is registered in `tools/sync.py` and appears in the report navigation, so the moment a visual
lands the specification pairing is already enforced.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

### MVP Billing

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| What this report is for | What has been decided about this report, and what has not? | _unassigned_ | _to agree_ | Blocked — Not a measure. It is the note that keeps an empty report from reading as a finished one, and it comes out the moment the first real visual goes in |

The other four pages have no rows because they have no visuals. Adding a visual means adding a
row in the same commit.
