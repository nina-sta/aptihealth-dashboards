/* Shared chart builders and page behaviour for every report in this repo.
   Loaded by each report page; the report then calls APTI.render() with its own data.
   Changing a builder here changes every report — that is the point of the file. */
(function (g) {
  var MO = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
  var NS = "http://www.w3.org/2000/svg";

  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function svg(w, h) { var s = el("svg", { viewBox: "0 0 " + w + " " + h }); s.style.height = h + "px"; return s; }
  function txt(s, x, y, o) {
    o = o || {};
    var t = el("text", { x: x, y: y, "font-size": o.fs || 8, fill: o.fill || "var(--ink-muted)",
      "text-anchor": o.anchor || "start", "font-weight": o.w || 400 });
    t.textContent = s; return t;
  }
  function tip(n, s) { n.setAttribute("data-tip", s); }

  function columns(id, opt) {
    var host = document.getElementById(id); if (!host) return;
    var W = Math.max(host.clientWidth || 460, 240), H = opt.h || 80;
    var pl = opt.pl == null ? 24 : opt.pl, pb = opt.pb || 12, pt = 9, s = svg(W, H);
    var max = opt.max;
    if (!max) {
      if (opt.stacked && !opt.pct) {
        max = 0;
        for (var q = 0; q < opt.labels.length; q++) {
          var tt2 = opt.series.reduce(function (a, sr) { return a + sr.values[q]; }, 0);
          if (tt2 > max) max = tt2;
        }
        max = max * 1.1;
      } else {
        max = Math.max.apply(null, [].concat.apply([], opt.series.map(function (x) { return x.values; }))) * 1.15;
      }
    }
    var n = opt.labels.length, bw = (W - pl - 4) / n;
    [0, 0.5, 1].forEach(function (f) {
      var y = pt + (H - pt - pb) * (1 - f);
      s.appendChild(el("line", { x1: pl, x2: W, y1: y, y2: y, stroke: "var(--grid)" }));
      s.appendChild(txt(opt.fmt ? opt.fmt(max * f) : Math.round(max * f), pl - 4, y + 3, { anchor: "end" }));
    });
    opt.labels.forEach(function (lb, i) {
      var x0 = pl + i * bw;
      if (opt.stacked) {
        var acc = 0, tot = opt.series.reduce(function (a, sr) { return a + sr.values[i]; }, 0);
        opt.series.forEach(function (sr) {
          var v = sr.values[i], hh = (H - pt - pb) * (v / (opt.pct ? tot : max));
          var r = el("rect", { x: x0 + bw * 0.18, y: H - pb - acc - hh, width: bw * 0.64,
            height: Math.max(hh - 2, 1), rx: 2, fill: sr.color });
          tip(r, lb + " · " + sr.name + ": " + v + (opt.unit || ""));
          s.appendChild(r); acc += hh;
        });
      } else {
        var k = opt.series.length, iw = (bw * 0.72) / k;
        opt.series.forEach(function (sr, j) {
          var v = sr.values[i], hh = (H - pt - pb) * (v / max);
          var r = el("rect", { x: x0 + bw * 0.14 + j * (iw + 1), y: H - pb - hh, width: iw - 1,
            height: Math.max(hh, 1), rx: 2, fill: sr.color });
          tip(r, lb + " · " + sr.name + ": " + v + (opt.unit || ""));
          s.appendChild(r);
        });
      }
      var lab = txt(lb, x0 + bw / 2, H - 3, { anchor: "middle", fs: opt.xfs || 8 });
      s.appendChild(lab);
    });
    if (opt.rule != null) {
      var ry = pt + (H - pt - pb) * (1 - opt.rule / max);
      s.appendChild(el("line", { x1: pl, x2: W, y1: ry, y2: ry, stroke: "var(--ink-1)", "stroke-width": 1.6, "stroke-dasharray": "4 3" }));
      s.appendChild(txt(opt.ruleLabel || ("target " + opt.rule), W, ry - 3, { anchor: "end", fs: 8, fill: "var(--ink-1)", w: 650 }));
    }
    s.appendChild(el("line", { x1: pl, x2: W, y1: H - pb, y2: H - pb, stroke: "var(--baseline)" }));
    host.appendChild(s);
  }

  function lines(id, opt) {
    var host = document.getElementById(id); if (!host) return;
    var W = Math.max(host.clientWidth || 460, 260), H = opt.h || 84, pl = 24, pb = 12, pt = 8, s = svg(W, H);
    var max = opt.max || 100, n = opt.labels.length, step = (W - pl - 40) / (n - 1);
    var U = opt.unit == null ? "%" : opt.unit;
    [0, 0.5, 1].forEach(function (f) {
      var y = pt + (H - pt - pb) * (1 - f);
      s.appendChild(el("line", { x1: pl, x2: W - 34, y1: y, y2: y, stroke: "var(--grid)" }));
      s.appendChild(txt(Math.round(max * f) + U, pl - 4, y + 3, { anchor: "end" }));
    });
    if (opt.rule != null) {
      var ry = pt + (H - pt - pb) * (1 - opt.rule / max);
      s.appendChild(el("line", { x1: pl, x2: W - 34, y1: ry, y2: ry, stroke: "var(--ink-1)", "stroke-width": 1.6, "stroke-dasharray": "4 3" }));
      s.appendChild(txt(opt.ruleLabel || "", pl + 3, ry + 9, { anchor: "start", fs: 8, fill: "var(--ink-1)", w: 650 }));
    }
    opt.series.forEach(function (sr) {
      var pts = sr.values.map(function (v, i) { return [pl + i * step, pt + (H - pt - pb) * (1 - v / max)]; });
      s.appendChild(el("path", { d: "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L"),
        fill: "none", stroke: sr.color, "stroke-width": 2, "stroke-linejoin": "round" }));
      pts.forEach(function (p, i) {
        var c = el("circle", { cx: p[0], cy: p[1], r: 2.8, fill: sr.color, stroke: "#fff", "stroke-width": 1.6 });
        tip(c, opt.labels[i] + " · " + sr.name + ": " + sr.values[i] + U); s.appendChild(c);
      });
      var lp = pts[pts.length - 1];
      s.appendChild(txt(sr.values[sr.values.length - 1] + U, lp[0] + 5, lp[1] + 3, { fs: 8.5, fill: "var(--ink-1)", w: 650 }));
    });
    opt.labels.forEach(function (lb, i) { s.appendChild(txt(lb, pl + i * step, H - 3, { anchor: "middle" })); });
    s.appendChild(el("line", { x1: pl, x2: W - 34, y1: H - pb, y2: H - pb, stroke: "var(--baseline)" }));
    host.appendChild(s);
  }

  function bars(id, opt) {
    var host = document.getElementById(id); if (!host) return;
    var rows = opt.rows, lw = opt.lw || 88, rh = opt.rh || 18;
    var W = Math.max(host.clientWidth || 320, 240), H = rows.length * rh + 6, s = svg(W, H);
    var max = opt.max || Math.max.apply(null, rows.map(function (r) { return Math.max(r.value, r.target || 0); })) * 1.18;
    var aw = W - lw - 44;
    if (opt.rule != null) {
      var rx = lw + aw * (opt.rule / max);
      s.appendChild(el("line", { x1: rx, x2: rx, y1: 0, y2: H - 2, stroke: "var(--ink-1)", "stroke-width": 1.6 }));
    }
    rows.forEach(function (r, i) {
      var y = i * rh + 3, bh = rh - 8;
      s.appendChild(txt(r.label, 0, y + bh - 1, { fill: "var(--ink-2)", fs: 8.5 }));
      s.appendChild(el("rect", { x: lw, y: y, width: aw, height: bh, rx: 2, fill: "var(--track)" }));
      var b = el("rect", { x: lw, y: y, width: Math.max(aw * (r.value / max), 1), height: bh, rx: 2, fill: r.color || "var(--s1)" });
      tip(b, r.label + ": " + (r.fmt || r.value)); s.appendChild(b);
      if (r.target) {
        var tx = lw + aw * (r.target / max);
        s.appendChild(el("line", { x1: tx, x2: tx, y1: y - 1, y2: y + bh + 1, stroke: "var(--ink-1)", "stroke-width": 2 }));
      }
      s.appendChild(txt(r.fmt || r.value, W, y + bh - 1, { anchor: "end", fill: "var(--ink-1)", fs: 8.5, w: 650 }));
    });
    host.appendChild(s);
  }

  /* Centred, tapering funnel: every stage is a bar centred on the same axis and
     scaled against the first stage, with the drop between stages drawn as the
     sloping shoulder. Values and stage-to-stage conversion sit in the right gutter
     so they stay aligned however narrow the bars get. */
  function funnel(id, rows) {
    var host = document.getElementById(id); if (!host) return;
    var rh = 20, bh = 15, W = Math.max(host.clientWidth || 400, 260);
    var H = rows.length * rh + 4, s = svg(W, H);
    var lw = 126, aw = W - lw - 74, cx = lw + aw / 2, max = rows[0].value;
    var wid = rows.map(function (r) { return Math.max(aw * (r.value / max), 2); });

    rows.forEach(function (r, i) {
      var y = i * rh + 2;
      if (i < rows.length - 1) {
        var pts = [
          [cx - wid[i] / 2, y + bh], [cx + wid[i] / 2, y + bh],
          [cx + wid[i + 1] / 2, y + rh], [cx - wid[i + 1] / 2, y + rh]
        ];
        s.appendChild(el("polygon", {
          points: pts.map(function (q) { return q[0] + "," + q[1]; }).join(" "),
          fill: "var(--s1)", opacity: 0.22
        }));
      }
      s.appendChild(txt(r.label, 0, y + bh - 4, { fill: r.leak ? "var(--critical)" : "var(--ink-2)", fs: 8.5 }));
      var b = el("rect", { x: cx - wid[i] / 2, y: y, width: wid[i], height: bh, rx: 2, fill: "var(--s1)" });
      tip(b, r.label + ": " + r.value.toLocaleString() + (r.conv ? " · " + r.conv + " of prior stage" : "") + (r.leakTxt ? " · leak: " + r.leakTxt : ""));
      s.appendChild(b);
      s.appendChild(txt(r.value.toLocaleString(), W - 34, y + bh - 4, { anchor: "end", fill: "var(--ink-1)", fs: 8.5, w: 650 }));
      s.appendChild(txt(r.conv || "—", W, y + bh - 4, { anchor: "end", fs: 8.5 }));
    });
    host.appendChild(s);
  }

  function spark(id, vals, color, unit) {
    var host = document.getElementById(id); if (!host) return;
    var W = Math.max(host.clientWidth || 120, 80), H = 22, s = svg(W, H);
    var max = Math.max.apply(null, vals) * 1.05, min = Math.min.apply(null, vals) * 0.95;
    var step = W / (vals.length - 1);
    var pts = vals.map(function (v, i) { return [i * step, H - (H - 3) * ((v - min) / (max - min || 1)) - 1.5]; });
    var d = "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L");
    s.appendChild(el("path", { d: d + "L" + W + "," + H + "L0," + H + "Z", fill: color, opacity: 0.13 }));
    s.appendChild(el("path", { d: d, fill: "none", stroke: color, "stroke-width": 1.8, "stroke-linejoin": "round" }));
    var lp = pts[pts.length - 1];
    s.appendChild(el("circle", { cx: lp[0] - 1, cy: lp[1], r: 2.2, fill: color }));
    tip(s, "Monthly, Sep–Aug · latest " + vals[vals.length - 1] + (unit || ""));
    host.appendChild(s);
  }

  function smallMultiples(id, items) {
    var host = document.getElementById(id); if (!host) return;
    items.forEach(function (it, ix) {
      var wrap = document.createElement("div");
      wrap.className = "sm2";
      wrap.style.cssText = "border-bottom:1px solid var(--grid);padding:4px 0";
      var row = document.createElement("div"); row.className = "row";
      var l = document.createElement("div");
      l.innerHTML = '<div class="big">' + it.value + '</div><div style="font-size:8.5px;color:var(--ink-2)">' + it.label + '</div>';
      var ch = document.createElement("div"); ch.style.cssText = "width:54%"; ch.id = id + "-sm" + ix;
      row.appendChild(l); row.appendChild(ch); wrap.appendChild(row); host.appendChild(wrap);
      spark(ch.id, it.spark, it.color, it.unit);
    });
    if (host.lastChild) host.lastChild.style.borderBottom = "0";
  }

  function matrix(id, cols, rows) {
    var host = document.getElementById(id); if (!host) return;
    var t = document.createElement("table"); t.className = "mx";
    var hr = document.createElement("tr");
    cols.forEach(function (c) { var th = document.createElement("th"); th.textContent = c; hr.appendChild(th); });
    t.appendChild(hr);
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      r.forEach(function (c) {
        var td = document.createElement("td");
        if (c && c.bar != null) {
          td.className = "b";
          var b = document.createElement("div"); b.className = "bar"; b.style.width = "calc(" + c.bar + "% - 6px)";
          var sp = document.createElement("span"); sp.textContent = c.v;
          td.appendChild(b); td.appendChild(sp);
        } else if (c && c.cf) {
          var s2 = document.createElement("span"); s2.className = "cf " + c.cf; s2.textContent = c.v; td.appendChild(s2);
        } else if (c && c.v != null) { td.textContent = c.v; }
        else { td.textContent = c; }
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
    host.appendChild(t);
  }

  /* Charts size themselves from host.clientWidth, so every page is made visible
     for the duration of the draw and then hidden again. A hidden page measures
     as zero width and the charts render at a fallback size. Do not remove this. */
  function render(draw) {
    var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
    pages.forEach(function (p) { p.classList.add("on"); });
    draw();
    pages.forEach(function (p, i) { p.classList.toggle("on", i === 0); });
    wire();
  }

  function wire() {
    /* Page tabs. Single-report pages use links instead of buttons, so this is an
       empty list there — harmless, and it keeps one wiring path for both shapes. */
    var btns = Array.prototype.slice.call(document.querySelectorAll(".ptabs button"));

  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      btns.forEach(function (o) {
        var on = o === b;
        o.setAttribute("aria-pressed", on ? "true" : "false");
        document.getElementById(o.dataset.pg).classList.toggle("on", on);
      });
    });
  });

  /* ---- slicer / visual-filter dropdowns (mock: they open and set the label, nothing filters) ---- */
  var MONTHS = ["Aug 2026", "Jul 2026", "Jun 2026", "May 2026", "Apr 2026", "Q3 2026", "Rolling 3 months"];
  var CHANNELS = ["Channel: all", "Channel: self sign-up", "Channel: PCP practices", "Channel: health systems", "Channel: health plans"];
  var ACUITY = ["Acuity: all", "Acuity: severe", "Acuity: high", "Acuity: medium", "Acuity: base"];
  var SUPS = ["Supervisor: all", "Supervisor A", "Supervisor B", "Supervisor C"];

  var OPTIONS = {
    /* report-level slicers */
    "Payer: CDPHP": { head: "Payer", opts: ["Payer: CDPHP", "Payer: MVP", "Payer: Fidelis", "Payer: Medicaid FFS", "Payer: all"] },
    "Program: All": { head: "Program", opts: ["Program: All", "Program: Therapy only", "Program: Medication management", "Program: Combined", "Program: Higher level of care"] },
    "Rolling 12 months": { head: "Period", opts: ["Rolling 12 months", "Rolling 6 months", "Rolling 3 months", "Year to date", "Calendar 2025"] },
    /* visual-level filters */
    "Aug 2026": { head: "Month", opts: MONTHS },
    "Channel: all": { head: "Referral channel", opts: CHANNELS },
    "Acuity: all": { head: "Acuity", opts: ACUITY },
    "Acuity: severe": { head: "Acuity", opts: ACUITY },
    "Supervisor: all": { head: "Supervisor", opts: SUPS },
    "Baseline \u22659": { head: "HEDIS baseline", opts: ["Baseline \u22659", "Baseline \u22655", "Baseline: any score"] },
    "Stage: first session": { head: "Conversion stage", opts: ["Stage: registration complete", "Stage: DI attended", "Stage: first session"] },
    "Stage: all": { head: "Journey stage", opts: ["Stage: all", "Stage: registered, never assessed", "Stage: A5 done, no DI", "Stage: DI attended, no first session", "Stage: in care, left early", "Stage: completed 90-day care"] },
    "Scored within 30 days": { head: "Scoring window", opts: ["Scored within 30 days", "Scored within 60 days", "Scored within 90 days"] },
    "Of: active members": { head: "Denominator", opts: ["Of: active members", "Of: all enrolled members", "Of: members with \u22651 session"] },
    "Milestone: DI attended": { head: "Milestone", opts: ["Milestone: DI scheduled", "Milestone: DI attended", "Milestone: first therapy session"] },
    "Top 4 + other": { head: "Reason grouping", opts: ["Top 4 + other", "Top 6 + other", "All reasons"] },
    "Top 5": { head: "Rows shown", opts: ["Top 5", "Top 10", "Top 20", "All providers"] },
    "60-day lookback": { head: "Engagement definition", opts: ["60-day lookback", "90-day lookback", "In-month only"] },
    "All note types": { head: "Note type", opts: ["All note types", "Guided session notes", "Progress notes", "Intake (DI) notes", "Discharge summaries"] },
    "Note type: all": { head: "Note type", opts: ["Note type: all", "Note type: guided session", "Note type: progress", "Note type: intake (DI)", "Note type: discharge summary"] },
    "Month end": { head: "Measured at", opts: ["Month end", "Monthly peak", "Monthly average"] }
  };

  var dd = document.getElementById("dd"), ddFor = null;

  function closeDD() {
    dd.classList.remove("on");
    if (ddFor) { ddFor.removeAttribute("data-open"); ddFor = null; }
  }

  function openDD(chip) {
    var cur = chip.textContent.trim();
    var cfg = OPTIONS[cur] || { head: "Filter", opts: [cur] };
    dd.innerHTML = "";
    var h = document.createElement("div"); h.className = "ddh"; h.textContent = cfg.head; dd.appendChild(h);
    cfg.opts.forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "option");
      b.setAttribute("aria-checked", o === cur ? "true" : "false");
      var k = document.createElement("span"); k.className = "tick"; k.textContent = o === cur ? "\u2713" : "";
      b.appendChild(k);
      b.appendChild(document.createTextNode(o));
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        chip.textContent = o;   /* label only — this mock does not re-query anything */
        closeDD();
      });
      dd.appendChild(b);
    });
    dd.classList.add("on");
    chip.setAttribute("data-open", "");
    ddFor = chip;
    var r = chip.getBoundingClientRect();
    dd.style.left = Math.max(6, Math.min(r.left, window.innerWidth - dd.offsetWidth - 8)) + "px";
    var below = window.innerHeight - r.bottom;
    dd.style.top = (below > dd.offsetHeight + 10 ? r.bottom + 4 : Math.max(6, r.top - dd.offsetHeight - 4)) + "px";
  }

  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".sl, .wf");
    if (chip) { e.stopPropagation(); if (chip === ddFor) closeDD(); else { closeDD(); openDD(chip); } return; }
    if (!e.target.closest("#dd")) closeDD();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDD(); });
  window.addEventListener("scroll", closeDD, true);
  window.addEventListener("resize", closeDD);

  var tt = document.getElementById("tt");
  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest("[data-tip]"); if (!t) return;
    tt.textContent = t.getAttribute("data-tip"); tt.style.opacity = "1";
  });
  document.addEventListener("mousemove", function (e) {
    if (tt.style.opacity !== "1") return;
    tt.style.left = Math.min(e.clientX + 13, window.innerWidth - tt.offsetWidth - 8) + "px";
    tt.style.top = (e.clientY + 15) + "px";
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest("[data-tip]")) tt.style.opacity = "0";
  });
  }

  g.APTI = {
    MO: MO, render: render,
    columns: columns, lines: lines, bars: bars,
    funnel: funnel, spark: spark, smallMultiples: smallMultiples, matrix: matrix
  };
})(window);
