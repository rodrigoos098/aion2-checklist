"""Gera ../data.js a partir de ../pesquisa/checklist.json.

Rodar da raiz do repo:  python3 tools/build_data.py

Ordem: carrega a pesquisa, aplica as correções conferidas nos vídeos (CORR), adiciona itens
que faltavam (NEW) e por fim troca nomes e textos pela versão revisada (TEXTOS). Se editar
data.js na mão, passe a mudança pra cá também, senão ela some na próxima geração.
"""
import json
import pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = json.load(open(root / "pesquisa" / "checklist.json", encoding="utf-8"))
meta = src["meta"]

vid_names = {
    "wbD-bTHReQQ": "TheWhelps · conteúdo", "nAloWmvAodU": "TheWhelps · alts",
    "B6wHEcb1HD0": "TheWhelps · duty", "sU3heVsRb5o": "TheWhelps · guia",
    "5klnmd6NXYU": "TheWhelps · global", "t8nVij7qHwc": "TheWhelps · patch 21/10",
    "B5_DMcXlzwk": "TheWhelps · GS 1400", "u3Wb6tH0mZs": "TheWhelps · GS 2100",
    "C_MpiwBEoJo": "TheWhelps · GS 3000",
}
site_names = {"onlyfarms": "OnlyFarms", "viki": "vi.ki", "grimvane": "Grimvane", "odyle": "odyle.net",
              "wikily": "Wikily", "tgw": "TheGamesWiki"}

# Correções de dados conferidas nos vídeos de alts (nAloWmvAodU) e de conteúdo (wbD-bTHReQQ), 28/10.
CORR = {
    "dungeon_runs": {"conflict": None},
    "supply_request": {"optional": True},
}

NEW = [{
    "id": "rift_dominion", "name": "", "frequency": "weekly", "applies_to": "both",
    "limit_scope": "character", "category": "pvp", "optional": False, "description_ptbr": "",
    "sources": [{"type": "video", "video_id": "wbD-bTHReQQ", "timestamp": "", "url": "https://youtu.be/wbD-bTHReQQ"}],
}]

