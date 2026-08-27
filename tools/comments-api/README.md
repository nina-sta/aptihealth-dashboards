# The shared store for review comments

Every report carries a comment layer (see **The review-comment layer** in `CLAUDE.md`).
Out of the box a comment is kept in the reader's own browser, because a mock-up you can
open from disk has nowhere else to put it. That is enough for one person marking a report
up, and useless for the thing we actually want: somebody clicks a visual, types what should
change, and it turns up in front of the person who has to change it.

This is that missing half — a Cloudflare Worker with one D1 database behind it. Deploy it,
point `CAPI` at it, and every reader of every report sees one live list.

## Deploy it

You need a Cloudflare account (the free tier is far more than this uses) and Node 18+ for
`npx`. From this directory:

```bash
npx wrangler login
npx wrangler d1 create apti-report-comments
```

The second command prints a `database_id`. Paste it into `wrangler.toml`, replacing
`PASTE-THE-DATABASE-ID-HERE`, then:

```bash
npx wrangler deploy
```

Wrangler prints the URL it deployed to, something like
`https://apti-report-comments.<your-subdomain>.workers.dev`. The table is created on the
first request, so there is no migration step.

## Wire the reports to it

One edit, in `reports/_shared/charts.js`:

```js
var CAPI = "https://apti-report-comments.<your-subdomain>.workers.dev";
```

Then re-inline the shared code into every report and check nothing else drifted:

```bash
python3 tools/sync.py --fix
```

`ALLOW_ORIGINS` in `wrangler.toml` lists the pages allowed to call the Worker: the GitHub
Pages origin, and `null`, which is what a browser sends for a report opened straight from
a file path. Add `http://localhost:8000` while testing locally, and deploy again after any
change to it. An empty list answers anybody.

The panel's footnote changes by itself once `CAPI` is set: it stops saying comments are
kept in this browser and says they are shared. Shared mode also polls every 15 seconds, so
a colleague's comment arrives without anybody reloading.

## Why D1 and not KV

This was written on KV first, and the deployed Worker was measured: a comment took **30 to
40 seconds** to become visible to a read. That is not a bug, it is what "eventually
consistent" means — and it is fatal here. The colleague you are talking to sees nothing for
half a minute, and a reply to a comment written seconds ago fails outright, because the row
it is replying to is not visible yet.

D1 reads its own writes. A comment exists the moment it is made, for everybody.

## What it stores, and who can read it

One row per comment: the text, who typed it, when, which report and page, which visual,
where the pin sits, replies, resolved or not. Nothing else — the Worker rebuilds every
record field by field from what the client sent, so a client cannot invent fields, and it
assigns the comment number itself, so two people commenting at the same moment do not both
become "4".

To read the lot without a browser:

```bash
npx wrangler d1 execute apti-report-comments --remote --command "SELECT n, doc, who, body FROM comments"
```

**Anyone with the URL can read and write.** That is deliberate: the readers are colleagues
and reviewers with no accounts, and a token living in a public HTML page is not a secret.
Keep the URL to the people reviewing, keep `ALLOW_ORIGINS` tight, and treat the contents as
review notes rather than anything confidential. Mock-up figures are fabricated anyway — but
a comment is somebody's opinion about the business, so it is not nothing.

## State of the code

The four-route contract is exercised end to end: a stand-in implementing these exact rules
was run against the real client — pin a comment, reply, resolve, delete, and a second
reader's comment appearing by itself — and the KV version of this Worker was deployed and
measured, which is where the 30-to-40-second finding above came from.

What has not been re-run since the switch to D1 is the live round trip against the deployed
Worker. Do it right after deploying — it takes a minute:

```bash
API=https://apti-report-comments.<your-subdomain>.workers.dev
curl -s -X POST $API/api/comments -H 'Content-Type: application/json' \
  -d '{"doc":"selftest","kind":"visual","label":"T","text":"round trip","who":"check"}'
curl -s $API/api/comments        # the comment must be there immediately, not in 30 seconds
```

Then open a report in two browsers: comment in one, and it should appear in the other
inside 15 seconds.
