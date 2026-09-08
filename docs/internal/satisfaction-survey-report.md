# Satisfaction Survey Report — report specification

> **This document and [reports/internal/satisfaction-survey-report.html](../../reports/internal/satisfaction-survey-report.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** Internal — clinical leadership and whoever owns the Advanced Care Program.
**Purpose:** Report what members say about their care. Built on 8 Sep 2026 from the Sisense
**Satisfaction Survey Report** of the same day.

**Three bands:** response and score, the six questions, then the record-level file.

## The finding: three quarters of the file is blank

Records returned nearly doubled between February and September. **Almost all of that growth is
records where every one of the six questions came back `N/A`** — 1,412 of 1,870 in September,
76% of the file.

The average score falls from 26 to 22 out of 30 **in the same month the blank records start
arriving.** If a blank record scores zero rather than being excluded, that fall is an artefact
of counting and not a change in how members feel. Nothing in the source answers which it is,
and it is the first thing to check on this page: a four-point drop in satisfaction and a
counting bug look identical from here.

Every question tile in the middle band therefore **excludes blank records**, which is this
report's one deliberate departure from the source. The source shows `N/A` as a band on the same
scale as the five answers, which makes every question look as though it is getting worse when
what is growing is the non-response.

## It contradicts the touchpoint measures

**88% of members who answered say they can reach their care team when they need support.** On
the same population, [Advanced Care Note Metrics](advanced-care-note-metrics.md) shows half of
eligible members with no successful touchpoint at all last month.

Both cannot be right about the same people. The likeliest explanation is that the survey only
reaches the members we already reach — which would make every figure on this page a measure of
the reachable, not of the panel. That is worth settling before any of it is quoted.

## What the source does that this report does not

- **A bar labelled "cumulative monthly count"** that plots a monthly count. One of the label and
  the measure is wrong, and by September the two readings differ by a factor of eight.
- **`N/A` as a sixth answer band** on every question. A non-answer is not a rating.
- **First and last name against each set of answers.** An opinion attributable to a named
  person is more sensitive than most of what this repo handles, not less. The file here carries
  invented member ids and no names.
- **Two visuals with the same title** — one of the six question charts is captioned "I feel
  supported between my therapy sessions" twice; the second is "I feel the Advanced Care Program
  is helping me make progress" going by the file's own column list.

## How to read the table

Same rules as every other report in this repo. `Visual` matches the tile heading in the report
exactly — that is the join key. The measure definition is not repeated here; it lives in the ⓘ
tooltip on the tile. This document owns the owner, the business impact and the status.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Survey responses | How many members are we hearing from? | _unassigned_ | _to agree_ | Blocked — The source labels a monthly count "cumulative". Which it is has to be settled before the growth means anything |
| Average satisfaction score | Are members more or less satisfied than they were? | _unassigned_ | _to agree_ | Blocked — Whether blank records score zero or are excluded is unknown, and the answer decides whether the four-point fall is real |
| Records with every question blank | How much of the file is empty? | _unassigned_ | _to agree_ | Blocked — Nobody has established why three quarters of records come back blank. Until then no figure on this page has a denominator |
| Members who answered | What is the real denominator? | _unassigned_ | _to agree_ | Built |
| Responses by payer | Whose members are answering? | _unassigned_ | _to agree_ | Built |
| I feel understood and supported by my care team | Do members feel heard? | _unassigned_ | _to agree_ | Built |
| I feel we focus on what matters most to me | Are we treating what the member came for? | _unassigned_ | _to agree_ | Built |
| I feel supported between my therapy sessions | Is there care between appointments? | _unassigned_ | _to agree_ | Built — the weakest of the six, and the only one where agreement does not clear four fifths |
| I feel the Advanced Care Program is helping me make progress | Do members think it works? | _unassigned_ | _to agree_ | Built — the closest thing here to an outcome question, and worth reading against the PHQ-9 work rather than against the other five |
| I can reach my care team when I need support | Can members get hold of us? | _unassigned_ | _to agree_ | Blocked — 88% say yes; the touchpoint measures say half of eligible members had no successful contact last month. Both cannot be right |
| I am satisfied with the Advanced Care Program | The overall question | _unassigned_ | _to agree_ | Built |
| Survey records | What exactly is in the file? | _unassigned_ | _to agree_ | Blocked — The real file ties opinions to named members. Who may open it has not been decided |

## Open items

- **Why three quarters of records come back blank.** Is a survey being generated for every
  member whether or not they respond? Until this is answered nothing on the page has a
  denominator.
- **Do blank records score zero, or are they excluded?** The four-point fall in average score
  depends entirely on the answer.
- **"Cumulative monthly count"** — the label and the measure disagree.
- **The survey contradicts the touchpoint measures** on whether members can reach their care
  team. Most likely the survey only reaches the reachable.
- **Who may open a file that ties opinions to named members.** The same access decision as on
  [Care Navigators](care-navigators.md) and Advanced Care Note Metrics, but with a higher bar.
- **The `is_survey_after_60_days` filter** in the source is switched to include everything. What
  it means and whether it should default on has not been recorded.
- **Six questions on a 30-point scale** — five points each. Whether the six are weighted equally
  on purpose has never been written down.
- **Owner** — unassigned, like every row in every specification here.
