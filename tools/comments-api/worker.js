/* The shared store behind the review-comment layer in reports/_shared/charts.js.
   A Cloudflare Worker with one D1 database behind it, and nothing else.

   Why it exists: a mock-up you can open from disk has nowhere to put a comment except the
   reader's own browser, so a note never reaches anybody. Point CAPI in charts.js at this
   Worker and every reader of a report sees the same list, live.

   The whole contract is four routes, and it is the same shape charts.js already speaks:

     GET    /api/comments            every comment, oldest first  -> { comments: [ … ] }
     POST   /api/comments            one comment as JSON          -> { comments: [ … ] }
     PATCH  /api/comments/<id>       the whole comment as JSON    -> { comments: [ … ] }
     DELETE /api/comments/<id>                                    -> { comments: [ … ] }

   Every route answers with the full list, because that is what the client redraws from —
   one round trip per action, no reconciling on the client.

   Why D1 and not KV. This was written against KV first, and the deployed Worker was
   measured: a comment took 30 to 40 seconds to become visible to a read, which is what
   eventual consistency means in practice. For a review tool that is fatal — the colleague
   you are talking to sees nothing for half a minute, and a reply to a comment written
   seconds ago fails, because the row it replies to is not visible yet. D1 reads its own
   writes, so a comment exists the moment it is made.

   Honesty about access: anyone who has the URL can read and write. That is deliberate —
   the readers are colleagues and reviewers with no accounts, and a token living in a
   public HTML page is not a secret. Keep the URL to the people reviewing, set
   ALLOW_ORIGINS to the pages that may call it, and treat the contents as review notes
   rather than anything confidential. */

const MAX_TEXT = 4000;     /* a comment is a request for a change, not a document */
const MAX_REPLIES = 50;

const SCHEMA = `CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  n INTEGER NOT NULL,
  doc TEXT NOT NULL,
  docName TEXT,
  page TEXT,
  pageName TEXT,
  kind TEXT,
  "key" TEXT,
  label TEXT,
  x REAL,
  y REAL,
  body TEXT,
  who TEXT,
  at TEXT,
  resolved INTEGER,
  replies TEXT
)`;

let ready = false;   /* per isolate: the table is created once, not on every request */

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/api\/comments(?:\/([^/]+))?\/?$/);
    if (!match) return reply({ error: "not found" }, 404, cors);
    if (!env.DB) return reply({ error: "no D1 database bound to DB" }, 500, cors);

    const id = match[1] ? decodeURIComponent(match[1]) : "";

    try {
      if (!ready) { await env.DB.exec(SCHEMA.replace(/\s+/g, " ")); ready = true; }

      if (request.method === "GET") return reply({ comments: await listAll(env) }, 200, cors);

      if (request.method === "POST" && !id) {
        const c = clean(await request.json());
        /* The number is assigned here, not by the client: two people commenting at once
           would otherwise both be "4". It counts within one report. */
        const top = await env.DB.prepare("SELECT MAX(n) AS n FROM comments WHERE doc = ?")
          .bind(c.doc).first();
        c.n = ((top && top.n) || 0) + 1;
        await env.DB.prepare(
          `INSERT INTO comments (id, n, doc, docName, page, pageName, kind, "key", label,
                                 x, y, body, who, at, resolved, replies)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        ).bind(c.id, c.n, c.doc, c.docName, c.page, c.pageName, c.kind, c.key, c.label,
               c.x, c.y, c.text, c.who, c.at, 0, JSON.stringify(c.replies)).run();
        return reply({ comments: await listAll(env) }, 200, cors);
      }

      if (request.method === "PATCH" && id) {
        /* The client sends the whole comment back. Only the parts a reader can actually
           change are taken from it — where a pin sits and who wrote it are not up for
           editing after the fact. */
        const body = await request.json();
        const res = await env.DB.prepare(
          `UPDATE comments SET body = COALESCE(NULLIF(?, ''), body), resolved = ?, replies = ?
           WHERE id = ?`
        ).bind(text(body.text, MAX_TEXT), body.resolved ? 1 : 0,
               JSON.stringify(replies(body.replies)), id).run();
        if (!res.meta || !res.meta.changes) return reply({ error: "no such comment" }, 404, cors);
        return reply({ comments: await listAll(env) }, 200, cors);
      }

      if (request.method === "DELETE" && id) {
        await env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
        return reply({ comments: await listAll(env) }, 200, cors);
      }

      return reply({ error: "method not allowed" }, 405, cors);
    } catch (err) {
      return reply({ error: String((err && err.message) || err) }, 400, cors);
    }
  }
};

async function listAll(env) {
  const out = await env.DB.prepare("SELECT * FROM comments ORDER BY at ASC").all();
  return (out.results || []).map((r) => ({
    id: r.id, n: r.n, doc: r.doc, docName: r.docName, page: r.page, pageName: r.pageName,
    kind: r.kind, key: r.key, label: r.label, x: r.x, y: r.y,
    text: r.body, who: r.who, at: r.at,
    resolved: !!r.resolved, replies: parse(r.replies)
  }));
}

function parse(s) {
  try { const v = JSON.parse(s || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}

/* Everything that reaches the database is rebuilt field by field from what the client
   sent. A comment is a fixed shape and nothing else survives the trip. */
function clean(body) {
  return {
    id: text(body.id, 40) || "c" + Math.random().toString(36).slice(2, 12),
    doc: text(body.doc, 200) || "unknown",
    docName: text(body.docName, 200),
    page: text(body.page, 100),
    pageName: text(body.pageName, 200),
    kind: body.kind === "page" ? "page" : "visual",
    key: text(body.key, 300),
    label: text(body.label, 300),
    x: num(body.x),
    y: num(body.y),
    text: text(body.text, MAX_TEXT),
    who: text(body.who, 80) || "Anonymous",
    at: new Date().toISOString(),
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
   this Worker. "null" is what a browser sends for a report opened straight from disk, so
   it is in the list on purpose: these files are meant to work from a file:// path too.
   Leave the whole list empty only while testing: it then answers anyone. */
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
