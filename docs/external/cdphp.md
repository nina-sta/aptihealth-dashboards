# CDPHP payer report — report specification

> **This document and [reports/external/cdphp.html](../../reports/external/cdphp.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** CDPHP, and internally whoever signs off before anything leaves the building.
**Purpose:** Answer the statistics CDPHP asked for. This is deliberately the largest payer report: every other payer report is this one with visuals switched off, so anything missing here is missing everywhere.

**Five pages, one report.** The mock-up carries a page tab strip along the bottom, because that
is what Power BI builds: one report file with several pages, not five separate reports. The
`## Page` headings below are those tabs, in the order they appear. The three middle pages are
named but deliberately empty — the slots exist so the tab order is settled before the content
is, and nothing is agreed for them yet.

## How to read the table

`Visual` matches the tile heading in the report exactly — that is the join key between this
document and the mock-up. No row carries a per-visual payer marker: this whole report is the
answer to the ask, so marking every row said nothing.

**The measure definition is not repeated here.** It lives in the ⓘ tooltip on the tile, so
there is exactly one copy of it and it cannot drift. This document owns the three things the
tooltip cannot know: who is accountable for the data, what decision the number changes, and
whether it is buildable yet.

`Owner` is the person accountable for the data being correct — not the person who builds the
visual. Every row currently reads `_unassigned_`; assigning them is the next working session
and is the point of this document.


## Page — CDPHP Billing

The invoice and what gates it. This page is first because everything on CDPHP Update describes
care we delivered, and this is the part that decides whether we are paid for it.

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Count of CDPHP Patients by Eligibility and Engagement | Of the patients we treated, how many can we actually bill? | _unassigned_ | _to agree_ | Built |
| Count of CDPHP Patients by Eligibility and Engagement (Billing File Month) | Is the billing file growing on new members, or on the same people coming back? | _unassigned_ | _to agree_ | Built |
| Current Month Invoice (send on the 15th) | What exactly are we invoicing this month? | _unassigned_ | _to agree_ | Blocked — The values `case_mg_ineligible_reason` can hold are not confirmed on our side. The column is in the export; its domain is not written down anywhere |
| Monthly Invoice | Can we show the payer a member's billing history when they query a line? | _unassigned_ | _to agree_ | Built |
| ACP Consent Response - CDPHP Patients | Which patients have answered the consent request, and how? | _unassigned_ | _to agree_ | Blocked — PLATFORM is the only consent type seen in the source. Confirm whether others exist, and whether Consent Response is strictly boolean or has an unanswered state |

Visual titles on this page are the source dashboard's own, `snake_case` column names and all,
because the column list is what the data team builds from and a tidied-up name loses the join
back to the query. The two eligibility visuals share a title in the dashboard; the second
carries its axis in brackets here, because the tile heading is this document's join key and two
rows cannot have the same one.

## Page — CDPHP Patient Acquisition

Reserved, no visuals. Nothing agreed yet.

## Page — CDPHP CN referrals

Reserved, no visuals. Nothing agreed yet.

## Page — Clinical Outcomes (PHQ9)

Reserved, no visuals. Nothing agreed yet.

## Page — CDPHP Update

Everything the payer is owed that is not the invoice: who we served, how they got to us, how
fast, how much care they got, and whether the documentation behind it holds up.

### Population And Engagement

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Members served | How many people have we ever treated for this payer? | _unassigned_ | _to agree_ | Built |
| Engaged members | How many are in care right now? | _unassigned_ | _to agree_ | Built |
| Engaged members — two definitions side by side | Does the engagement number change depending on which definition we use? | _unassigned_ | _to agree_ | Built |
| Retained members | How many stay in care from one month to the next? | _unassigned_ | _to agree_ | Built |
| Members in care by tenure | Are we accumulating long-stay members? | _unassigned_ | _to agree_ | Blocked — Blocked: needs an episode-of-care definition — days in care currently run through inactivation |
| Payer contracts and credentialing | How many payers can we actually bill, versus how many we have signed? | _unassigned_ | _to agree_ | Blocked — Confirm whether “licensed” in the ask means payer credentialing or state licensure — they are different counts |

### Access And Referrals

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Referrals and members reaching first session | How many referrals arrive and how many reach a first session? | _unassigned_ | _to agree_ | Built |
| Channel mix | Where do referrals come from and how is that shifting? | _unassigned_ | _to agree_ | Built |
| Access by referral channel | Which channel converts, and how fast? | _unassigned_ | _to agree_ | Built |
| Self sign-up by how they heard about us | What is actually bringing self sign-ups in? | _unassigned_ | _to agree_ | Built |
| CDPHP-direct referral volume | Is the payer still sending us members directly? | _unassigned_ | _to agree_ | Built |
| CDPHP-direct referrers | Who inside the payer is sending, and how sick are their referrals? | _unassigned_ | _to agree_ | Built |
| Channel mix — CDPHP vs comparable payer | Does this payer's referral mix look normal? | _unassigned_ | _to agree_ | Built |
| Paywall exposure and conversion | How many people hit the paywall and how many carry on anyway? | _unassigned_ | _to agree_ | Built |

### Urgency And Time To Care

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Urgent seen ≤ 7 days | Do urgent referrals get seen inside a week? | _unassigned_ | _to agree_ | Built |
| Median days to first appointment — urgent vs routine | How long is the wait, and does urgency change it? | _unassigned_ | _to agree_ | Built |

### Discharge Follow-Up

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Post-discharge members reached | Do we make contact after a discharge, and inside what window? | _unassigned_ | _to agree_ | Blocked — Denominator depends on how we learn about a discharge — payer feed, referrer notification or member self-report. Each gives a different population |

### Intake

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Intake providers covering ages 5–17 | Can we actually take adolescents? | _unassigned_ | _to agree_ | Built |
| Diagnostic interviews — first-time vs repeat | How much intake capacity goes to people we have already assessed? | _unassigned_ | _to agree_ | Blocked — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days |
| Assessment instrument reference | How long is the assessment we ask members to complete? | _unassigned_ | _to agree_ | Built |

### Engagement Depth And Outcomes

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Sessions per member — mean and median | How much care does a typical member actually get? | _unassigned_ | _to agree_ | Built |
| Median length of active care | How long does an episode of care last? | _unassigned_ | _to agree_ | Blocked — Blocked on the same episode-of-care definition as the tenure visual. Today length of care runs through to inactivation, which overstates it |
| Median days to 50% reduction — PHQ-9 and GAD-7 | How fast do people improve, and does the baseline filter change the answer? | _unassigned_ | _to agree_ | Built |
| Active members with a current PHQ-9 or GAD-7 | Do we have a recent score for the people we are measuring? | _unassigned_ | _to agree_ | Built |
| Where members drop out — inactivation by journey stage | Do people leave before care starts or after it finishes? | _unassigned_ | _to agree_ | Built |
| Days from registration to inactivation | How long do people last before going inactive? | _unassigned_ | _to agree_ | Blocked — Needs an inactivation reason field to separate lapsed from clinically discharged |

### Workforce

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Co-sign obligations and supervisor capacity | Do we have enough supervisors for the clinicians who need co-sign? | _unassigned_ | _to agree_ | Built |

### Documentation Quality

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Notes signed < 24h | Is documentation keeping up? | _unassigned_ | _to agree_ | Built |
| Note timeliness | How late is late, when it is late? | _unassigned_ | _to agree_ | Built |
| Median time from session end to signed note | How long does a note actually take to get signed? | _unassigned_ | _to agree_ | Blocked — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified |
| Co-sign queue | How much unbillable work is stuck waiting for a supervisor? | _unassigned_ | _to agree_ | Built |
| Golden Thread completeness | Are our notes defensible in an audit? | _unassigned_ | _to agree_ | Built |

## Open items

Across every page.

- **ACP Consent Response - CDPHP Patients** — PLATFORM is the only consent type seen in the source. Confirm whether others exist, and whether Consent Response is strictly boolean or has an unanswered state.
- **Current Month Invoice (send on the 15th)** — The values `case_mg_ineligible_reason` can hold are not confirmed. The column is in the export; its domain is not written down anywhere.
- **Members in care by tenure** — Blocked: needs an episode-of-care definition — days in care currently run through inactivation.
- **Payer contracts and credentialing** — Confirm whether “licensed” in the ask means payer credentialing or state licensure — they are different counts.
- **Post-discharge members reached** — Denominator depends on how we learn about a discharge — payer feed, referrer notification or member self-report. Each gives a different population.
- **Diagnostic interviews — first-time vs repeat** — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days.
- **Median length of active care** — Blocked on the same episode-of-care definition as the tenure visual. Today length of care runs through to inactivation, which overstates it.
- **Days from registration to inactivation** — Needs an inactivation reason field to separate lapsed from clinically discharged.
- **Median time from session end to signed note** — Depends on a session-end timestamp existing in the model. If only a session date is stored, this measure cannot be built as specified.
