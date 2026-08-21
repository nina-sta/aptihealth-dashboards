# Working notes for Claude (and humans)

Read this before changing anything in this repository.

## What this repository is

A **design mock-up**, not an application. `apti-journey-powerbi_2.html` is a
self-contained HTML page that shows how the aptihealth Patient journey and
Provider journey report pages should look, so the team can build them in
**Power BI**. There is no build step, no package manager, no dependencies. Open
the file in a browser to see the result.

The audience is aptihealth leadership and product. The mock-up mirrors the
documented funnel map (Funnels A–E) that lives in the contextMB repo under
`context/projects/aptihealth/flow-diagrams/`.

## Non-negotiable design rules

These were decided deliberately. Do not "improve" them without being asked.

1. **White background, light mode only.** No dark-mode blocks. Tiles are white,
   separated by hairline borders.
2. **Every measure is monthly.** If a new visual is added, it shows a month axis
   or a monthly trend. Snapshots are allowed only where a trend is meaningless
   (funnel, matrix, panel-vs-target) and each of those carries a month chip.
3. **Never a dual axis.** Two measures of different units go in two visuals, or
   get stacked in the same unit. This is why "sessions held vs billed rate" is a
   stacked column of billed/unbilled counts, not a column-plus-line.
4. **Status colours always ship with a label**, never colour alone.
5. **Visual-level filters are the grey chips** in a visual header. The report
   level slicers live in the page header. Some chips switch a *definition*
   (engagement lookback, HEDIS baseline threshold) — that is intentional.
6. **The ⓘ tooltip names the native Power BI visual** for that tile, plus the
   reason it was chosen. Keep it accurate; it is what the data team builds from.
7. **No tables in prose.** Matrix visuals are fine — those are charts.

## Palette (validated, do not substitute by eye)

Categorical: `--s1 #2a78d6` `--s2 #eb6834` `--s3 #1baf7a` `--s4 #eda100`
`--s5 #e87ba4`, assigned in that fixed order and never cycled.
Status: good `#0ca30c`, warning `#fab219`, serious `#ec835a`, critical `#d03b3b`.
Ink: primary `#0b0b0b`, secondary `#52514e`, muted `#898781`.

The order is a colour-blindness-safety mechanism, not decoration. If you need a
sixth series, fold it into "Other" or facet instead.

## How the code is organised

One file. Inline `<style>`, then the HTML for each report page, then one
`<script>` with small SVG chart builders:

- `columns()` — clustered / stacked / 100% stacked, optional constant line (`opt.rule`)
- `lines()` — multi-series line, optional constant line
- `bars()` — horizontal bars, optional per-row target marker
- `funnel()`, `spark()`, `smallMultiples()`, `matrix()`

Charts size themselves from `host.clientWidth`, so **all report pages are made
visible during init and then hidden again** — otherwise hidden pages measure as
zero width and charts render at a fallback size. Do not remove that.

Stacked charts derive their axis maximum from stacked totals. If you add a
stacked series and the bars overflow the plot, that is the bug to look for.

## Data

All figures are mock. Values marked `(doc)` in the page come from real sources:
notes per month, discharge summary counts, referral volume, providers requiring
co-sign. Do not invent new `(doc)` claims — if a number is not sourced, leave it
unmarked or write "not documented".

## Workflow

Small commits, one change each, described in plain language. Do not refactor the
chart helpers while making a content change — it makes the diff unreadable and
this file is the only artefact.

When context gets long in a chat, stop and commit. Start a fresh session for the
next change and let this file carry the context instead of the transcript.

## TODO before the Power BI build

- Agree four measure definitions: episode of care, engaged (in-month vs 60-day
  lookback), members served (all-time vs period), PHQ-9/GAD-7 baseline threshold
  for the 50%-reduction family.
- Confirm a session-end timestamp exists in the model. The whole provider page
  depends on "time from session end to signed note", which may not be available.
- Confirm the referral reason (urgent/routine cause of admission) is a stored
  attribute and not free text in a note. The urgency visuals assume an attribute.
- Decide whether the payer view is a filtered subset of this model or a separate
  report. One model, two views — not two truths.