# Nome, descrição e notas de cada item. Os números seguem a pesquisa + correções acima.
TEXTOS = {
    "duty": {
        "name": "Duty — 5 missões",
        "description": "Journal > Duty. O limite é por servidor, então faz só no main. Reroll é barato: tenta puxar Hidden Cube Key, chave Shugo, ticket de Nightmare e Odyle Energy nos 2 primeiros slots (100% e 50%). Passou de uns 6 rerolls, não compensa.",
    },
    "supply_request": {
        "name": "Supply Requests",
        "description": "Por personagem. Emergency (diário) vai até 66 e o semanal até 6. Entrega só o que já tiver na bag, não vale farmar pra isso.",
        "notes": "Um trecho do vídeo (00:53–01:23) não foi transcrito, deve ser sobre preço. O limite por personagem vem do resumo do TheWhelps (18:49).",
    },
    "odyle_energy": {
        "name": "Odyle Energy — não deixar no cap",
        "description": "A natural regenera 15 a cada 3h por personagem e trava em 840. Não deixa encostar no cap. Cada cubo de Expedition/Transcendence gasta 40. A extra (dos itens bound) fica num contador separado.",
        "conflict": "Grimvane e TheGamesWiki falam em cap 560 sem sub e 840 com sub.",
    },
    "nightmare": {
        "name": "Nightmare — 2 tickets/dia (máx 14)",
        "description": "Por personagem: ganha 2 por dia e acumula até 14. Sobe cada boss até o nível 10 pra liberar o próximo (tem recompensa de first clear); depois dá pra usar o ticket de clear instantâneo. Na alt, os pontos de Nightmare vão pra skin.",
        "notes": "Pode deixar acumular até 14, mas não passa disso: entra pelo menos uma vez a cada 7 dias.",
    },
    "shugo_keys": {
        "name": "Shugo Festival — chaves (2/dia, máx 14)",
        "description": "Minigame toda hora cheia. Ganha 2 chaves por dia e acumula até 14, contado por servidor. Não deixa no cap. A recompensa vira Centuryroot Tokens pra loja Shugo.",
        "conflict": "Tem fonte dizendo outra coisa: odyle.net (global) fala em 3/dia com cap 12 (21 com sub) e o Grimvane cita também um contador por personagem (4/dia, cap 28).",
    },
    "dimensional_invasion": {
        "name": "Dimensional Invasion — chaves (1/dia, máx 7)",
        "description": "Evento rápido (~2 min) que abre aos :30 em algumas horas. A chave da recompensa é 1 por dia, acumula até 7 e é do servidor.",
    },
    "login_events": {
        "name": "Login dos eventos",
        "description": "Loga em cada personagem que está nos eventos: Odyle Energy Boost (28/out a 11/nov, a Odyle chega por correio e expira em 7 dias), presença do Trick or Treat (até 04/nov) e a missão de login do Daeva Pass.",
        "conflict": "Odyle Boost: o TheWhelps (27/out) fala em 4 por dia, o Grimvane em 2.",
    },
    "field_bosses": {
        "name": "Field / Abyss bosses (Kaira, Argo, Nahma)",
        "description": "Se estiver on, cola. Kaira a cada 3h, Nahma sex e dom 21h, Executors depois do Siege (horário do servidor).",
        "conflict": "TheWhelps (KR): Kaira a cada 4h e Siege qua/sáb 22h. Grimvane (global, 27/out): Kaira a cada 3h e Siege seg/qui/sáb 21h.",
    },
    "command_scrolls": {
        "name": "Command Scrolls PvE — comprar 12",
        "description": "12 por semana, por servidor, no Command Merchant da capital. Compra antes do reset: o que você já comprou não expira, o que se perde é a compra que não fez.",
    },
    "abyss_command_scrolls": {
        "name": "Abyss Command Scrolls — comprar 20",
        "description": "20 por semana no Command Merchant do Abyss. Vale até pra quem só faz PvE: Stigma Shards, enhance/amplify stones, AP e cristais de pet. Depois de comprados, não expiram.",
    },
    "ascension_trial": {
        "name": "Ascension Trial — 3 runs",
        "description": "3 entradas por semana em cada personagem, uns 5 min cada. A dificuldade sobe a cada 500 de GS. O loot vai pro storage compartilhado, menos Stigma Shard e Enhance Stones.",
    },
    "daily_dungeon": {
        "name": "Daily Dungeon — 14 entradas (+21 com sub)",
        "description": "É semanal, apesar do nome: 14 tickets (+21 com sub), acumula até 30. Conta por servidor, então só o main faz. No começo, foca em Enhance Stones.",
    },
    "dungeon_runs": {
        "name": "Expedition / Transcendence — gastar energia",
        "description": "Roda dungeon com a energia natural (umas 10 runs por personagem a cada 840 de Odyle). Expedition tem penalidade de Kinah por servidor, somando todos os personagens: das runs 0 a 83 é 100%, a partir da 84ª cai pra 80% e vai caindo. Transcendence tem contador separado: 100% de Kinah nas runs 0 a 55.",
        "notes": "Grimvane: Conquest acumula 1 recompensa a cada 8h (máx 21) e Transcendence 1 a cada 12h (máx 14); kills de boss final, 35 e 28 por semana.",
    },
    "sanctuary": {
        "name": "Sanctuary (raid de 10) — 1 clear",
        "description": "Raid de 10, 1 clear por semana. Cada cubo custa 80 de Odyle. O Ludra volta em 04/nov: Normal pede 2800 de GS e Hard 3000.",
    },
    "abyss_time": {
        "name": "Abyss — 7h por semana",
        "description": "7h por semana (14h com sub). Rift Stone dá +1h, até 30h. Hora que sobrar some no reset.",
    },
    "abyss_corridor": {
        "name": "Abyss Corridors (depois do Siege)",
        "description": "Duas vezes por semana, depois do Artifact Siege. Até 3 runs por evento (depende de quantos corredores o servidor ganhar), no máximo 6 por semana por personagem, uns 2 min cada. Dá Kinah e AP.",
        "conflict": "Dias do Siege: TheWhelps (KR) fala qua/sáb; Grimvane (global) fala seg/qui/sáb 21h no horário do servidor.",
    },
    "rift_dominion": {
        "name": "Rift Dominion — 3 de 6 janelas",
        "description": "Pega a recompensa de 3 das 6 janelas da semana.",
    },
    "battlefield": {
        "name": "Battlefield 10v10 — 3 vitórias",
        "description": "3 vitórias por semana em cada personagem. É equalizado, então alt 45 já joga de boa. Fila das 11h às 14h e das 20h às 22h (horário do servidor, pode mudar no global).",
    },
    "arena": {
        "name": "Arena 1v1 / 5v5",
        "description": "Até 30 recompensas de vitória por semana. Também dá Stigma Shards.",
    },
    "odyle_morph": {
        "name": "Substance Morph — 20 Odyle Energy",
        "description": "Crafta até 20 Odyle Energy por personagem por semana. Mudou em 14/out: antes eram 16 por servidor + 4 por personagem.",
        "notes": "Não aparece nos vídeos do TheWhelps, veio de guias da web.",
    },
    "wind_breeze_shop": {
        "name": "Loja Wind Breeze (sub)",
        "description": "Odyle Energy (20 por personagem), tickets extras de Daily Dungeon (21, só no main) e Soul Crystals (só no main).",
    },
    "daeva_pass": {
        "name": "Daeva Pass — cap de EXP da semana",
        "description": "Até 50.000 de EXP do pass por personagem por semana. As missões são Sealed Dungeons, Strongholds, Shugo Festival e login. O pass acaba em 16/dez.",
    },
    "season_missions": {
        "name": "Season Missions da semana",
        "description": "Missões semanais da temporada. Duas dão Abyss Entry Stone, que vale 1h de Abyss cada.",
    },
    "rise_challenge": {
        "name": "Rise to the Challenge — Spiritstones",
        "description": "Wind Breeze > Special vende 30 Resurrection Spiritstones a 25k e depois mais 30 a 50k, por semana e por servidor. Vai até 16/dez, quando os Spiritstones do evento somem.",
    },
    "trick_or_treat": {
        "name": "Trick or Treat — missões e moedas",
        "description": "As missões semanais do evento dão Pumpkin Coins. Troca por Odyle, Rift Stones, tickets e chaves Shugo antes de 04/nov.",
    },
    "shugo_shop": {
        "name": "Loja Shugo — gastar Centuryroot Tokens",
        "description": "Daevanion Crystals primeiro (50/100/200/400 tokens, 50 no total por personagem, limite vitalício), depois Stigma Shards (35 por personagem, vitalício). Soul Crystal x100 (30/mês) e Radiant Odyle (3/mês) renovam todo mês.",
    },
    "nightmare_shop": {
        "name": "Loja Nightmare — Phantasmal Fragments",
        "description": "No main: asa e material de progressão (Daevanion Crystals, 50 por personagem; Stigma Shards, 35; estátua do Zekel; asa Nightmare). Nas alts: material e skin.",
    },
    "season_shop": {
        "name": "Loja da temporada",
        "description": "A moeda é por personagem. No main: asa e material de progressão. Nas alts: material e skin (skin dá status).",
    },
    "hidden_cubes": {
        "name": "Abrir Hidden Cubes",
        "description": "Usa as Hidden Cube Keys guardadas. Cada cubo dá 1000 Soul Crystals, Selentium, Soul Codex e chance de Odyle Energy.",
    },
    "extra_energy_expiry": {
        "name": "Gastar a Odyle Energy extra",
        "description": "A extra (itens bound de sub, eventos, conquistas e compensação) acumula até 2000, mas não passa pra próxima temporada. Gasta antes de 16/dez.",
    },
    "kinah_transfer": {
        "name": "Mandar Kinah das alts pro main",
        "description": "Kinah normal vai pelo Server Storage. A bound não entra no storage, então o truque é: coloca no Server Storage um item do main que dá pra melhorar, melhora ele na alt usando a Kinah bound e devolve.",
    },
    "genus_soul_crystals": {
        "name": "Pets / Genus Insight",
        "description": "Gasta Soul Crystals e cristais de pet no Genus Insight. Pet vai até nível 3, umas 105 kills; kill depois do máximo vira cristal.",
    },
    "aria_fragments": {
        "name": "Aria/Ariel — 30 por dungeon Hard",
        "description": "No Substance Morph, 100 Aria Fragments viram 1 Daevanion Crystal Aria, até 30 vezes por personagem (dá GS). Roda cada Hard até ter 30 e troca de dungeon. O que sobrar vira Enhance Stones (1 fragmento = 5).",
    },
    "horizontal": {
        "name": "Conteúdo horizontal",
        "description": "Sealed Dungeons, Strongholds, side quests e penas (Empyrean Traces) no mapa da sua facção e no do inimigo, mais as penas do Abyss (Monolith nível 16, +36 de GS). As Sealed Dungeons dentro do Rift dão Kinah, AP e Enhance Stones.",
    },
    "trial_season_mission": {
        "name": "Tower of Trials — score 1000/3000/4000",
        "description": "Missão da temporada: score 1000, 3000 e 4000 no Ascension Trial (Hard) dão Mysterious Crystal, que vai no card dourado de Arcana.",
    },
    "rift": {
        "name": "Spacetime Rift",
        "description": "Abre um portal a cada 3h (a partir das 02:00, horário do servidor) que fica aberto 10 min; lá dentro dá pra ficar até 1h. Bom pra pet e pras quests do outro lado. Libera no lvl 45.",
    },
    "ludra": {
        "name": "Ludra (raid) — volta em 04/nov",
        "description": "Normal pede 2800 de GS e Hard 3000. Quem limpar antes de 25/nov leva o título Ludra Hunter. O Daeva Boot Camp também começa em 04/nov.",
    },
    "twitch_drops": {
        "name": "Twitch Drops do Ludra",
        "description": "Até 14h de live com drops ativado, de 04/nov a 18/nov. Dá Odyle Energy (6, segundo o TheWhelps).",
    },
}

