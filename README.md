# aptihealth dashboards

Design mock-ups for the aptihealth **Patient journey** and **Provider journey** report
pages, built as a self-contained HTML wireframe ahead of the Power BI build.

## What is in here

| File | What it is |
| --- | --- |
| `apti-journey-powerbi_2.html` | The report mock-up. Open it in any browser — no build step, no dependencies. |
| `CLAUDE.md` | Conventions for anyone (person or Claude) changing the mock-up. Read before editing. |

## How to view it

Double-click the HTML file, or from this folder:

```bash
open apti-journey-powerbi_2.html      # macOS
```

Two report pages are switched with the tabs at the bottom of the page, the way
Power BI page tabs work. Grey chips inside a visual are visual-level filters.
Hover the ⓘ in a visual header to see which native Power BI visual it maps to.

## Important: every number is fabricated

All values are mock data for layout purposes. The deliverable is the **layout,
the visual types and the measure definitions** — not the figures. A handful of
reference points are drawn from real documented sources and are marked `(doc)`
in the mock-up.

Provider names appear in one visual (panel size vs target) and are real
colleagues paired with invented panel sizes. That is why this repository is
**private** — do not make it public without replacing them.

## Status

Mock-up, not a build. Before this can be built in Power BI, four measure
definitions have to be agreed and one data gap closed — see the TODO section in
`CLAUDE.md`.
