# Working notes for Claude (and humans)

Read this before changing anything in this repository.

## What this repository is

A set of **design mock-ups**, not an application. Three self-contained HTML pages show how
aptihealth's reports should look so the team can build them in **Power BI**. There is no
package manager and no dependency. Open a file in a browser to see the result.

The point of the prototype is to connect two groups who do not speak the same language:

> **business** decides what matters and why → the **mock-up** makes it arguable in pictures →
> the **specification** records the definition, the owner and the impact → **data science**
> builds it in Power BI

So the mock-up is not the deliverable. The agreed definitions are. The mock-up is how we get
to them quickly and visually, and how we keep arguing about them cheaply when someone
disagrees.

## Layout

```
index.html                              landing page, links the three reports
reports/
  _shared/report.css                    canonical stylesheet
  _shared/charts.js                     canonical chart builders and page behaviour
  internal/patient-journey.html         internal — the member's path
  internal/provider-journey.html        internal — documentation, supervision, matching
  external/cdphp.html                   external — the payer report, five pages in one file
docs/
  README.md                             how the specs work
  internal/patient-journey.md           spec paired with the patient mock-up
  internal/provider-journey.md          spec paired with the provider mock-up
  external/cdphp.md                     spec paired with the CDPHP mock-up
tools/sync.py                           consistency check — run it before finishing
HANDOFF.md                              state of play between sessions
```

**Internal reports** are how we run the business. Every visual should trace to a named person
who acts on it. **External reports** go to payers. CDPHP is built first and deliberately the
largest — every other payer report is this one with visuals switched off — so a measure
missing from CDPHP is missing everywhere. It carries no report-level slicers: the payer sees
one program and one period, decided when the report is issued, not switched by the reader.

**The CDPHP report is one file holding five pages**, switched by the `<button data-pg="…">`
tabs in `.ptabs` at the bottom — that is Power BI's own model, one report with a page strip,
and `render()` in the shared code already implements it. The pages are CDPHP Billing, CDPHP
Patient Acquisition, CDPHP Patient Acquisition — CN referrals, Clinical Outcomes (PHQ9, CDPHP)
and CDPHP Update; the three middle ones are named but still have no visuals. `sync.py` reads every page in the file, so all five share one specification —
`docs/external/cdphp.md`, sectioned by `## Page` heading. Adding a page means adding a button,
a `.page` div and a `## Page` section together.

The payer report is allowed to keep a visual after it leaves every internal report. What the
payer is owed and what we run the business on are two different lists (decided 26 Aug 2026).
`sync.py` prints those as *payer-only* on every run instead of failing — treat the list as a
maintenance warning: nobody internally is looking at them.

Work **top-down**: agree the shape of a report before arguing about a single tile.

## The rule that matters most

**The mock-ups and the specifications are one deliverable.**

- Change a visual → update its row in the matching `docs/` spec in the **same commit**.
- Change a spec row → change the visual to match in the **same commit**.
- Add a visual → add a row. Remove a visual → remove the row.

Before calling any piece of work finished, run:

```bash
python3 tools/sync.py
```

It fails if a report and its spec disagree, if a report has no spec, if the shared chart code
has drifted between the three reports, or if something marked *CDPHP asked* internally is
missing from the CDPHP report. Do not report work as done while it fails.

**Where a definition lives:** in the ⓘ tooltip on the tile, one copy only. Specs deliberately
do not repeat it — they own the owner, the business impact and the status instead. Never
paste a definition into a spec; that is how the two drift.

## Shared code is copied on purpose

`reports/_shared/` holds the canonical CSS and chart builders. Each report **inlines** them
between `<!-- shared:css:start -->` / `<!-- shared:js:start -->` markers, so every report is
one file that can be opened from disk, served from Pages, or published as an artifact with no
asset loading at all.

Edit the file in `_shared/`, never the copy inside a report, then:

```bash
python3 tools/sync.py --fix
```

`sync.py` without `--fix` fails when a copy is stale, so drift gets caught rather than shipped.

## Non-negotiable design rules

These were decided deliberately. Do not "improve" them without being asked.

1. **White background, light mode only.** No dark-mode blocks. Tiles are white, separated by
   hairline borders.
2. **Every measure is monthly.** Snapshots are allowed only where a trend is meaningless
   (funnel, matrix, panel-vs-target) and each carries a month chip.
3. **Never a dual axis.** Two measures of different units go in two visuals, or get stacked in
   the same unit. This is why "sessions held vs billed rate" is a stacked column of
   billed/unbilled counts, not a column-plus-line.
4. **Status colours always ship with a label**, never colour alone.
5. **Visual-level filters are the grey chips** in a visual header; report-level slicers live in
   the page header. Some chips switch a *definition* (engagement lookback, HEDIS baseline,
   scoring window) — that is intentional, and the tooltip must say so.
6. **The ⓘ tooltip names the native Power BI visual** for that tile, plus the reason it was
   chosen. Keep it accurate; it is what the data team builds from.
