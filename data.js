/* Gerado por tools/build_data.py a partir de pesquisa/checklist.json.
   frequency: daily, weekly, recurring (volta toda quarta), one-off (uma vez por personagem)
   appliesTo: main, alt, both · scope: server (só no main), character, account · datas AAAA-MM-DD */
window.AION2_DATA = {
  "version": 2,
  "updated": "2026-10-28",
  "region": "Global · SA",
  "reset": {
    "dailyUtcHour": 7,
    "weeklyUtcDay": 3,
    "dailyLabel": "todo dia, 04:00",
    "weeklyLabel": "quarta, 04:00"
  },
  "defaultMain": "ranger",
  "classes": [
    {
      "id": "gladiator",
      "name": "Gladiator"
    },
    {
      "id": "templar",
      "name": "Templar"
    },
    {
      "id": "assassin",
      "name": "Assassin"
    },
    {
      "id": "ranger",
      "name": "Ranger"
    },
    {
      "id": "sorcerer",
      "name": "Sorcerer"
    },
    {
      "id": "spiritmaster",
      "name": "Spiritmaster"
    },
    {
      "id": "cleric",
      "name": "Cleric"
    },
    {
      "id": "chanter",
      "name": "Chanter"
    }
  ],
  "altSummary": "Pelo TheWhelps, uma alt 45 leva uns 80 min por semana: 3 Ascension Trials (~10 min), Abyss Corridors (até ~13 min, 2x por semana) e umas 10 runs de dungeon com a energia natural (~60 min). O resto é por servidor e fica no main.",
  "events": [
    {
      "date": "2026-11-04",
      "title": "Ludra volta e abre o Daeva Boot Camp",
      "detail": "Normal pede 2800 de GS, Hard 3000."
    },
    {
      "date": "2026-11-04",
      "title": "Acaba o Trick or Treat",
      "detail": "Troca as Pumpkin Coins antes."
    },
    {
      "date": "2026-11-11",
      "title": "Acaba o Odyle Energy Boost",
      "detail": "A Odyle chega por correio e expira em 7 dias."
    },
    {
      "date": "2026-11-18",
      "title": "Acabam os Twitch Drops do Ludra",
      "detail": "Começam em 04/nov; até 14h de live com drops ativado."
    },
    {
      "date": "2026-11-25",
      "title": "Prazo do título Ludra Hunter",
      "detail": "Tem que limpar o Ludra até aqui."
    },
    {
      "date": "2026-12-16",
      "title": "Fim da temporada e do Daeva Pass",
      "detail": "Energia extra e Spiritstones do evento são zerados."
    }
  ],
  "schedule": {
    "title": "PvP da semana",
    "note": "Horário do servidor, visto no cliente KR. No global pode mudar.",
    "rows": [
      {
        "when": "qua e sáb, 22h",
        "what": "Artifact Siege"
      },
      {
        "when": "depois do Siege",
        "what": "Boss do Abyss e Abyss Corridors"
      },
      {
        "when": "ter e qui, 22h",
        "what": "Abyss Rift"
      },
      {
        "when": "a cada 3h",
        "what": "Portal do Spacetime Rift (10 min)"
      }
    ]
  },
  "items": [
    {
      "id": "duty",
      "name": "Duty — 5 missões",
      "frequency": "daily",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "Journal > Duty. O limite é por servidor, então faz só no main. Reroll é barato: tenta puxar Hidden Cube Key, chave Shugo, ticket de Nightmare e Odyle Energy nos 2 primeiros slots (100% e 50%). Passou de uns 6 rerolls, não compensa.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 00:21",
          "url": "https://youtu.be/wbD-bTHReQQ?t=21"
        },
        {
          "label": "TheWhelps · conteúdo 00:39",
          "url": "https://youtu.be/wbD-bTHReQQ?t=39"
        },
        {
          "label": "TheWhelps · duty 01:29",
          "url": "https://youtu.be/B6wHEcb1HD0?t=89"
        },
        {
          "label": "TheWhelps · duty 05:05",
          "url": "https://youtu.be/B6wHEcb1HD0?t=305"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "vi.ki",
          "url": "https://aion2.vi.ki/endgame-routine"
        }
      ]
    },
    {
      "id": "supply_request",
      "name": "Supply Requests",
      "frequency": "daily",
      "appliesTo": "both",
      "scope": "character",
      "optional": true,
      "description": "Por personagem. Emergency (diário) vai até 66 e o semanal até 6. Entrega só o que já tiver na bag, não vale farmar pra isso.",
      "notes": "Um trecho do vídeo (00:53–01:23) não foi transcrito, deve ser sobre preço. O limite por personagem vem do resumo do TheWhelps (18:49).",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 00:49",
          "url": "https://youtu.be/wbD-bTHReQQ?t=49"
        },
        {
          "label": "TheWhelps · conteúdo 18:49",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1129"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "odyle_energy",
      "name": "Odyle Energy — não deixar no cap",
      "frequency": "daily",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "A natural regenera 15 a cada 3h por personagem e trava em 840. Não deixa encostar no cap. Cada cubo de Expedition/Transcendence gasta 40. A extra (dos itens bound) fica num contador separado.",
      "conflict": "Grimvane e TheGamesWiki falam em cap 560 sem sub e 840 com sub.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 05:31",
          "url": "https://youtu.be/wbD-bTHReQQ?t=331"
        },
        {
          "label": "TheWhelps · conteúdo 06:19",
          "url": "https://youtu.be/wbD-bTHReQQ?t=379"
        },
        {
          "label": "TheWhelps · global 06:32",
          "url": "https://youtu.be/5klnmd6NXYU?t=392"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "nightmare",
      "name": "Nightmare — 2 tickets/dia (máx 14)",
      "frequency": "daily",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Por personagem: ganha 2 por dia e acumula até 14. Sobe cada boss até o nível 10 pra liberar o próximo (tem recompensa de first clear); depois dá pra usar o ticket de clear instantâneo. Na alt, os pontos de Nightmare vão pra skin.",
      "notes": "Pode deixar acumular até 14, mas não passa disso: entra pelo menos uma vez a cada 7 dias.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 04:20",
          "url": "https://youtu.be/wbD-bTHReQQ?t=260"
        },
        {
          "label": "TheWhelps · conteúdo 19:26",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1166"
        },
        {
          "label": "TheWhelps · GS 2100 03:30",
          "url": "https://youtu.be/u3Wb6tH0mZs?t=210"
        },
        {
          "label": "TheWhelps · alts 09:08",
          "url": "https://youtu.be/nAloWmvAodU?t=548"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "shugo_keys",
      "name": "Shugo Festival — chaves (2/dia, máx 14)",
      "frequency": "daily",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "Minigame toda hora cheia. Ganha 2 chaves por dia e acumula até 14, contado por servidor. Não deixa no cap. A recompensa vira Centuryroot Tokens pra loja Shugo.",
      "conflict": "Tem fonte dizendo outra coisa: odyle.net (global) fala em 3/dia com cap 12 (21 com sub) e o Grimvane cita também um contador por personagem (4/dia, cap 28).",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 02:51",
          "url": "https://youtu.be/wbD-bTHReQQ?t=171"
        },
        {
          "label": "TheWhelps · conteúdo 18:55",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1135"
        },
        {
          "label": "TheWhelps · alts 07:53",
          "url": "https://youtu.be/nAloWmvAodU?t=473"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "odyle.net",
          "url": "https://odyle.net/en/cuaderno/tienda-shugo-festival/"
        }
      ]
    },
    {
      "id": "dimensional_invasion",
      "name": "Dimensional Invasion — chaves (1/dia, máx 7)",
      "frequency": "daily",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "Evento rápido (~2 min) que abre aos :30 em algumas horas. A chave da recompensa é 1 por dia, acumula até 7 e é do servidor.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 03:14",
          "url": "https://youtu.be/wbD-bTHReQQ?t=194"
        },
        {
          "label": "TheWhelps · conteúdo 19:04",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1144"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "login_events",
      "name": "Login dos eventos",
      "frequency": "daily",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Loga em cada personagem que está nos eventos: Odyle Energy Boost (28/out a 11/nov, a Odyle chega por correio e expira em 7 dias), presença do Trick or Treat (até 04/nov) e a missão de login do Daeva Pass.",
      "conflict": "Odyle Boost: o TheWhelps (27/out) fala em 4 por dia, o Grimvane em 2.",
      "expires": "2026-11-11",
      "sources": [
        {
          "label": "TheWhelps · GS 3000 05:40",
          "url": "https://youtu.be/C_MpiwBEoJo?t=340"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "vi.ki",
          "url": "https://aion2.vi.ki/endgame-routine"
        }
      ]
    },
    {
      "id": "field_bosses",
      "name": "Field / Abyss bosses (Kaira, Argo, Nahma)",
      "frequency": "daily",
      "appliesTo": "main",
      "scope": "character",
      "optional": true,
      "description": "Se estiver on, cola. Kaira a cada 3h, Nahma sex e dom 21h, Executors depois do Siege (horário do servidor).",
      "conflict": "TheWhelps (KR): Kaira a cada 4h e Siege qua/sáb 22h. Grimvane (global, 27/out): Kaira a cada 3h e Siege seg/qui/sáb 21h.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 13:36",
          "url": "https://youtu.be/wbD-bTHReQQ?t=816"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "command_scrolls",
      "name": "Command Scrolls PvE — comprar 12",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "12 por semana, por servidor, no Command Merchant da capital. Compra antes do reset: o que você já comprou não expira, o que se perde é a compra que não fez.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 07:42",
          "url": "https://youtu.be/wbD-bTHReQQ?t=462"
        },
        {
          "label": "TheWhelps · guia 18:29",
          "url": "https://youtu.be/sU3heVsRb5o?t=1109"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "vi.ki",
          "url": "https://aion2.vi.ki/endgame-routine"
        }
      ]
    },
    {
      "id": "abyss_command_scrolls",
      "name": "Abyss Command Scrolls — comprar 20",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "20 por semana no Command Merchant do Abyss. Vale até pra quem só faz PvE: Stigma Shards, enhance/amplify stones, AP e cristais de pet. Depois de comprados, não expiram.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 12:24",
          "url": "https://youtu.be/wbD-bTHReQQ?t=744"
        },
        {
          "label": "TheWhelps · duty 07:06",
          "url": "https://youtu.be/B6wHEcb1HD0?t=426"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "ascension_trial",
      "name": "Ascension Trial — 3 runs",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "3 entradas por semana em cada personagem, uns 5 min cada. A dificuldade sobe a cada 500 de GS. O loot vai pro storage compartilhado, menos Stigma Shard e Enhance Stones.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 03:43",
          "url": "https://youtu.be/wbD-bTHReQQ?t=223"
        },
        {
          "label": "TheWhelps · alts 06:19",
          "url": "https://youtu.be/nAloWmvAodU?t=379"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "daily_dungeon",
      "name": "Daily Dungeon — 14 entradas (+21 com sub)",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "server",
      "optional": false,
      "description": "É semanal, apesar do nome: 14 tickets (+21 com sub), acumula até 30. Conta por servidor, então só o main faz. No começo, foca em Enhance Stones.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 01:50",
          "url": "https://youtu.be/wbD-bTHReQQ?t=110"
        },
        {
          "label": "TheWhelps · conteúdo 19:38",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1178"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "vi.ki",
          "url": "https://aion2.vi.ki/endgame-routine"
        }
      ]
    },
    {
      "id": "dungeon_runs",
      "name": "Expedition / Transcendence — gastar energia",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Roda dungeon com a energia natural (umas 10 runs por personagem a cada 840 de Odyle). Expedition tem penalidade de Kinah por servidor, somando todos os personagens: das runs 0 a 83 é 100%, a partir da 84ª cai pra 80% e vai caindo. Transcendence tem contador separado: 100% de Kinah nas runs 0 a 55.",
      "notes": "Grimvane: Conquest acumula 1 recompensa a cada 8h (máx 21) e Transcendence 1 a cada 12h (máx 14); kills de boss final, 35 e 28 por semana.",
      "sources": [
        {
          "label": "TheWhelps · alts 04:08",
          "url": "https://youtu.be/nAloWmvAodU?t=248"
        },
        {
          "label": "TheWhelps · alts 07:09",
          "url": "https://youtu.be/nAloWmvAodU?t=429"
        },
        {
          "label": "TheWhelps · conteúdo 06:33",
          "url": "https://youtu.be/wbD-bTHReQQ?t=393"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "sanctuary",
      "name": "Sanctuary (raid de 10) — 1 clear",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "character",
      "optional": false,
      "description": "Raid de 10, 1 clear por semana. Cada cubo custa 80 de Odyle. O Ludra volta em 04/nov: Normal pede 2800 de GS e Hard 3000.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 07:19",
          "url": "https://youtu.be/wbD-bTHReQQ?t=439"
        },
        {
          "label": "TheWhelps · conteúdo 19:31",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1171"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "abyss_time",
      "name": "Abyss — 7h por semana",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "character",
      "optional": true,
      "description": "7h por semana (14h com sub). Rift Stone dá +1h, até 30h. Hora que sobrar some no reset.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 09:45",
          "url": "https://youtu.be/wbD-bTHReQQ?t=585"
        },
        {
          "label": "TheWhelps · conteúdo 10:38",
          "url": "https://youtu.be/wbD-bTHReQQ?t=638"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "abyss_corridor",
      "name": "Abyss Corridors (depois do Siege)",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Duas vezes por semana, depois do Artifact Siege. Até 3 runs por evento (depende de quantos corredores o servidor ganhar), no máximo 6 por semana por personagem, uns 2 min cada. Dá Kinah e AP.",
      "conflict": "Dias do Siege: TheWhelps (KR) fala qua/sáb; Grimvane (global) fala seg/qui/sáb 21h no horário do servidor.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 13:02",
          "url": "https://youtu.be/wbD-bTHReQQ?t=782"
        },
        {
          "label": "TheWhelps · alts 06:33",
          "url": "https://youtu.be/nAloWmvAodU?t=393"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "rift_dominion",
      "name": "Rift Dominion — 3 de 6 janelas",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Pega a recompensa de 3 das 6 janelas da semana.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo",
          "url": "https://youtu.be/wbD-bTHReQQ"
        }
      ]
    },
    {
      "id": "battlefield",
      "name": "Battlefield 10v10 — 3 vitórias",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "3 vitórias por semana em cada personagem. É equalizado, então alt 45 já joga de boa. Fila das 11h às 14h e das 20h às 22h (horário do servidor, pode mudar no global).",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 15:15",
          "url": "https://youtu.be/wbD-bTHReQQ?t=915"
        },
        {
          "label": "TheWhelps · conteúdo 20:30",
          "url": "https://youtu.be/wbD-bTHReQQ?t=1230"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "arena",
      "name": "Arena 1v1 / 5v5",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "character",
      "optional": true,
      "description": "Até 30 recompensas de vitória por semana. Também dá Stigma Shards.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 15:06",
          "url": "https://youtu.be/wbD-bTHReQQ?t=906"
        },
        {
          "label": "TheWhelps · global 03:30",
          "url": "https://youtu.be/5klnmd6NXYU?t=210"
        }
      ]
    },
    {
      "id": "odyle_morph",
      "name": "Substance Morph — 20 Odyle Energy",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Crafta até 20 Odyle Energy por personagem por semana. Mudou em 14/out: antes eram 16 por servidor + 4 por personagem.",
      "notes": "Não aparece nos vídeos do TheWhelps, veio de guias da web.",
      "sources": [
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "TheGamesWiki",
          "url": "https://thegameswiki.com/aion-2/wiki/global-material-farming-planner"
        }
      ]
    },
    {
      "id": "wind_breeze_shop",
      "name": "Loja Wind Breeze (sub)",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Odyle Energy (20 por personagem), tickets extras de Daily Dungeon (21, só no main) e Soul Crystals (só no main).",
      "sources": [
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "TheWhelps · conteúdo 02:28",
          "url": "https://youtu.be/wbD-bTHReQQ?t=148"
        }
      ]
    },
    {
      "id": "daeva_pass",
      "name": "Daeva Pass — cap de EXP da semana",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Até 50.000 de EXP do pass por personagem por semana. As missões são Sealed Dungeons, Strongholds, Shugo Festival e login. O pass acaba em 16/dez.",
      "expires": "2026-12-16",
      "sources": [
        {
          "label": "vi.ki",
          "url": "https://aion2.vi.ki/endgame-routine"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "season_missions",
      "name": "Season Missions da semana",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Missões semanais da temporada. Duas dão Abyss Entry Stone, que vale 1h de Abyss cada.",
      "sources": [
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        },
        {
          "label": "TheWhelps · GS 2100 05:17",
          "url": "https://youtu.be/u3Wb6tH0mZs?t=317"
        }
      ]
    },
    {
      "id": "rise_challenge",
      "name": "Rise to the Challenge — Spiritstones",
      "frequency": "weekly",
      "appliesTo": "main",
      "scope": "server",
      "optional": true,
      "description": "Wind Breeze > Special vende 30 Resurrection Spiritstones a 25k e depois mais 30 a 50k, por semana e por servidor. Vai até 16/dez, quando os Spiritstones do evento somem.",
      "expires": "2026-12-16",
      "sources": [
        {
          "label": "TheWhelps · patch 21/10 04:12",
          "url": "https://youtu.be/t8nVij7qHwc?t=252"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "trick_or_treat",
      "name": "Trick or Treat — missões e moedas",
      "frequency": "weekly",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "As missões semanais do evento dão Pumpkin Coins. Troca por Odyle, Rift Stones, tickets e chaves Shugo antes de 04/nov.",
      "expires": "2026-11-04",
      "sources": [
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        },
        {
          "label": "OnlyFarms",
          "url": "https://onlyfarms.gg/guides/aion-2-daily-weekly-checklist/"
        }
      ]
    },
    {
      "id": "shugo_shop",
      "name": "Loja Shugo — gastar Centuryroot Tokens",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Daevanion Crystals primeiro (50/100/200/400 tokens, 50 no total por personagem, limite vitalício), depois Stigma Shards (35 por personagem, vitalício). Soul Crystal x100 (30/mês) e Radiant Odyle (3/mês) renovam todo mês.",
      "sources": [
        {
          "label": "TheWhelps · global 03:15",
          "url": "https://youtu.be/5klnmd6NXYU?t=195"
        },
        {
          "label": "TheWhelps · GS 2100 03:15",
          "url": "https://youtu.be/u3Wb6tH0mZs?t=195"
        },
        {
          "label": "TheWhelps · GS 1400 07:11",
          "url": "https://youtu.be/B5_DMcXlzwk?t=431"
        },
        {
          "label": "Wikily",
          "url": "https://wikily.gg/aion-2/shops/festival-shop"
        },
        {
          "label": "odyle.net",
          "url": "https://odyle.net/en/cuaderno/tienda-shugo-festival/"
        }
      ]
    },
    {
      "id": "nightmare_shop",
      "name": "Loja Nightmare — Phantasmal Fragments",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "No main: asa e material de progressão (Daevanion Crystals, 50 por personagem; Stigma Shards, 35; estátua do Zekel; asa Nightmare). Nas alts: material e skin.",
      "sources": [
        {
          "label": "TheWhelps · duty 03:28",
          "url": "https://youtu.be/B6wHEcb1HD0?t=208"
        },
        {
          "label": "TheWhelps · GS 2100 03:24",
          "url": "https://youtu.be/u3Wb6tH0mZs?t=204"
        },
        {
          "label": "TheWhelps · alts 09:08",
          "url": "https://youtu.be/nAloWmvAodU?t=548"
        },
        {
          "label": "TheGamesWiki",
          "url": "https://thegameswiki.com/aion-2/wiki/global-material-farming-planner"
        }
      ]
    },
    {
      "id": "season_shop",
      "name": "Loja da temporada",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "A moeda é por personagem. No main: asa e material de progressão. Nas alts: material e skin (skin dá status).",
      "sources": [
        {
          "label": "TheWhelps · alts 08:42",
          "url": "https://youtu.be/nAloWmvAodU?t=522"
        }
      ]
    },
    {
      "id": "hidden_cubes",
      "name": "Abrir Hidden Cubes",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Usa as Hidden Cube Keys guardadas. Cada cubo dá 1000 Soul Crystals, Selentium, Soul Codex e chance de Odyle Energy.",
      "sources": [
        {
          "label": "TheWhelps · duty 01:34",
          "url": "https://youtu.be/B6wHEcb1HD0?t=94"
        },
        {
          "label": "TheWhelps · global 12:12",
          "url": "https://youtu.be/5klnmd6NXYU?t=732"
        }
      ]
    },
    {
      "id": "extra_energy_expiry",
      "name": "Gastar a Odyle Energy extra",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "A extra (itens bound de sub, eventos, conquistas e compensação) acumula até 2000, mas não passa pra próxima temporada. Gasta antes de 16/dez.",
      "expires": "2026-12-16",
      "sources": [
        {
          "label": "TheWhelps · alts 05:53",
          "url": "https://youtu.be/nAloWmvAodU?t=353"
        },
        {
          "label": "TheWhelps · global 21:14",
          "url": "https://youtu.be/5klnmd6NXYU?t=1274"
        }
      ]
    },
    {
      "id": "kinah_transfer",
      "name": "Mandar Kinah das alts pro main",
      "frequency": "recurring",
      "appliesTo": "alt",
      "scope": "account",
      "optional": false,
      "description": "Kinah normal vai pelo Server Storage. A bound não entra no storage, então o truque é: coloca no Server Storage um item do main que dá pra melhorar, melhora ele na alt usando a Kinah bound e devolve.",
      "sources": [
        {
          "label": "TheWhelps · alts 02:39",
          "url": "https://youtu.be/nAloWmvAodU?t=159"
        },
        {
          "label": "TheWhelps · alts 03:00",
          "url": "https://youtu.be/nAloWmvAodU?t=180"
        }
      ]
    },
    {
      "id": "genus_soul_crystals",
      "name": "Pets / Genus Insight",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": true,
      "description": "Gasta Soul Crystals e cristais de pet no Genus Insight. Pet vai até nível 3, umas 105 kills; kill depois do máximo vira cristal.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 08:01",
          "url": "https://youtu.be/wbD-bTHReQQ?t=481"
        },
        {
          "label": "TheWhelps · global 13:36",
          "url": "https://youtu.be/5klnmd6NXYU?t=816"
        }
      ]
    },
    {
      "id": "aria_fragments",
      "name": "Aria/Ariel — 30 por dungeon Hard",
      "frequency": "recurring",
      "appliesTo": "main",
      "scope": "character",
      "optional": false,
      "description": "No Substance Morph, 100 Aria Fragments viram 1 Daevanion Crystal Aria, até 30 vezes por personagem (dá GS). Roda cada Hard até ter 30 e troca de dungeon. O que sobrar vira Enhance Stones (1 fragmento = 5).",
      "sources": [
        {
          "label": "TheWhelps · patch 21/10 01:36",
          "url": "https://youtu.be/t8nVij7qHwc?t=96"
        },
        {
          "label": "TheWhelps · GS 3000 04:40",
          "url": "https://youtu.be/C_MpiwBEoJo?t=280"
        },
        {
          "label": "TheWhelps · GS 3000 08:14",
          "url": "https://youtu.be/C_MpiwBEoJo?t=494"
        }
      ]
    },
    {
      "id": "horizontal",
      "name": "Conteúdo horizontal",
      "frequency": "one-off",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Sealed Dungeons, Strongholds, side quests e penas (Empyrean Traces) no mapa da sua facção e no do inimigo, mais as penas do Abyss (Monolith nível 16, +36 de GS). As Sealed Dungeons dentro do Rift dão Kinah, AP e Enhance Stones.",
      "sources": [
        {
          "label": "TheWhelps · GS 1400 01:47",
          "url": "https://youtu.be/B5_DMcXlzwk?t=107"
        },
        {
          "label": "TheWhelps · GS 1400 04:30",
          "url": "https://youtu.be/B5_DMcXlzwk?t=270"
        },
        {
          "label": "TheWhelps · GS 1400 05:32",
          "url": "https://youtu.be/B5_DMcXlzwk?t=332"
        },
        {
          "label": "TheWhelps · guia 17:33",
          "url": "https://youtu.be/sU3heVsRb5o?t=1053"
        }
      ]
    },
    {
      "id": "trial_season_mission",
      "name": "Tower of Trials — score 1000/3000/4000",
      "frequency": "one-off",
      "appliesTo": "both",
      "scope": "character",
      "optional": false,
      "description": "Missão da temporada: score 1000, 3000 e 4000 no Ascension Trial (Hard) dão Mysterious Crystal, que vai no card dourado de Arcana.",
      "sources": [
        {
          "label": "TheWhelps · GS 2100 05:04",
          "url": "https://youtu.be/u3Wb6tH0mZs?t=304"
        }
      ]
    },
    {
      "id": "rift",
      "name": "Spacetime Rift",
      "frequency": "recurring",
      "appliesTo": "both",
      "scope": "character",
      "optional": true,
      "description": "Abre um portal a cada 3h (a partir das 02:00, horário do servidor) que fica aberto 10 min; lá dentro dá pra ficar até 1h. Bom pra pet e pras quests do outro lado. Libera no lvl 45.",
      "sources": [
        {
          "label": "TheWhelps · conteúdo 15:43",
          "url": "https://youtu.be/wbD-bTHReQQ?t=943"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "ludra",
      "name": "Ludra (raid) — volta em 04/nov",
      "frequency": "one-off",
      "appliesTo": "main",
      "scope": "character",
      "optional": false,
      "description": "Normal pede 2800 de GS e Hard 3000. Quem limpar antes de 25/nov leva o título Ludra Hunter. O Daeva Boot Camp também começa em 04/nov.",
      "expires": "2026-11-25",
      "sources": [
        {
          "label": "TheWhelps · GS 3000 03:12",
          "url": "https://youtu.be/C_MpiwBEoJo?t=192"
        },
        {
          "label": "TheWhelps · GS 3000 05:05",
          "url": "https://youtu.be/C_MpiwBEoJo?t=305"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    },
    {
      "id": "twitch_drops",
      "name": "Twitch Drops do Ludra",
      "frequency": "one-off",
      "appliesTo": "main",
      "scope": "account",
      "optional": true,
      "description": "Até 14h de live com drops ativado, de 04/nov a 18/nov. Dá Odyle Energy (6, segundo o TheWhelps).",
      "expires": "2026-11-18",
      "sources": [
        {
          "label": "TheWhelps · GS 3000 05:58",
          "url": "https://youtu.be/C_MpiwBEoJo?t=358"
        },
        {
          "label": "Grimvane",
          "url": "https://aion2.grimvane.app/abyss-boss-timers/"
        }
      ]
    }
  ]
};
