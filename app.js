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
  function bar(done, total) {
    return el("span", { class: "bar", "aria-hidden": "true" }, [el("i", { style: "width:" + (total ? done / total * 100 : 0).toFixed(2) + "%" })]);
  }
  /* "Duty — 5 missões" vira nome + complemento em cinza */
  function nameParts(name) {
    var i = name.indexOf(" — ");
    return i < 0 ? [name, ""] : [name.slice(0, i), name.slice(i + 3)];
  }
  function srcLinks(it) {
    return el("p", { class: "srcs" }, ["Fontes: "].concat(it.sources.reduce(function (a, s, i) {
      if (i) a.push(" · ");
      a.push(el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.label }));
      return a;
    }, [])));
  }
  function detailBody(it, cls) {
    var kids = [el("p", { text: it.description })];
    if (it.conflict) kids.push(el("p", null, [el("b", { text: "Varia entre fontes. " }), it.conflict]));
    if (it.notes) kids.push(el("p", { text: it.notes }));
    if (cls && it.scope === "server") kids.push(el("p", { class: "faint", text: "Limite por servidor, por isso só aparece no main." }));
    if (it.scope === "account") kids.push(el("p", { class: "faint", text: "Vale pra conta inteira." }));
    if (it.sources && it.sources.length) kids.push(srcLinks(it));
    return kids;
  }

  /* ---------- relógios ---------- */
  function dur(ms) {
    var m = Math.max(0, Math.floor(ms / 6e4)), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    if (d) return d + "d " + h + "h";
    if (h) return h + "h " + (mm < 10 ? "0" : "") + mm + "min";
    return mm + "min";
  }
  function tick() {
    var now = Date.now();
    var nd = dailyBoundary(now) + DAY, nw = weeklyBoundary(now) + 7 * DAY;
    var dc = $("#dailyCount"), wc = $("#weeklyCount"), dt = dur(nd - now), wt = dur(nw - now);
    if (dc.textContent !== dt) dc.textContent = dt;
    if (wc.textContent !== wt) wc.textContent = wt;
    if (state.lastDaily !== dailyBoundary(now) || state.lastWeekly !== weeklyBoundary(now)) { prune(); renderAll(); toast("Reset aplicado"); }
  }

  /* ---------- checklist ---------- */
  var selected = null;
  function renderFinding() {
    var dl = 0, wl = 0;
    visibleChars().forEach(function (c) {
      var a = progress(c.id, "daily"), b = progress(c.id, "weekly");
      dl += a.total - a.done; wl += b.total - b.done;
    });
    var p = $("#finding");
    if (!dl && !wl) { p.textContent = "Tudo feito. Agora é esperar o reset."; return; }
    if (!dl) { p.replaceChildren("Diárias feitas. Faltam ", el("b", { text: wl + (wl === 1 ? " semanal" : " semanais") }), "."); return; }
    var kids = [dl + wl === 1 ? "Falta " : "Faltam ", el("b", { text: dl + (dl === 1 ? " diária" : " diárias") })];
    if (wl) kids.push(" e ", el("b", { text: wl + (wl === 1 ? " semanal" : " semanais") }));
    kids.push(visibleChars().length > 1 ? " no total." : ".");
    p.replaceChildren.apply(p, kids);
  }
  function metaOf(cls) {
    var nick = state.chars[cls].nick;
    return (nick ? BY_ID[cls].name + " · " : "") + role(cls);
  }
  function renderRoster() {
    var ol = $("#roster"); ol.replaceChildren();
    visibleChars().forEach(function (c) {
      var a = progress(c.id, "daily"), b = progress(c.id, "weekly");
      ol.appendChild(el("li", null, [el("button", {
        class: "who" + (a.total && a.done === a.total ? " full" : ""), type: "button", "aria-pressed": c.id === selected ? "true" : "false",
        "aria-label": label(c.id) + ", " + metaOf(c.id) + ". Diárias " + a.done + " de " + a.total + ", semanais " + b.done + " de " + b.total,
        onclick: function () { select(c.id, true); }
      }, [
        el("span", { class: "who-top" }, [el("span", { class: "who-name", text: label(c.id) }), el("span", { class: "who-count num", text: a.done + "/" + a.total })]),
        el("span", { class: "who-meta", text: metaOf(c.id) }),
        bar(a.done, a.total)
      ])]));
    });
  }
  function taskRow(it, cls) {
    var id = "c-" + cls + "-" + it.id, done = isDone(cls, it), moreId = "m-" + id, np = nameParts(it.name);
    var meta = [it.optional ? "opcional" : "", it.expires ? "até " + shortDate(it.expires) : ""].filter(Boolean).join(" · ");
    var more = el("div", { class: "task-more", id: moreId, hidden: true }, detailBody(it, cls));
    var li = el("li", { class: "task" + (done ? " done" : "") + (it.optional ? " opt" : "") }, [
      el("div", { class: "task-line" }, [
        el("input", { type: "checkbox", class: "check", id: id, checked: done,
          onchange: function (e) {
            if (e.target.checked) state.done[key(cls, it.id)] = Date.now(); else delete state.done[key(cls, it.id)];
            save(); li.classList.toggle("done", e.target.checked); refreshCounts();
          } }),
        el("label", { for: id, class: "task-name" }, [np[0], np[1] ? el("span", { class: "task-sub", text: np[1] }) : null]),
        el("span", { class: "task-meta", text: meta }),
        el("button", { type: "button", class: "more", "aria-expanded": "false", "aria-controls": moreId,
          "aria-label": "Detalhes de " + np[0],
          onclick: function (e) { var o = more.hidden; more.hidden = !o; e.currentTarget.setAttribute("aria-expanded", o ? "true" : "false"); } })
      ]),
      more
    ]);
    return li;
  }
  function groupCount(freq) {
    var p = progress(selected, freq);
    return p.done + " de " + p.total;
  }
  function refreshCounts() {
    $$(".group[data-freq]").forEach(function (g) { $(".count", g).textContent = groupCount(g.dataset.freq); });
    renderRoster(); renderFinding();
  }
  function renderPanel() {
    var c = BY_ID[selected], isMain = c.id === state.main, p = $("#panel");
    var kids = [
      el("header", { class: "char-head" }, [
        el("div", null, [el("h2", { id: "t-char", text: label(c.id) }), el("p", { text: metaOf(c.id) })]),
        el("button", { class: "btn ghost", type: "button", text: "Desmarcar",
          "aria-label": "Desmarcar diárias e semanais de " + label(c.id),
          onclick: function () {
            Object.keys(state.done).forEach(function (k) {
              var it = ITEM[k.split(":")[1]];
              if (k.indexOf(c.id + ":") === 0 && it && (it.frequency === "daily" || it.frequency === "weekly")) delete state.done[k];
            });
            save(); renderAll(); toast(label(c.id) + " desmarcado");
          } })
      ])
    ];
    ["daily", "weekly"].forEach(function (f) {
      var list = itemsFor(c.id, f).sort(function (a, b) { return a.optional - b.optional; });
      kids.push(el("section", { class: "group", "data-freq": f, "aria-labelledby": "g-" + f }, [
        el("header", { class: "group-head" }, [el("h3", { id: "g-" + f, text: f === "daily" ? "Diárias" : "Semanais" }), el("span", { class: "count num", text: groupCount(f) })]),
        list.length ? el("ul", { class: "tasks" }, list.map(function (it) { return taskRow(it, c.id); }))
          : el("p", { class: "empty", text: "Nada aqui pra esse personagem." })
      ]));
    });
    if (!isMain) kids.push(el("details", { class: "tip" }, [el("summary", { text: "Quanto tempo leva uma alt" }), el("p", { text: D.altSummary })]));
    p.replaceChildren.apply(p, kids);
  }
  function select(cls, scroll) {
    selected = cls; renderRoster(); renderPanel();
    if (scroll && window.matchMedia("(max-width: 900px)").matches) $("#panel").scrollIntoView({ block: "start", behavior: "smooth" });
  }

  /* ---------- datas e lembretes ---------- */
  function upcoming() {
    return D.events.filter(function (e) { return daysUntil(e.date) >= 0; }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }
  function dateRow(e, withDetail) {
    var n = daysUntil(e.date);
    return el("li", { class: n <= 3 ? "soon" : null }, [
      el("span", { class: "d-what" }, [el("b", { text: e.title }), withDetail ? el("span", { text: e.detail }) : null]),
      el("span", { class: "d-when num", text: n === 0 ? "hoje" : n === 1 ? "amanhã" : n <= 6 ? "em " + n + " dias" : shortDate(e.date) })
    ]);
  }
  function fillDates(ol, list, withDetail) {
    ol.replaceChildren();
    list.forEach(function (e) { ol.appendChild(dateRow(e, withDetail)); });
    if (!list.length) ol.appendChild(el("li", null, [el("span", { class: "d-what" }, [el("b", { text: "Nenhuma data pela frente." })])]));
  }
  function renderDates() {
    var up = upcoming();
    fillDates($("#datesSoon"), up.slice(0, 3), false);
    $("#allDates").textContent = up.length > 3 ? "Ver as " + up.length + " datas" : "Ver lembretes";
    fillDates($("#dates"), up, true);
    var S = D.schedule;
    $("#sched").replaceChildren.apply($("#sched"), S.rows.reduce(function (a, r) { a.push(el("dt", { text: r.what }), el("dd", { text: r.when })); return a; }, []));
    $("#schedNote").textContent = S.note;
  }
  function renderReminders() {
    function remList(sel, freq) {
      var ul = $(sel); ul.replaceChildren();
      D.items.filter(function (i) { return i.frequency === freq && !expired(i); }).forEach(function (it) {
        var chars = visibleChars().filter(function (c) { return applies(it, c.id); });
        if (!chars.length) return;
        var np = nameParts(it.name), count = el("span", { class: "count num" }), li = el("li", { class: "rem" });
        function setCount() {
          var d = chars.filter(function (c) { return isDone(c.id, it); }).length;
          count.textContent = chars.length === 1 ? (d ? "feito" : "pendente") : d + " de " + chars.length;
          li.classList.toggle("done", d === chars.length);
        }
        setCount();
        var marks = el("ul", { class: "marks", "aria-label": "Feito em" }, chars.map(function (c) {
          var id = "r-" + c.id + "-" + it.id;
          return el("li", null, [
            el("input", { type: "checkbox", class: "check", id: id, checked: isDone(c.id, it),
              onchange: function (e) {
                var k = key(c.id, it.id);
                if (e.target.checked) state.done[k] = Date.now(); else delete state.done[k];
                save(); setCount();
              } }),
            el("label", { for: id, text: label(c.id) })
          ]);
        }));
        li.appendChild(el("details", null, [
          el("summary", null, [el("span", { class: "rem-name" }, [np[0], np[1] ? el("span", { class: "task-sub", text: np[1] }) : null]), count]),
          el("div", { class: "rem-body" }, [marks].concat(detailBody(it, null)))
        ]));
        ul.appendChild(li);
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
        el("span", { text: c.name })
      ]));
    });
  }
  function renderSettings() {
    classPick($("#mainPick"), "mainSel", function (id) { setMain(id); toast(BY_ID[id].name + " agora é o main"); });
    var t = $("#charTable"); t.replaceChildren();
    CLASSES.forEach(function (c) {
      var ch = state.chars[c.id], isMain = c.id === state.main;
      t.appendChild(el("li", null, [
        el("span", { class: "ct-class", text: c.name }),
        el("input", { class: "input", type: "text", maxlength: "24", placeholder: "Apelido", value: ch.nick, "aria-label": "Apelido do " + c.name,
          onchange: function (e) { ch.nick = e.target.value.trim().slice(0, 24); save(); renderAll(); toast("Salvo"); } }),
        isMain ? el("span", { class: "ct-main", text: "main" })
          : el("input", { type: "checkbox", class: "switch", checked: !ch.hidden, "aria-label": "Mostrar " + c.name,
            onchange: function (e) { ch.hidden = !e.target.checked; save(); if (ch.hidden && selected === c.id) selected = state.main; renderAll(); } })
      ]));
    });
    $("#lastReset").textContent = "Último reset: diário em " + fmtStamp.format(new Date(state.lastDaily)) + ", semanal em " + fmtStamp.format(new Date(state.lastWeekly)) + ".";
  }
  function setMain(cls) {
    state.main = cls; state.chars[cls].hidden = false; state.chosen = true; save();
    selected = cls; renderAll();
  }
  function renderAll() {
    if (!selected || !visibleChars().some(function (c) { return c.id === selected; })) selected = state.main;
    renderFinding(); renderRoster(); renderPanel(); renderDates(); renderReminders(); renderSettings(); tick();
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
  $("#dailyCount").title = D.reset.dailyLabel + ", horário de Brasília";
  $("#weeklyCount").title = D.reset.weeklyLabel + ", horário de Brasília";
  $("#dataUpdated").textContent = D.updated.split("-").reverse().join("/");
  prune(); renderAll(); route(false);
  setInterval(tick, 1000);
  if (!state.chosen) openChooser();
})();
