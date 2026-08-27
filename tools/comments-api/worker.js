/* The shared store behind the review-comment layer in reports/_shared/charts.js.
   A Cloudflare Worker with one KV namespace behind it, and nothing else.

   Why it exists: a mock-up you can open from disk has nowhere to put a comment except the
   reader's own browser, so a note never reaches anybody. Point CAPI in charts.js at this
   Worker and every reader of a report sees the same list, live.

   The whole contract is four routes, and it is the same shape charts.js already speaks:

     GET    /api/comments            every comment, newest last   -> { comments: [ … ] }
     POST   /api/comments            one comment as JSON          -> { comments: [ … ] }
     PATCH  /api/comments/<id>       the whole comment as JSON    -> { comments: [ … ] }
     DELETE /api/comments/<id>                                    -> { comments: [ … ] }

   Every route answers with the full list, because that is what the client redraws from —
   one round trip per action, no reconciling on the client.

   Storage is one KV key per comment (c:<id>), not one key per report holding an array.
   Two people commenting at the same second would otherwise overwrite each other, and this
   is a tool for exactly that moment. KV reads are eventually consistent, so a write does
   not re-read: the reply is built from the list this request already had, plus the change
   it just made.

   Honesty about access: anyone who has the URL can read and write. That is deliberate —
   the readers are colleagues and payer-facing reviewers with no accounts, and a token
   living in a public HTML page is not a secret. Keep the URL to the people reviewing, set
   ALLOW_ORIGINS to the pages that may call it, and treat the contents as review notes
   rather than anything confidential. */

const MAX_TEXT = 4000;     /* a comment is a request for a change, not a document */
const MAX_REPLIES = 50;
const MAX_COMMENTS = 1000; /* backstop: a runaway client cannot fill the namespace */

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/api\/comments(?:\/([^/]+))?\/?$/);
    if (!match) return reply({ error: "not found" }, 404, cors);
    if (!env.COMMENTS) return reply({ error: "no KV namespace bound to COMMENTS" }, 500, cors);

    const id = match[1] ? decodeURIComponent(match[1]) : "";

    try {
      const all = await listAll(env);

      if (request.method === "GET") return reply({ comments: all }, 200, cors);

      if (request.method === "POST" && !id) {
        if (all.length >= MAX_COMMENTS) return reply({ error: "too many comments" }, 507, cors);
        const c = clean(await request.json(), all);
        await env.COMMENTS.put("c:" + c.id, JSON.stringify(c));
        return reply({ comments: all.concat([c]) }, 200, cors);
      }

      if (request.method === "PATCH" && id) {
        const existing = all.find((c) => c.id === id);
        if (!existing) return reply({ error: "no such comment" }, 404, cors);
        /* The client sends the whole comment back. Only the parts a reader can actually
           change are taken from it — where a pin sits and who wrote it are not up for
           editing after the fact. */
        const body = await request.json();
        const next = Object.assign({}, existing, {
          text: text(body.text, MAX_TEXT) || existing.text,
          resolved: !!body.resolved,
          replies: replies(body.replies)
        });
        await env.COMMENTS.put("c:" + id, JSON.stringify(next));
        return reply({ comments: all.map((c) => (c.id === id ? next : c)) }, 200, cors);
      }

      if (request.method === "DELETE" && id) {
        await env.COMMENTS.delete("c:" + id);
        return reply({ comments: all.filter((c) => c.id !== id) }, 200, cors);
      }

      return reply({ error: "method not allowed" }, 405, cors);
    } catch (err) {
      return reply({ error: String((err && err.message) || err) }, 400, cors);
    }
  }
};

async function listAll(env) {
  const keys = [];
  let cursor;
  do {
    const page = await env.COMMENTS.list({ prefix: "c:", cursor });
    keys.push(...page.keys.map((k) => k.name));
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);

  const raw = await Promise.all(keys.map((k) => env.COMMENTS.get(k, "json")));
  return raw
    .filter(Boolean)
    .sort((a, b) => String(a.at).localeCompare(String(b.at)));
}

/* Everything that reaches KV is rebuilt field by field from what the client sent. A
   comment is a fixed shape and nothing else survives the trip. */
function clean(body, all) {
  const doc = text(body.doc, 200) || "unknown";
  const kind = body.kind === "page" ? "page" : "visual";
  /* The number is assigned here, not by the client: two people commenting at once would
     otherwise both be "4". It counts within one report. */
  const n = all.reduce((m, c) => (c.doc === doc && c.n > m ? c.n : m), 0) + 1;
  return {
    id: text(body.id, 40) || "c" + Math.random().toString(36).slice(2, 12),
    n: n,
    doc: doc,
    docName: text(body.docName, 200),
    page: text(body.page, 100),
    pageName: text(body.pageName, 200),
    kind: kind,
    key: text(body.key, 300),
    label: text(body.label, 300),
    x: num(body.x),
    y: num(body.y),
    text: text(body.text, MAX_TEXT),
    who: text(body.who, 80) || "Anonymous",
    at: new Date().toISOString(),
    resolved: !!body.resolved,
    replies: replies(body.replies)
  };
}

function replies(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, MAX_REPLIES).map((r) => ({
    who: text(r && r.who, 80) || "Anonymous",
    text: text(r && r.text, MAX_TEXT),
    at: text(r && r.at, 40) || new Date().toISOString()
  }));
}

function text(v, max) {
  return typeof v === "string" ? v.slice(0, max) : "";
}

function num(v) {
  const n = Number(v);
  return isFinite(n) ? Math.max(0, Math.min(100, n)) : 50;
}

function reply(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: Object.assign({ "Content-Type": "application/json" }, cors)
  });
}

/* ALLOW_ORIGINS is a comma-separated list in wrangler.toml — the pages allowed to call
   this Worker. Leave it unset only while testing: it then answers anyone. */
function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = String((env && env.ALLOW_ORIGINS) || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ok = !allowed.length || allowed.indexOf(origin) !== -1;
  return {
    "Access-Control-Allow-Origin": ok ? (origin || "*") : "null",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}
