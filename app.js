/* Aion 2 Checklist — lógica. Os dados ficam em data.js. */
(function () {
  "use strict";
  var D = window.AION2_DATA;
  var KEY = "aion2-rotina:v1";
  var DAY = 864e5;
  var CLASSES = D.classes;
  var BY_ID = {}; CLASSES.forEach(function (c) { BY_ID[c.id] = c; });
  var ITEM = {}; D.items.forEach(function (i) { ITEM[i.id] = i; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SVG = "http://www.w3.org/2000/svg";

  /* ---------- reset (em UTC: 07:00 UTC = 04:00 em Brasília) ---------- */
  function dailyBoundary(now) {
    var d = new Date(now);
    var t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), D.reset.dailyUtcHour);
    return t > now ? t - DAY : t;
  }
  function weeklyBoundary(now) {
    var t = dailyBoundary(now);
    var off = (new Date(t).getUTCDay() - D.reset.weeklyUtcDay + 7) % 7;
    return t - off * DAY;
  }
  function boundaryFor(freq, now) {
    if (freq === "daily") return dailyBoundary(now);
    if (freq === "weekly" || freq === "recurring") return weeklyBoundary(now);
    return -Infinity;
  }

  /* ---------- datas em Brasília ---------- */
  var brDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" });
  function todayBR() { return brDate.format(new Date()); }
  function ymdToUTC(s) { var p = s.split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2], 12); }
  function daysUntil(ymd) { return Math.round((ymdToUTC(ymd) - ymdToUTC(todayBR())) / DAY); }
  var fmtShort = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "short" });
  function shortDate(ymd) { return fmtShort.format(new Date(ymdToUTC(ymd))).replace(".", "").replace(" de ", " "); }
  var fmtStamp = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  /* ---------- estado ---------- */
  function blank() {
    var chars = {}; CLASSES.forEach(function (c) { chars[c.id] = { nick: "", hidden: false }; });
    return { v: 2, main: D.defaultMain, chosen: false, chars: chars, done: {}, lastDaily: 0, lastWeekly: 0, detail: false };
  }
  function sanitize(s) {
    var b = blank();
    if (!s || typeof s !== "object") return b;
    if (BY_ID[s.main]) b.main = s.main;
    b.chosen = !!s.chosen;
    b.detail = !!s.detail;
    if (s.chars && typeof s.chars === "object") CLASSES.forEach(function (c) {
      var x = s.chars[c.id]; if (!x) return;
      b.chars[c.id] = { nick: String(x.nick || "").slice(0, 24), hidden: !!x.hidden };
    });
    if (s.done && typeof s.done === "object") Object.keys(s.done).forEach(function (k) {
      var v = +s.done[k]; if (isFinite(v) && v > 0) b.done[k] = v;
    });
    b.lastDaily = +s.lastDaily || 0; b.lastWeekly = +s.lastWeekly || 0;
    b.chars[b.main].hidden = false;
    return b;
  }
  var state;
  try { state = sanitize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { state = blank(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function key(cls, id) { return cls + ":" + id; }
  function isDone(cls, it, now) {
    var t = state.done[key(cls, it.id)];
    return !!t && t >= boundaryFor(it.frequency, now || Date.now());
  }
  function prune() {
    var now = Date.now(), d = dailyBoundary(now), w = weeklyBoundary(now), changed = false;
    Object.keys(state.done).forEach(function (k) {
      var it = ITEM[k.split(":")[1]];
      if (!it || state.done[k] < boundaryFor(it.frequency, now)) { delete state.done[k]; changed = true; }
    });
    if (state.lastDaily !== d) { state.lastDaily = d; changed = true; }
    if (state.lastWeekly !== w) { state.lastWeekly = w; changed = true; }
    if (changed) save();
    return changed;
  }

  /* ---------- quem faz o quê ---------- */
  function expired(it) { return it.expires && todayBR() > it.expires; }
  function applies(it, cls) {
    if (expired(it)) return false;
    var isMain = cls === state.main;
    if (it.scope === "server" && !isMain) return false;
    if (it.appliesTo === "both") return true;
    return it.appliesTo === (isMain ? "main" : "alt");
  }
  function itemsFor(cls, freq) { return D.items.filter(function (i) { return i.frequency === freq && applies(i, cls); }); }
  function visibleChars() {
    var list = CLASSES.filter(function (c) { return !state.chars[c.id].hidden || c.id === state.main; });
    list.sort(function (a, b) { return (b.id === state.main) - (a.id === state.main); });
    return list;
  }
  function progress(cls, freq) {
    var req = itemsFor(cls, freq).filter(function (i) { return !i.optional; }), now = Date.now();
    return { done: req.filter(function (i) { return isDone(cls, i, now); }).length, total: req.length };
  }
  function label(cls) { return state.chars[cls].nick || BY_ID[cls].name; }
  function role(cls) { return cls === state.main ? "main" : "alt"; }

  /* ---------- DOM ---------- */
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null || v === false) return;
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function svgEl(tag, attrs, parent) {
    var n = document.createElementNS(SVG, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(n);
    return n;
  }

  /* Sigilos desenhados pra cada classe, num grid de 24. */
  var SIGIL = {
    gladiator: "M12 2.5 14 5v10h-4V5zM7 15h10M12 15v4.5M12 21.5h.01",
    templar: "M12 3 19 5.8V11c0 4.6-3 8-7 10-4-2-7-5.4-7-10V5.8zM12 8v8M9 11h6",
    assassin: "M5 3.5l8.5 9.5M19 3.5 10.5 13M11 15.5l2.5-2.5M13 15.5 10.5 13M8 18l1.8-1.8M16 18l-1.8-1.8M6.5 19.5 8 18M17.5 19.5 16 18",
    ranger: "M7 3c7 3.5 7 14.5 0 18M7 3v18M3.5 12h13M14 9.5l2.5 2.5-2.5 2.5",
    sorcerer: "M12 2.8c3.2 4 5.5 6.6 5.5 10.4a5.5 5.5 0 0 1-11 0c0-2.3 1.1-3.9 2.3-5 .1 2.1 1 3.3 2.2 3.5-.3-3.4.2-6 1-8.9z",
    spiritmaster: "M12 12a1.6 1.6 0 0 1 3.2 0 3.2 3.2 0 0 1-6.4 0 4.8 4.8 0 0 1 9.6 0A6.4 6.4 0 0 1 5.6 12M19.5 4.5l-.01.01M4.5 19.5h.01",
    cleric: "M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6",
    chanter: "M12 9v12M12 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M7.5 8c.8 2 2.5 3.3 4.5 3.3S15.7 10 16.5 8M6 12.5c1.2 2.4 3.4 3.8 6 3.8s4.8-1.4 6-3.8"
  };
  function sigil(cls) {
    var s = svgEl("svg", { viewBox: "0 0 24 24", class: "sigil", "aria-hidden": "true", style: "--tint: var(--c-" + cls + ")" });
    svgEl("path", { d: SIGIL[cls] }, s);
    return s;
  }
  function ring(done, total, center) {
    var r = 22, c = 2 * Math.PI * r, pct = total ? done / total : 0;
    var s = svgEl("svg", { viewBox: "0 0 52 52", width: "52", height: "52", "aria-hidden": "true" });
    svgEl("circle", { cx: "26", cy: "26", r: r, fill: "none", "stroke-width": "3", class: "ring-track" }, s);
    svgEl("circle", { cx: "26", cy: "26", r: r, fill: "none", "stroke-width": "3", class: "ring-fill", "stroke-linecap": pct > 0 ? "round" : "butt",
      "stroke-dasharray": c.toFixed(2), "stroke-dashoffset": (c * (1 - pct)).toFixed(2), transform: "rotate(-90 26 26)" }, s);
    return el("span", { class: "who-ring" + (total && done === total ? " full" : "") }, [s, center]);
  }
  function bar(done, total) {
    return el("div", { class: "bar", "aria-hidden": "true" }, [el("i", { style: "width:" + (total ? done / total * 100 : 0).toFixed(2) + "%" })]);
  }

  /* ---------- relógios ---------- */
  function dur(ms) {
    var m = Math.max(0, Math.floor(ms / 6e4)), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    if (d) return d + "d " + h + "h";
    if (h) return h + "h " + (mm < 10 ? "0" : "") + mm + "min";
    return mm + "min";
  }
  var WEEK = ["qua", "qui", "sex", "sáb", "dom", "seg", "ter"];
  function renderWeek(now) {
    var idx = Math.floor((dailyBoundary(now) - weeklyBoundary(now)) / DAY), ol = $("#week");
    if (ol.dataset.i === String(idx)) return;
    ol.dataset.i = String(idx);
    ol.replaceChildren.apply(ol, WEEK.map(function (d, i) { return el("li", { class: i < idx ? "past" : i === idx ? "today" : null, text: d }); }));
  }
  function tick() {
    var now = Date.now();
    var nd = dailyBoundary(now) + DAY, nw = weeklyBoundary(now) + 7 * DAY;
    var dc = $("#dailyCount"), wc = $("#weeklyCount"), dt = dur(nd - now), wt = dur(nw - now);
    if (dc.textContent !== dt) dc.textContent = dt;
    if (wc.textContent !== wt) wc.textContent = wt;
    renderWeek(now);
    if (state.lastDaily !== dailyBoundary(now) || state.lastWeekly !== weeklyBoundary(now)) { prune(); renderAll(); toast("Reset aplicado"); }
  }

  /* ---------- checklist ---------- */
  var selected = null;
  function renderFinding() {
    var chars = visibleChars(), dl = 0, wl = 0, worst = null, worstLeft = 0;
    chars.forEach(function (c) {
      var a = progress(c.id, "daily"), b = progress(c.id, "weekly"), left = a.total - a.done;
      dl += left; wl += b.total - b.done;
      if (left > worstLeft) { worst = c.id; worstLeft = left; }
    });
    var n = chars.length, p = $("#finding"), who = n === 1 ? "no main" : "nos " + n + " personagens";
    if (!dl && !wl) { p.textContent = "Tudo feito " + who + ". Agora é esperar o reset."; return; }
    var parts = [];
    if (dl) parts.push(el("b", { text: dl + (dl === 1 ? " diária" : " diárias") }));
    if (dl && wl) parts.push(" e ");
    if (wl) parts.push(el("b", { text: wl + (wl === 1 ? " semanal" : " semanais") }));
    var kids = [dl + wl === 1 ? "Falta " : "Faltam "].concat(parts, [" " + who + "."]);
    if (!dl) kids.push(" Diárias zeradas.");
    else if (n > 1) kids.push(" Mais atrasado hoje: " + label(worst) + ", com " + worstLeft + (worstLeft === 1 ? " pendente." : " pendentes."));
    p.replaceChildren.apply(p, kids);
  }
  function renderRoster() {
    var ol = $("#roster"); ol.replaceChildren();
    visibleChars().forEach(function (c) {
      var a = progress(c.id, "daily"), b = progress(c.id, "weekly"), isMain = c.id === state.main;
      var nick = state.chars[c.id].nick;
      ol.appendChild(el("li", null, [el("button", {
        class: "who", type: "button", "aria-pressed": c.id === selected ? "true" : "false",
        "aria-label": label(c.id) + (nick ? ", " + c.name : "") + ", " + role(c.id) + ". Diárias " + a.done + " de " + a.total + ", semanais " + b.done + " de " + b.total,
        onclick: function () { select(c.id, true); }
      }, [
        ring(a.done, a.total, sigil(c.id)),
        el("span", { class: "who-day" }, [el("b", { class: "num", text: a.done + "/" + a.total }), el("span", { text: "diárias" })]),
        el("span", { class: "who-text" }, [
          el("span", { class: "who-name", text: label(c.id) }),
          el("span", { class: "who-meta" }, isMain ? [el("b", { text: "main" }), nick ? " · " + c.name : ""] : [nick ? "alt · " + c.name : "alt"])
        ]),
        el("span", { class: "who-week" }, [bar(b.done, b.total), el("span", { class: "num", text: b.done + "/" + b.total })]),
        el("span", { class: "who-mini num", text: a.done + "/" + a.total + " · " + b.done + "/" + b.total })
      ])]));
    });
  }
  var SCOPE_TAG = { server: "por servidor", account: "por conta" };
  function tags(it, isMain) {
    var t = [];
    if (it.conflict) t.push(el("span", { class: "pill warn", text: "varia" }));
    if (it.optional) t.push(el("span", { class: "pill", text: "opcional" }));
    if (it.expires) t.push(el("span", { class: "pill", text: "até " + shortDate(it.expires) }));
    if (SCOPE_TAG[it.scope] && isMain) t.push(el("span", { class: "pill", text: SCOPE_TAG[it.scope] }));
    return t;
  }
  function moreBody(it) {
    var kids = [el("p", { text: it.description })];
    if (it.conflict) kids.push(el("p", { class: "warn" }, [el("b", { text: "Varia entre fontes: " }), it.conflict]));
    if (it.notes) kids.push(el("p", { text: it.notes }));
    if (it.sources && it.sources.length) kids.push(el("p", { class: "srcs" }, it.sources.map(function (s) {
      return el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.label });
    })));
    return kids;
  }
  function taskRow(it, cls) {
    var id = "c-" + cls + "-" + it.id, done = isDone(cls, it), moreId = "m-" + id;
    var more = el("div", { class: "task-more", id: moreId, hidden: !state.detail }, moreBody(it));
    var li = el("li", { class: "task" + (done ? " done" : "") }, [
      el("div", { class: "task-line" }, [
        el("input", { type: "checkbox", class: "check", id: id, checked: done,
          onchange: function (e) {
            if (e.target.checked) state.done[key(cls, it.id)] = Date.now(); else delete state.done[key(cls, it.id)];
            save(); li.classList.toggle("done", e.target.checked); refreshCounts();
          } }),
        el("label", { for: id, class: "task-name", text: it.name }),
        el("span", { class: "tags" }, tags(it, cls === state.main)),
        el("button", { type: "button", class: "more", "aria-expanded": state.detail ? "true" : "false", "aria-controls": moreId,
          "aria-label": "Detalhes: " + it.name,
          onclick: function (e) { var o = more.hidden; more.hidden = !o; e.currentTarget.setAttribute("aria-expanded", o ? "true" : "false"); } })
      ]),
      more
    ]);
    return li;
  }
  function groupHead(freq) {
    var p = progress(selected, freq);
    return [el("h3", { text: freq === "daily" ? "Diárias" : "Semanais" }), bar(p.done, p.total),
      el("span", { class: "count num" }, [el("b", { text: String(p.done) }), " de " + p.total])];
  }
  function refreshCounts() {
    $$(".group[data-freq]").forEach(function (g) { $(".group-head", g).replaceChildren.apply($(".group-head", g), groupHead(g.dataset.freq)); });
    renderRoster(); renderFinding();
  }
  function renderPanel() {
    var c = BY_ID[selected], isMain = c.id === state.main, p = $("#panel"), nick = state.chars[c.id].nick;
    var seg = el("div", { class: "segmented", role: "group", "aria-label": "Mostrar descrições" }, [
      el("button", { type: "button", "aria-pressed": state.detail ? "false" : "true", text: "Compacto", onclick: function () { setDetail(false); } }),
      el("button", { type: "button", "aria-pressed": state.detail ? "true" : "false", text: "Detalhes", onclick: function () { setDetail(true); } })
    ]);
    var kids = [
      el("header", { class: "char-head" }, [
        sigil(c.id),
        el("div", { class: "char-title" }, [
          el("h2", { id: "t-char" }, [label(c.id), el("span", { class: "pill" + (isMain ? " main" : ""), text: role(c.id) })]),
          el("p", { text: (nick ? c.name + " · " : "") + (isMain ? "Tarefas de servidor ficam aqui." : "Só o que é por personagem.") })
        ]),
        el("div", { class: "char-tools" }, [seg, el("button", { class: "btn small", type: "button", text: "Desmarcar",
          "aria-label": "Desmarcar diárias e semanais de " + label(c.id),
          onclick: function () {
            Object.keys(state.done).forEach(function (k) {
              var it = ITEM[k.split(":")[1]];
              if (k.indexOf(c.id + ":") === 0 && it && (it.frequency === "daily" || it.frequency === "weekly")) delete state.done[k];
            });
            save(); renderAll(); toast(label(c.id) + " desmarcado");
          } })])
      ])
    ];
    if (!isMain) kids.push(el("p", { class: "char-note", text: D.altSummary }));
    ["daily", "weekly"].forEach(function (f) {
      var list = itemsFor(c.id, f).sort(function (a, b) { return a.optional - b.optional; });
      kids.push(el("div", { class: "group", "data-freq": f }, [
        el("div", { class: "group-head" }, groupHead(f)),
        list.length ? el("ul", { class: "tasks" }, list.map(function (it) { return taskRow(it, c.id); }))
          : el("p", { class: "group-empty", text: "Nada aqui pra esse personagem." })
      ]));
    });
    p.replaceChildren.apply(p, kids);
  }
  function setDetail(on) {
    state.detail = on; save();
    $$("#panel .task-more").forEach(function (m) { m.hidden = !on; });
    $$("#panel .more").forEach(function (b) { b.setAttribute("aria-expanded", on ? "true" : "false"); });
    $$("#panel .segmented button").forEach(function (b, i) { b.setAttribute("aria-pressed", (i === 1) === on ? "true" : "false"); });
  }
  function select(cls, scroll) {
    selected = cls; renderRoster(); renderPanel();
    if (scroll && window.matchMedia("(max-width: 900px)").matches) $("#panel").scrollIntoView({ block: "start", behavior: "smooth" });
  }

  /* ---------- datas e lembretes ---------- */
  function upcoming() {
    return D.events.filter(function (e) { return daysUntil(e.date) >= 0; }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }
  function dateRow(e) {
    var n = daysUntil(e.date);
    return el("li", null, [
      el("span", { class: "d-when num", text: shortDate(e.date) }),
      el("span", { class: "d-what" }, [el("b", { text: e.title }), el("span", { text: e.detail })]),
      n <= 3 ? el("span", { class: "pill warn", text: n === 0 ? "hoje" : n === 1 ? "amanhã" : "em " + n + " dias" })
        : el("span", { class: "d-left num", text: "em " + n + " dias" })
    ]);
  }
  function fillDates(ol, list) {
    ol.replaceChildren();
    list.forEach(function (e) { ol.appendChild(dateRow(e)); });
    if (!list.length) ol.appendChild(el("li", null, [el("span", { class: "d-when", text: "—" }), el("span", { class: "d-what" }, [el("b", { text: "Nenhuma data pela frente." })])]));
  }
  function renderDates() {
    var up = upcoming();
    fillDates($("#datesSoon"), up.slice(0, 4));
    $("#allDates").textContent = up.length > 4 ? "Ver todas (" + up.length + ")" : "Ver lembretes";
    fillDates($("#dates"), up);
    var S = D.schedule;
    $("#sched").replaceChildren.apply($("#sched"), S.rows.reduce(function (a, r) { a.push(el("dt", { text: r.when }), el("dd", { text: r.what })); return a; }, []));
    $("#schedNote").textContent = S.note;
  }
  function renderRemSummary() {
    var ol = $("#remSoon"); ol.replaceChildren();
    var rows = D.items.filter(function (i) { return i.frequency === "recurring" && !expired(i); }).map(function (it) {
      var chars = visibleChars().filter(function (c) { return applies(it, c.id); });
      return { it: it, total: chars.length, done: chars.filter(function (c) { return isDone(c.id, it); }).length };
    }).filter(function (r) { return r.total; });
    var open = rows.filter(function (r) { return r.done < r.total; });
    open.slice(0, 5).forEach(function (r) {
      ol.appendChild(el("li", null, [el("span", { class: "rs-name", text: r.it.name.split(" — ")[0] }),
        el("span", { class: "rs-count num" }, [el("b", { text: String(r.done) }), " de " + r.total])]));
    });
    if (!open.length) ol.appendChild(el("li", null, [el("span", { class: "rs-name", text: "Tudo em dia nesta semana." })]));
    $("#remSoonMeta").textContent = open.length + " de " + rows.length + " pendentes";
  }
  function renderReminders() {
    function remList(sel, freq) {
      var ul = $(sel); ul.replaceChildren();
      D.items.filter(function (i) { return i.frequency === freq && !expired(i); }).forEach(function (it) {
        var chars = visibleChars().filter(function (c) { return applies(it, c.id); });
        if (!chars.length) return;
        var count = el("span", { class: "rem-count num" });
        function setCount() {
          var d = chars.filter(function (c) { return isDone(c.id, it); }).length;
          count.replaceChildren(el("b", { text: String(d) }), " de " + chars.length);
        }
        setCount();
        var kids = [
          el("div", { class: "rem-top" }, [el("h3", { text: it.name })].concat(tags(it, false), [count])),
          el("p", { class: "rem-desc", text: it.description })
        ];
        if (it.conflict) kids.push(el("p", { class: "rem-desc warn", text: "Varia entre fontes: " + it.conflict }));
        if (it.notes) kids.push(el("p", { class: "rem-desc", text: it.notes }));
        kids.push(el("div", { class: "chips", role: "group", "aria-label": "Feito em: " + it.name }, chars.map(function (c) {
          var on = isDone(c.id, it);
          return el("button", { type: "button", class: "chip", "aria-pressed": on ? "true" : "false",
            title: on ? "Marcado em " + fmtStamp.format(new Date(state.done[key(c.id, it.id)])) : "Marcar " + label(c.id),
            onclick: function (e) {
              var k = key(c.id, it.id), b = e.currentTarget;
              if (isDone(c.id, it)) delete state.done[k]; else state.done[k] = Date.now();
              save(); b.setAttribute("aria-pressed", isDone(c.id, it) ? "true" : "false"); setCount(); renderRemSummary();
            } }, [sigil(c.id), label(c.id)]);
        })));
        if (it.sources && it.sources.length) kids.push(el("details", null, [el("summary", { text: "Fontes (" + it.sources.length + ")" }),
          el("p", { class: "srcs" }, it.sources.map(function (s) { return el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.label }); }))]));
        ul.appendChild(el("li", { class: "rem" }, kids));
      });
    }
    remList("#remRecurring", "recurring");
    remList("#remOneoff", "one-off");
  }

  /* ---------- ajustes ---------- */
  function classPick(fs, name, onPick) {
    fs.replaceChildren(el("legend", { class: "vh", text: "Classe do main" }));
    CLASSES.forEach(function (c) {
      fs.appendChild(el("label", { class: "cp" }, [
        el("input", { type: "radio", name: name, value: c.id, checked: c.id === state.main, onchange: onPick ? function () { onPick(c.id); } : null }),
        sigil(c.id), el("span", { text: c.name })
      ]));
    });
  }
  function renderSettings() {
    classPick($("#mainPick"), "mainSel", function (id) { setMain(id); toast(BY_ID[id].name + " agora é o main"); });
    var t = $("#charTable"); t.replaceChildren();
    CLASSES.forEach(function (c) {
      var ch = state.chars[c.id], isMain = c.id === state.main;
      t.appendChild(el("li", null, [
        el("span", { class: "ct-class" }, [sigil(c.id), c.name]),
        el("input", { class: "input", type: "text", maxlength: "24", placeholder: "Apelido", value: ch.nick, "aria-label": "Apelido do " + c.name,
          onchange: function (e) { ch.nick = e.target.value.trim().slice(0, 24); save(); renderAll(); toast("Salvo"); } }),
        el("label", { class: "show" }, [isMain ? "main" : "mostrar",
          el("input", { type: "checkbox", class: "switch", checked: !ch.hidden || isMain, disabled: isMain,
            "aria-label": isMain ? c.name + " é o main e sempre aparece" : "Mostrar " + c.name,
            onchange: function (e) { ch.hidden = !e.target.checked; save(); if (ch.hidden && selected === c.id) selected = state.main; renderAll(); } })])
      ]));
    });
    $("#lastReset").textContent = "Último reset: diário em " + fmtStamp.format(new Date(state.lastDaily)) + ", semanal em " + fmtStamp.format(new Date(state.lastWeekly)) + " (Brasília).";
  }
  function setMain(cls) {
    state.main = cls; state.chars[cls].hidden = false; state.chosen = true; save();
    selected = cls; renderAll();
  }
  function renderChip() {
    var m = state.main;
    $("#mainChip").replaceChildren(sigil(m), el("span", { class: "lbl", text: "Main:" }), el("b", { text: label(m) }));
    $("#mainChip").setAttribute("aria-label", "Main: " + label(m) + ". Trocar em Ajustes");
  }
  function renderAll() {
    if (!selected || !visibleChars().some(function (c) { return c.id === selected; })) selected = state.main;
    renderChip(); renderFinding(); renderRoster(); renderPanel(); renderDates(); renderRemSummary(); renderReminders(); renderSettings(); tick();
  }

  /* ---------- rotas ---------- */
  var ROUTES = { "": "hoje", lembretes: "lembretes", ajustes: "ajustes" };
  var TITLES = { hoje: "Checklist", lembretes: "Lembretes", ajustes: "Ajustes" };
  function route(focus) {
    var h = location.hash;
    if (h && h.indexOf("#/") !== 0) return;
    var v = ROUTES[h.slice(2)] || "hoje";
    $$(".view").forEach(function (s) { s.hidden = s.dataset.view !== v; });
    $$("[data-for]").forEach(function (s) { s.hidden = s.dataset.for !== v; });
    $("#pageTitle").textContent = TITLES[v];
    $$("#nav a").forEach(function (a) { if (a.dataset.route === v) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = (v === "hoje" ? "" : TITLES[v] + " · ") + "Aion 2 Checklist";
    if (focus) { window.scrollTo(0, 0); $("#conteudo").focus({ preventScroll: true }); }
  }
  window.addEventListener("hashchange", function () { route(true); });

  /* ---------- ações ---------- */
  var tt;
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove("on"); }, 2200); }
  $$("[data-reset]").forEach(function (b) {
    b.addEventListener("click", function () {
      var kind = b.dataset.reset;
      var msg = { daily: "Desmarcar todas as diárias?", weekly: "Desmarcar todas as semanais e os lembretes recorrentes?", all: "Apagar todas as marcações, inclusive as de uma vez só? Main e apelidos ficam." }[kind];
      if (!confirm(msg)) return;
      Object.keys(state.done).forEach(function (k) {
        var it = ITEM[k.split(":")[1]], f = it ? it.frequency : "";
        if (kind === "all" || (kind === "daily" && f === "daily") || (kind === "weekly" && (f === "weekly" || f === "recurring"))) delete state.done[k];
      });
      save(); renderAll(); toast("Zerado");
    });
  });
  $("#exportBtn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({ app: "aion2-rotina", exportedAt: new Date().toISOString(), state: state }, null, 2)], { type: "application/json" });
    var a = el("a", { href: URL.createObjectURL(blob), download: "aion2-checklist-" + todayBR() + ".json" });
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
  $("#importFile").addEventListener("change", function (e) {
    var f = e.target.files[0]; if (!f) return;
    f.text().then(function (txt) {
      var j = JSON.parse(txt), s = j && j.state ? j.state : j;
      if (!s || !s.chars || !s.done) throw new Error("formato");
      state = sanitize(s); state.chosen = true; prune(); save(); renderAll(); toast("Progresso importado");
    }).catch(function () { toast("Esse arquivo não serve"); }).then(function () { e.target.value = ""; });
  });
  window.addEventListener("scroll", function () { $("#top").classList.toggle("scrolled", window.scrollY > 4); }, { passive: true });
  window.addEventListener("storage", function (e) { if (e.key === KEY) { try { state = sanitize(JSON.parse(e.newValue)); } catch (x) {} renderAll(); } });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { if (prune()) renderAll(); else tick(); } });

  /* ---------- primeira visita ---------- */
  function openChooser() {
    var fs = $("#classPick"), dlg = $("#chooser");
    classPick(fs, "pick");
    dlg.addEventListener("close", function () {
      var v = ($("input[name=pick]:checked", fs) || {}).value || D.defaultMain; setMain(v);
    }, { once: true });
    if (dlg.showModal) { dlg.showModal(); var ck = $("input[name=pick]:checked", fs); if (ck) ck.focus(); } else setMain(D.defaultMain);
  }

  /* ---------- início ---------- */
  $("#dailyWhen").textContent = D.reset.dailyLabel + " (Brasília)";
  $("#dataUpdated").textContent = D.updated.split("-").reverse().join("/");
  prune(); renderAll(); route(false);
  setInterval(tick, 1000);
  if (!state.chosen) openChooser();
})();