src["items"][:] = [x for x in src["items"] if x["id"] != "rift_dominion"]
pos = next(n for n, x in enumerate(src["items"]) if x["id"] == "abyss_corridor") + 1
src["items"][pos:pos] = NEW
for i in src["items"]:
    for k, v in CORR.get(i["id"], {}).items():
        if v is None:
            i.pop(k, None)
        else:
            i[k] = v

missing = [i["id"] for i in src["items"] if i["id"] not in TEXTOS]
assert not missing, "itens sem texto em TEXTOS: %s" % missing

items = []
for i in src["items"]:
    t = TEXTOS[i["id"]]
    srcs = []
    for s in i.get("sources", []):
        if s["type"] == "video":
            srcs.append({"label": (vid_names.get(s["video_id"], "vídeo") + " " + s["timestamp"]).strip(), "url": s["url"]})
        else:
            srcs.append({"label": site_names.get(s["site"], s["site"]), "url": s["url"]})
    it = {
        "id": i["id"], "name": t["name"], "frequency": i["frequency"], "appliesTo": i["applies_to"],
        "scope": i["limit_scope"], "optional": bool(i.get("optional")), "description": t["description"],
    }
    for k in ("notes", "conflict"):
        if t.get(k):
            it[k] = t[k]
    if i.get("expires"):
        it["expires"] = i["expires"]
    it["sources"] = srcs
    items.append(it)

