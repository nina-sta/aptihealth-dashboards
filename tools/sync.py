#!/usr/bin/env python3
"""Consistency check between the report mock-ups and their specifications.

Run it before finishing any piece of work:

    python3 tools/sync.py            # report problems, exit 1 if any
    python3 tools/sync.py --fix      # re-inline the shared CSS/JS, then report

It enforces four things:

1. Every report inlines the current reports/_shared/report.css and charts.js verbatim.
   The shared files are the source of truth; the copies inside each report exist only so
   that a report is a single self-contained file that can be opened or published anywhere.
2. Every report has a specification under docs/.
3. The set of visuals in a report and the set of rows in its specification match exactly.
   This is the docs-and-mock-ups-agree rule. Add a visual, add a row, in the same commit.
4. Every visual marked "CDPHP asked" in an internal report also appears in the CDPHP
   payer report, because that report is meant to be the full answer to their ask.
5. Every visual marked OKR is listed under "## OKR metrics" in its specification, and every
   metric listed there carries the marker. The two markers mean different things: "CDPHP asked"
   obliges the payer report to carry it, OKR obliges nothing and only records that the business
   is measured on it.

The reverse direction is reported but does not fail. The payer report is allowed to keep a
visual after it leaves every internal report: we decided on 26 Aug 2026 that what the payer
is owed and what we run the business on are two different lists. Those visuals are listed
on every run as payer-only, because they are maintained in one place and nobody internally
is looking at them.

No dependencies. Python 3 only.
"""
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_S, CSS_E = "<!-- shared:css:start -->", "<!-- shared:css:end -->"
JS_S, JS_E = "<!-- shared:js:start -->", "<!-- shared:js:end -->"

REPORTS = {
    "reports/internal/patient-journey.html": "docs/internal/patient-journey.md",
    "reports/internal/provider-journey.html": "docs/internal/provider-journey.md",
    "reports/external/cdphp.html": "docs/external/cdphp.md",
    "reports/external/mvp.html": "docs/external/mvp.md",
}
CDPHP_REPORT = "reports/external/cdphp.html"
# Payer reports. They are excluded from the internal set below, so a payer report keeping a
# visual no internal report has does not read as an internal report having lost it.
EXTERNAL = [CDPHP_REPORT, "reports/external/mvp.html"]
# Pages that need the shared stylesheet but no chart code and no specification.
CSS_ONLY = ["index.html"]


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        return fh.read()


def write(rel, text):
    with open(os.path.join(ROOT, rel), "w", encoding="utf-8") as fh:
        fh.write(text)


def visuals(report_src):
    """Tile heading -> whether it carries the CDPHP marker. The heading is the join key."""
    page = report_src[report_src.index('<div class="page on"'):report_src.index('<div class="ptabs"')]
    found = {}
    for chunk in re.split(r'(?m)^(?=    <div class="v )', page):
        m = re.search(r"<h4>(.*?)</h4>", chunk, re.S)
        if not m:
            continue
        title = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", m.group(1)))).strip()
        found[title] = 'class="ask"' in chunk
    return found


