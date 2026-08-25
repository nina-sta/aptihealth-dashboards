# Handoff — 25 Aug 2026

State of play between sessions. Overwritten each time; git history is the archive.
Read [`CLAUDE.md`](CLAUDE.md) for the rules, this file for where we actually are.

## What this is and why it exists

aptihealth needs reports in Power BI. The hard part is not the charts — it is that business
and data science do not agree on what the numbers mean. This repository is the bridge:

> business decides what matters → the mock-up makes it arguable in pictures → the
> specification records the definition, the owner and the impact → data science builds it

Three reports. **Internal**: patient journey, provider journey — how we run, so every visual
should trace to somebody who acts on it. **External**: CDPHP payer report — built first and
deliberately the largest, because every other payer report will be this one with visuals
switched off. Work top-down: agree the shape before arguing about a tile.

## Where it stands

Live at **https://nina-sta.github.io/aptihealth-dashboards/** (public repo, GitHub Pages).

- Three reports built, 106 visuals total: patient 42, provider 18, CDPHP 46.
- The CDPHP report is exactly the 46 visuals marked *CDPHP asked* across the two internal
  reports — verified by set comparison, not by eye.
- Three specifications under `docs/`, one row per visual, business question drafted.
- `tools/sync.py` passes and is tested against a deliberately broken doc.

## What is not done

**Owner and business impact are empty on all 106 rows.** Every row reads `_unassigned_` and
`_to agree_`. This is the next working session and it is the whole point of the documents —
I could not invent who is accountable for a data point, and drafting business impact without
the business would just be plausible-sounding filler. Start with the CDPHP spec: it is the
one with an external deadline.

**Nine measure definitions are still open** — listed at the bottom of `CLAUDE.md`. Eight
visuals ship with a `gapnote` instead of a clean number because of them.

## Decisions taken, and why

- **Reports are self-contained files, with the shared CSS/JS inlined from
  `reports/_shared/`.** Relative asset links break both artifact publishing and the preview
  pane, and duplicating the builders by hand invites drift. So: one canonical copy,
  mechanically inlined, and `sync.py` fails when a copy goes stale.
- **Measure definitions live in the ⓘ tooltip, never in the spec.** One copy cannot drift.
  Specs own owner, impact and status instead — the three things the tooltip cannot know.
- **The CDPHP report is assembled from marked visuals, not authored separately.** If it were
  authored separately the two would diverge within a week. `sync.py` enforces that anything
  marked internally reaches the payer report.
- **Licence-type headcount is faceted, not stacked.** Seven licence types do not fit the
  five-colour palette, and the palette order is a colour-blindness mechanism.
- **Both engagement definitions are shown side by side** rather than hidden behind a chip,
  because the gap between them is the decision.

## Open questions for a person

1. **Who owns each data point?** Blocks the specs.
2. **The A5/A5R conditional split (11/22 and 19/29) is invented.** The totals 33 and 48 came
   from the platform; the breakdown did not. Verify or delete it.
3. **Real payer names are in the public repo** — CDPHP, MVP, Fidelis, Medicaid FFS. Fine if
   intended, worth a decision if not.
4. **Old commits carry real colleague names** from before the panel-size visual was
   anonymised, and the repo is now public. Rewriting history needs `git filter-repo` and a
   force push.
5. **Does the payer report show supervisor groups?** *Documentation and quality by supervisor
   group* is in the CDPHP report because CDPHP asked for rejection rates, but the
   group-by-group breakdown is internal detail. Aggregate before sending, or leave it.
6. **How much Power BI chrome?** The ask was to make the mock-ups look more like real Power BI
   with fake data. Not started — current styling is a neutral wireframe.

## Next concrete steps

1. Fill `Owner` on the CDPHP spec, then the two internal specs.
2. Draft `Business impact` per visual with the business, and cut any visual where the honest
   answer is "no decision changes".
3. Close the open definitions in `CLAUDE.md`, starting with episode of care and engaged —
   they block the most visuals.
4. Decide on Power BI chrome before adding more visuals; it is a restyle of all three.
