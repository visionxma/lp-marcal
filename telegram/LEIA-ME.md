# LPs JOÃO MARÇAL — Odds Altas & Grupo VIP

As 2 landing pages do **João Marçal** (quiz + captação de leads): páginas
**limpas e self-contained** (sem WordPress/Elementor), com um único bloco de
configuração pra você editar.

## Estrutura

```
LPs-MARCAL/
├── odds-altas/
│   ├── index.html          ← a LP (arquivo único, self-contained)
│   └── assets/
│       └── hero.jpg        ← foto de fundo do hero (João Marçal)
├── grupo-vip/
│   ├── index.html
│   └── assets/
│       └── hero.jpg        ← foto de fundo do hero (João Marçal)
├── _original/              ← fotos em alta + arquivos de trabalho (NÃO versionado)
└── LEIA-ME.md
```

Cada `index.html` é **independente**: é só subir a pasta (`index.html` + `assets/`) em
qualquer hospedagem. Usa Tailwind, Lucide e Google Fonts via CDN (precisa de internet).

## Como pré-visualizar no seu Mac

Abra o Terminal na pasta `LPs-MARCAL` e rode:

```
python3 -m http.server 8000
```

Depois abra no navegador: `http://localhost:8000/odds-altas/` e `http://localhost:8000/grupo-vip/`.
(Só dar duplo-clique no `index.html` também funciona na maioria dos navegadores.)

## ⚙️ Onde configurar (bloco CONFIG no topo do `<script>`)

Abra o `index.html` e no comecinho do último `<script>` tem o bloco **CONFIG** — edite SÓ ali:

| Campo | O que é | Padrão atual |
|---|---|---|
| `LINK_TELEGRAM` / `LINK_COMUNIDADE` / `LINK_X1` | seus 3 links do João Marçal | `t.me/jotapemarcalfree` |
| `REDIRECT_URL` | pra onde o lead vai **depois** de preencher o form | `t.me/jotapemarcalfree` |
| `LEAD_ENDPOINT` | URL do webhook (Apps Script) que **recebe** os dados do lead | já preenchido |
| `LEAD_TOKEN` | token anti-spam enviado junto do lead (tem que bater com o backend) | já preenchido |
| `FB_PIXEL_ID` | ID do Pixel da Meta | **`''` (vazio)** |
| `ORIGEM` | identificador enviado no payload | `joaomarcal_odds_altas` / `joaomarcal_grupo_vip` |

## ⚠️ O que conferir antes de ir pro ar

1. **Webhook de leads (`LEAD_ENDPOINT`)** — já aponta pra um Apps Script. Confirme que
   ele está publicado e recebendo os dados (a planilha do Google Sheets enchendo).
2. **Token anti-spam (`LEAD_TOKEN`)** — o valor aqui **precisa ser idêntico** ao que o
   Apps Script valida. Se trocar um, troque o outro, senão o backend descarta os leads.
3. **Pixel da Meta (`FB_PIXEL_ID`)** — está **vazio**. Coloque o **seu** pra rastrear
   PageView + Lead. Vazio = sem rastreio.
4. **Confirmar o `REDIRECT_URL`** de cada página (ver tabela acima).

## Trocar copy / fotos

- **Copy:** está tudo em texto dentro do `<script>` (`renderIntro`, `renderStep`, `renderResult`,
  `openLeadModal`…). É só procurar o texto e trocar.
- **Foto hero:** substitua `assets/hero.jpg` (mesmo nome) ou aponte `BG_MOBILE`/`BG_DESKTOP` no JS.
- As fotos em alta e arquivos de trabalho ficam em `_original/` (essa pasta **não** vai
  pro Git).

## Observações

- As duas páginas têm **1 pergunta** no quiz — dá pra adicionar mais perguntas no array
  `STEPS`/`QUESTIONS` se quiser.
- Textos de resultado (“+300K membros”, “98% das vagas”, bilhetes de exemplo, etc.) são
  **exemplos** — ajuste pros números reais do João Marçal.
- Conteúdo é +18 / apostas: o aviso de jogo responsável foi mantido no rodapé.