def okr_visuals(report_src):
    """Tile headings carrying the OKR marker."""
    page = report_src[report_src.index('<div class="page on"'):report_src.index('<div class="ptabs"')]
    found = set()
    for chunk in re.split(r'(?m)^(?=    <div class="v )', page):
        if 'class="okr"' not in chunk:
            continue
        m = re.search(r"<h4>(.*?)</h4>", chunk, re.S)
        if m:
            found.add(re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", m.group(1)))).strip())
    return found


def okr_rows(doc_src):
    """Bullets under the specification's "## OKR metrics" heading."""
    if "## OKR metrics" not in doc_src:
        return set()
    tail = doc_src.split("## OKR metrics", 1)[1]
    tail = re.split(r"(?m)^## ", tail)[0]
    return set(m.group(1).strip() for m in re.finditer(r"(?m)^- (.+)$", tail))


def doc_rows(doc_src):
    """First cell of every table row in a specification, minus the CDPHP marker."""
    rows = set()
    for line in doc_src.splitlines():
        if not line.startswith("| ") or line.startswith("| ---") or line.startswith("| Visual"):
            continue
        cell = line.split("|")[1].strip().rstrip("⬥").strip()
        if cell:
            rows.add(cell)
    return rows


def inline(report_src, css, js):
    """Replace the marked blocks. The replacement is passed as a function because the
    shared JS contains backslash escapes that re.sub would otherwise try to interpret."""
    css_block = "%s\n<style>\n%s\n</style>\n%s" % (CSS_S, css, CSS_E)
    js_block = "%s\n<script>\n%s\n</script>\n%s" % (JS_S, js, JS_E)
    report_src = re.sub(re.escape(CSS_S) + r".*?" + re.escape(CSS_E),
                        lambda m: css_block, report_src, flags=re.S)
    return re.sub(re.escape(JS_S) + r".*?" + re.escape(JS_E),
                  lambda m: js_block, report_src, flags=re.S)  # no-op when the page has no JS block


def main():
    fix = "--fix" in sys.argv
    css = read("reports/_shared/report.css").rstrip()
    js = read("reports/_shared/charts.js").rstrip()
    problems = []

    if fix:
        for rel in list(REPORTS) + CSS_ONLY:
            write(rel, inline(read(rel), css, js))
        print("re-inlined shared code into %d files" % (len(REPORTS) + len(CSS_ONLY)))

    for rel in CSS_ONLY:
        if inline(read(rel), css, js) != read(rel):
            problems.append("%s: shared css is stale — run: python3 tools/sync.py --fix" % rel)

    cdphp_visuals = set(visuals(read(CDPHP_REPORT)))
    internal_visuals = set()
    for rel in REPORTS:
        if rel not in EXTERNAL:
            internal_visuals |= set(visuals(read(rel)))
    payer_only = sorted(cdphp_visuals - internal_visuals)

    for rel, doc in sorted(REPORTS.items()):
        src = read(rel)

        want = inline(src, css, js)
        if want != src:
            problems.append("%s: shared css/js is stale — run: python3 tools/sync.py --fix" % rel)

        if not os.path.exists(os.path.join(ROOT, doc)):
            problems.append("%s: no specification at %s" % (rel, doc))
            continue

        vis = visuals(src)
        rows = doc_rows(read(doc))
        for missing in sorted(set(vis) - rows):
            problems.append("%s: visual %r has no row in %s" % (rel, missing, doc))
        for extra in sorted(rows - set(vis)):
            problems.append("%s: %r is documented but not in the report" % (doc, extra))

        marked, listed = okr_visuals(src), okr_rows(read(doc))
        for missing in sorted(marked - listed):
            problems.append("%s: %r is marked OKR but is not listed under '## OKR metrics' in %s"
                            % (rel, missing, doc))
        for extra in sorted(listed - marked):
            problems.append("%s: %r is listed as an OKR but carries no marker in %s"
                            % (doc, extra, rel))

        if rel not in EXTERNAL:
            for title, asked in sorted(vis.items()):
                if asked and title not in cdphp_visuals:
                    problems.append("%s: %r is marked CDPHP asked but is missing from %s"
                                    % (rel, title, CDPHP_REPORT))

    if payer_only:
        print("\nnote — %d payer-only visual(s): in %s, in no internal report.\n"
              "Allowed, but maintained in one place only:\n" % (len(payer_only), CDPHP_REPORT))
        for title in payer_only:
            print("  · " + title)
        print("")

    if problems:
        print("%d problem(s):\n" % len(problems))
        for p in problems:
            print("  - " + p)
        return 1

    total = sum(len(visuals(read(r))) for r in REPORTS)
    print("ok — %d reports, %d visuals, every visual documented, shared code in sync"
          % (len(REPORTS), total))
    return 0


if __name__ == "__main__":
    sys.exit(main())