data = {
    "version": 2,
    "updated": meta["generated"],
    "region": "Global · SA",
    "reset": {"dailyUtcHour": 7, "weeklyUtcDay": 3,
              "dailyLabel": "todo dia, 04:00", "weeklyLabel": "quarta, 04:00"},
    "defaultMain": "ranger",
    "classes": [
        {"id": "gladiator", "name": "Gladiator"},
        {"id": "templar", "name": "Templar"},
        {"id": "assassin", "name": "Assassin"},
        {"id": "ranger", "name": "Ranger"},
        {"id": "sorcerer", "name": "Sorcerer"},
        {"id": "spiritmaster", "name": "Spiritmaster"},
        {"id": "cleric", "name": "Cleric"},
        {"id": "chanter", "name": "Chanter"},
    ],
    "altSummary": "Pelo TheWhelps, uma alt 45 leva uns 80 min por semana: 3 Ascension Trials (~10 min), Abyss Corridors (até ~13 min, 2x por semana) e umas 10 runs de dungeon com a energia natural (~60 min). O resto é por servidor e fica no main.",
    "events": [
        {"date": "2026-11-04", "title": "Ludra volta e abre o Daeva Boot Camp", "detail": "Normal pede 2800 de GS, Hard 3000."},
        {"date": "2026-11-04", "title": "Acaba o Trick or Treat", "detail": "Troca as Pumpkin Coins antes."},
        {"date": "2026-11-11", "title": "Acaba o Odyle Energy Boost", "detail": "A Odyle chega por correio e expira em 7 dias."},
        {"date": "2026-11-18", "title": "Acabam os Twitch Drops do Ludra", "detail": "Começam em 04/nov; até 14h de live com drops ativado."},
        {"date": "2026-11-25", "title": "Prazo do título Ludra Hunter", "detail": "Tem que limpar o Ludra até aqui."},
        {"date": "2026-12-16", "title": "Fim da temporada e do Daeva Pass", "detail": "Energia extra e Spiritstones do evento são zerados."},
    ],
    "schedule": {
        "title": "PvP da semana",
        "note": "Horário do servidor, visto no cliente KR. No global pode mudar.",
        "rows": [
            {"when": "qua e sáb, 22h", "what": "Artifact Siege"},
            {"when": "depois do Siege", "what": "Boss do Abyss e Abyss Corridors"},
            {"when": "ter e qui, 22h", "what": "Abyss Rift"},
            {"when": "a cada 3h", "what": "Portal do Spacetime Rift (10 min)"},
        ],
    },
    "items": items,
}
out = ("/* Gerado por tools/build_data.py a partir de pesquisa/checklist.json.\n"
       "   frequency: daily, weekly, recurring (volta toda quarta), one-off (uma vez por personagem)\n"
       "   appliesTo: main, alt, both · scope: server (só no main), character, account · datas AAAA-MM-DD */\n"
       "window.AION2_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n")
(root / "data.js").write_text(out, encoding="utf-8")
print(len(items), "itens")
