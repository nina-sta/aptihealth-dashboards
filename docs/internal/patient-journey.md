# Patient journey — report specification

> **This document and [reports/internal/patient-journey.html](../../reports/internal/patient-journey.html) are one deliverable.** Change one, change the other in the
> same commit. `tools/sync.py` fails if the visuals in the two disagree.

**Audience:** aptihealth leadership and product, and the data team who will build it in Power BI.
**Purpose:** Show the member's path from referral to discharge so we can agree which numbers we run the business on, then hand those definitions to data science.

## How to read the table

`Visual` matches the tile heading in the report exactly — that is the join key between this
document and the mock-up. A ⬥ means the visual answers a statistic CDPHP asked for.

**The measure definition is not repeated here.** It lives in the ⓘ tooltip on the tile, so
there is exactly one copy of it and it cannot drift. This document owns the three things the
tooltip cannot know: who is accountable for the data, what decision the number changes, and
whether it is buildable yet.

`Owner` is the person accountable for the data being correct — not the person who builds the
visual. Every row currently reads `_unassigned_`; assigning them is the next working session
and is the point of this document.


### General

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Members served ⬥ | How many people have we ever treated for this payer? | _unassigned_ | _to agree_ | Built |
| Engaged members ⬥ | How many are in care right now? | _unassigned_ | _to agree_ | Built |
| Acquisition and access funnel | Where in sign-up do people fall out? | _unassigned_ | _to agree_ | Built |
| Outcomes ⬥ | Are people getting better? | _unassigned_ | _to agree_ | Built |
| Access by referral channel ⬥ | Which channel converts, and how fast? | _unassigned_ | _to agree_ | Built |
| Median days to first appointment — urgent vs routine ⬥ | How long is the wait, and does urgency change it? | _unassigned_ | _to agree_ | Built |
| Urgent volume by reason | What is driving urgent volume? | _unassigned_ | _to agree_ | Built |
| Urgent referrals — time to care by reason ⬥ | Which urgent reasons wait longest? | _unassigned_ | _to agree_ | Built |
| Routine referrals by requested service | What are routine referrals asking for? | _unassigned_ | _to agree_ | Built |
| Members meeting ACP touchpoint minimum | Are we hitting the contractual touchpoint minimum? | _unassigned_ | _to agree_ | Built |
| Lapse and exit | Who is going quiet or leaving? | _unassigned_ | _to agree_ | Built |
| Where members drop out — inactivation by journey stage ⬥ | Do people leave before care starts or after it finishes? | _unassigned_ | _to agree_ | Built |
| Days from registration to inactivation ⬥ | How long do people last before going inactive? | _unassigned_ | _to agree_ | Blocked — Needs an inactivation reason field to separate lapsed from clinically discharged |

### CDPHP Ask: Volume

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Engaged members — two definitions side by side ⬥ | Does the engagement number change depending on which definition we use? | _unassigned_ | _to agree_ | Built |
| Retained members ⬥ | How many stay in care from one month to the next? | _unassigned_ | _to agree_ | Built |
| Payer contracts and credentialing ⬥ | How many payers can we actually bill, versus how many we have signed? | _unassigned_ | _to agree_ | Blocked — Confirm whether “licensed” in the ask means payer credentialing or state licensure — they are different counts |
| Members with a medication management service ⬥ | What share of members get medication management, and is that ever or this month? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Intake

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Intake providers covering ages 5–17 ⬥ | Can we actually take adolescents? | _unassigned_ | _to agree_ | Built |
| Adolescent DIs booked outside the age range ⬥ | Are we booking minors with providers not configured for them? | _unassigned_ | _to agree_ | Blocked — Assumes the booking stores the provider age range as configured at booking time, not as configured today |
| Diagnostic interviews — first-time vs repeat ⬥ | How much intake capacity goes to people we have already assessed? | _unassigned_ | _to agree_ | Blocked — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days |
| Assessment instrument reference ⬥ | How long is the assessment we ask members to complete? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Discharge And Acuity

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Acuity 4 by referral channel and admission source ⬥ | Is high acuity really mostly hospital and ED discharges? | _unassigned_ | _to agree_ | Built |
| Post-discharge members reached ⬥ | Do we make contact after a discharge, and inside what window? | _unassigned_ | _to agree_ | Blocked — Denominator depends on how we learn about a discharge — payer feed, referrer notification or member self-report. Each gives a different population |
| FUM and FUH — HEDIS follow-up ⬥ | Do we meet the HEDIS follow-up standards? | _unassigned_ | _to agree_ | Built |
| Acuity 4 criteria — appendix ⬥ | What exactly counts as acuity 4? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Engagement And Outcomes

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Sessions per member — mean and median ⬥ | How much care does a typical member actually get? | _unassigned_ | _to agree_ | Built |
| Median length of active care ⬥ | How long does an episode of care last? | _unassigned_ | _to agree_ | Blocked — Blocked on the episode-of-care definition. Today length of care runs through to inactivation, which overstates it |
| 2+ BH sessions in first 60 days ⬥ | Do new members get enough early contact to stick? | _unassigned_ | _to agree_ | Built |
| Median days to 50% reduction — PHQ-9 and GAD-7 ⬥ | How fast do people improve, and does the baseline filter change the answer? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Copay

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Median sessions by copay cohort ⬥ | Does a copay shorten the course of care? | _unassigned_ | _to agree_ | Built |
| Paywall exposure and conversion ⬥ | How many people hit the paywall and how many carry on anyway? | _unassigned_ | _to agree_ | Built |

### CDPHP Ask: Referrals

| Visual | Business question | Owner | Business impact | Status |
| --- | --- | --- | --- | --- |
| Self sign-up by how they heard about us ⬥ | What is actually bringing self sign-ups in? | _unassigned_ | _to agree_ | Built |
| CDPHP-direct referral volume ⬥ | Is the payer still sending us members directly? | _unassigned_ | _to agree_ | Built |
| CDPHP-direct referrers ⬥ | Who inside the payer is sending, and how sick are their referrals? | _unassigned_ | _to agree_ | Built |
| Channel mix — CDPHP vs comparable payer ⬥ | Does this payer's referral mix look normal? | _unassigned_ | _to agree_ | Built |

## Open items

- **Days from registration to inactivation** — Needs an inactivation reason field to separate lapsed from clinically discharged.
- **Payer contracts and credentialing** — Confirm whether “licensed” in the ask means payer credentialing or state licensure — they are different counts.
- **Adolescent DIs booked outside the age range** — Assumes the booking stores the provider age range as configured at booking time, not as configured today.
- **Diagnostic interviews — first-time vs repeat** — “Repeat” is not defined on our side. The only written rules are the annual re-assessment for returning members and A5R every 90 days.
- **Post-discharge members reached** — Denominator depends on how we learn about a discharge — payer feed, referrer notification or member self-report. Each gives a different population.
- **Median length of active care** — Blocked on the episode-of-care definition. Today length of care runs through to inactivation, which overstates it.
