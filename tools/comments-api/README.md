# The shared store for review comments

Every report carries a comment layer (see **The review-comment layer** in `CLAUDE.md`).
Out of the box a comment is kept in the reader's own browser, because a mock-up you can
open from disk has nowhere else to put it. That is enough for one person marking a report
up, and useless for the thing we actually want: somebody clicks a visual, types what should
change, and it turns up in front of the person who has to change it.

This is that missing half — a Cloudflare Worker with one KV namespace behind it. Deploy it,
point `CAPI` at it, and every reader of every report sees one live list.

## Deploy it

You need a Cloudflare account (the free tier is far more than this uses) and Node 18+ for
`npx`. From this directory:

```bash
npx wrangler login
npx wrangler kv namespace create COMMENTS
```

The second command prints a namespace id. Paste it into `wrangler.toml`, replacing
`PASTE-THE-KV-NAMESPACE-ID-HERE`, then:

```bash
npx wrangler deploy
```

Wrangler prints the URL it deployed to, something like
`https://apti-report-comments.<your-subdomain>.workers.dev`.

## Wire the reports to it

Two edits, both in `reports/_shared/charts.js`:

```js
var CAPI = "https://apti-report-comments.<your-subdomain>.workers.dev";
```

Then re-inline the shared code into every report and check nothing else drifted:

```bash
python3 tools/sync.py --fix
```

Set `ALLOW_ORIGINS` in `wrangler.toml` to the pages allowed to call the Worker — the
GitHub Pages origin, plus `http://localhost:8000` while you are testing — and deploy again.
An empty list answers anybody, which is fine for an afternoon of testing and not how you
want to leave it.

The panel's footnote changes by itself once `CAPI` is set: it stops saying comments are
kept in this browser and says they are shared. Shared mode also polls every 15 seconds, so
a colleague's comment arrives without anybody reloading.

## What it stores, and who can read it

One KV key per comment: the text, who typed it, when, which report and page, which visual,
where the pin sits, replies, resolved or not. Nothing else — the Worker rebuilds every
record field by field from what the client sent, so a client cannot invent fields, and it
assigns the comment number itself, so two people commenting at the same moment do not both
become "4".

**Anyone with the URL can read and write.** That is deliberate: the readers are colleagues
and reviewers with no accounts, and a token living in a public HTML page is not a secret.
Keep the URL to the people reviewing, keep `ALLOW_ORIGINS` tight, and treat the contents as
review notes rather than anything confidential. Mock-up figures are fabricated anyway — but
a comment is somebody's opinion about the business, so it is not nothing.

## State of the code

The four-route contract is exercised end to end — a stand-in implementing these exact rules
was run against the real client, and this Worker's own handler was run against an in-memory
KV: numbering per report, field whitelisting, the text cap, replies, resolve, delete, the
404s and the CORS refusal all behave. What has **not** run is a real deployment: Cloudflare's
own KV (list pagination, eventual consistency) and `wrangler deploy` are untested here.

Two things to check the first time it is deployed:

1. Open a report in two browsers. Comment in one; it should appear in the other inside 15
   seconds.
2. Open the report from `file://` with `CAPI` set. It should still work — the Worker allows
   the request, since a file has no origin to match — and if it does not, that is the
   `ALLOW_ORIGINS` list to look at first.

KV is eventually consistent, so a reply written on one continent can take a moment to reach
a reader on another. Every route answers with the list it just computed rather than
re-reading, so the person who acted always sees their own change immediately.
