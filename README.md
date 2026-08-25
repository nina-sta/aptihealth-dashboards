# aptihealth report prototypes

Design mock-ups for aptihealth's reports, built as self-contained HTML ahead of the Power BI
build. **Live: https://nina-sta.github.io/aptihealth-dashboards/**

The prototype exists to connect business and data science: business decides what matters, the
mock-up makes it arguable in pictures, the specification records the definition and the owner,
and data science builds it in Power BI.

## The three reports

| Report | Mock-up | Specification |
| --- | --- | --- |
| Patient journey (internal) | [`reports/internal/patient-journey.html`](reports/internal/patient-journey.html) | [spec](docs/internal/patient-journey.md) |
| Provider journey (internal) | [`reports/internal/provider-journey.html`](reports/internal/provider-journey.html) | [spec](docs/internal/provider-journey.md) |
| CDPHP payer report (external) | [`reports/external/cdphp.html`](reports/external/cdphp.html) | [spec](docs/external/cdphp.md) |

CDPHP is built first and is deliberately the largest. Every other payer report will be this
one with visuals switched off, so a measure missing here is missing everywhere.

## Viewing it

Open any report file in a browser — no build step, no dependencies.

```bash
open index.html
```

Grey chips inside a visual are visual-level filters and open a list of options. Hover the ⓘ in
a visual header for the native Power BI visual and the measure definition. A **CDPHP asked**
marker means the visual answers a statistic the payer requested.

## Every number is fabricated

All values are mock. What is real is the choice of measure, its definition, the Power BI visual
behind it, and the gaps. A few reference points come from documented sources and are marked
`(doc)`. Provider names in the mock-ups are invented.

Older commits in this repository's history contain real colleague names from before the
mock-up was anonymised.

## Working on it

Mock-ups and specifications are one deliverable — change one, change the other in the same
commit. Before finishing any piece of work:

```bash
python3 tools/sync.py
```

Read [`CLAUDE.md`](CLAUDE.md) before editing. It carries the design rules, the palette and the
list of measure definitions still blocking the Power BI build.