7. **No tables in prose.** Matrix visuals are fine — those are charts.
8. **No report currently marks a visual as payer-asked.** The convention is a
   `<span class="ask">CDPHP asked</span>` in the tile header, and all three reports dropped it
   on 26 Aug 2026 — the two internal reports because each reads as purely internal, the CDPHP
   report because every tile in it answers the ask, so marking all of them said nothing. The
   `sync.py` check that every marked visual reaches the CDPHP report therefore has nothing
   left to check — keep it, and the `.ask` style, for whichever internal report next needs it.

## Palette (validated, do not substitute by eye)

Categorical: `--s1 #2a78d6` `--s2 #eda100` `--s3 #10457e` `--s4 #f2cd6b` `--s5 #7fa9d9`,
assigned in that fixed order and never cycled. Blue and amber alternating, then their shades
— decided 26 Aug 2026, replacing the earlier orange/green/pink set.
Status: good `#0ca30c`, warning `#fab219`, serious `#ec835a`, critical `#d03b3b`.
Ink: primary `#0b0b0b`, secondary `#52514e`, muted `#898781`.

**Red and green are reserved for judgement, never for categories.** A series is blue or amber
whatever it represents; red says this is badly wrong and green says this is genuinely good, so
they appear only in status scales that ship with a label, in conditional formatting, in the
flag lists, and on a count that should be zero. A category that happens to be unwelcome —
inactivations, unbilled sessions — is amber, not red.

The order is a colour-blindness-safety mechanism, not decoration. Blue against amber is the
one pairing that survives every common form of colour blindness. **If you need a sixth series,
facet or fold into "Other"** — that is why licence-type headcount is small multiples rather
than a stacked bar.

## How a report page is built

Inline shared `<style>`, the HTML for the page, inline shared `<script>`, then a short script
with that report's data:

```js
APTI.render(function () {
  var MO = APTI.MO, columns = APTI.columns, /* … */;
  columns("some-id", { /* … */ });
});
```

`APTI.render()` makes every page visible, draws, then hides again — charts size themselves
from `host.clientWidth` and a hidden page measures as zero. Do not remove that.

Builders: `columns()` (clustered / stacked / 100% stacked, optional `opt.rule`), `lines()`
(multi-series, optional rule; pass `unit: ""` for a unitless series), `bars()` (optional
per-row target marker), `funnel()`, `spark()`, `smallMultiples()`, `matrix()`.

Stacked charts derive their axis maximum from stacked totals. If bars overflow the plot after
you add a series, that is the bug to look for.

## Data

All figures are mock. Values marked `(doc)` come from real sources. **Do not invent new
`(doc)` claims** — if a number is not sourced, leave it unmarked or write "not documented".
Provider names in the mock-ups are invented; do not replace them with real colleagues.

Where a measure cannot honestly be built yet, ship the tile with a `gapnote` naming the
missing field or decision rather than a clean number. `sync.py` surfaces those as *Blocked*
in the spec.

## Workflow

Small commits, one change each, described in plain language. Do not refactor the chart
builders while making a content change — it makes the diff unreadable.

**Finish every piece of work with `python3 tools/sync.py`.**

`sync.py` is a static check — it compares text. It cannot tell you the page still *works*.
After touching `reports/_shared/charts.js`, open a report in a browser and confirm two things
the chart count will not reveal: a grey chip opens its dropdown, and the ⓘ shows a tooltip.
Both are wired in `wire()`, which runs after the charts are drawn, so a throw there leaves a
page that looks perfect and does nothing.

## Handing off between sessions

Long chats degrade. At roughly **200–300k tokens of context**, stop and write `HANDOFF.md`:

- what this is for and who it is for, in a few lines — assume the next session knows nothing
- what changed in this session and what state it is in
- decisions taken and *why*, especially ones that look arbitrary later
- open questions nobody has answered yet, and unfinished threads with the next concrete step

Then commit it and start a fresh session. `HANDOFF.md` is overwritten each time, not appended
— git history is the archive. Keep it short enough that someone actually reads it.

## Open definitions blocking the Power BI build

- **Episode of care** — days in care currently run through inactivation, which overstates
  length of care and distorts tenure.
- **Engaged** — 60-day billing lookback versus strictly in-month. Both are in the mock-up
  side by side until one is agreed.
- **Members served** — all-time versus period.
- **PHQ-9 / GAD-7 baseline threshold** for the 50%-reduction family.
- **Repeat DI** — not defined; the only written rules are annual re-assessment for returning
  members and A5R every 90 days.
- **Session-end timestamp** — the whole documentation-timeliness family depends on it. Confirm
  it exists in the model.
- **Referral reason** — the urgency visuals assume a stored attribute, not free text in a note.
- **Discharge notification source** — payer feed, referrer notification or member self-report.
  Each gives a different denominator for post-discharge outreach.
- **"Licensed"** in the payer-count ask — payer credentialing or state licensure.
