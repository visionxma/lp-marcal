# LP JOÃO MARÇAL — Grupo VIP (Telegram)

Landing page do **João Marçal** (quiz + captação de leads): página **limpa e
self-contained** (sem WordPress/Elementor), com um único bloco de configuração
pra editar. O lead preenche WhatsApp/e-mail, cai na **planilha do Google** e é
redirecionado pro **Telegram**.

## Estrutura

```
telegram/
├── grupo-vip/
│   ├── index.html                     ← a LP (arquivo único, self-contained)
│   └── assets/
│       └── hero.jpg                   ← foto de fundo do hero (João Marçal)
├── apps-script-leads-joaomarcal.gs    ← código do backend (Google Apps Script)
└── LEIA-ME.md
```

A LP é **independente**: é só subir a pasta `grupo-vip/` (`index.html` + `assets/`)
em qualquer hospedagem. Usa Tailwind, Lucide e Google Fonts via CDN (precisa de internet).

## Como pré-visualizar

Na pasta `telegram/`, rode:

```
python3 -m http.server 8000
```

E abra `http://localhost:8000/grupo-vip/`.
(Só dar duplo-clique no `index.html` também funciona na maioria dos navegadores.)

## ⚙️ Onde configurar (bloco CONFIG no topo do `<script>`)

Abra o `index.html` e no comecinho do último `<script>` tem o bloco **CONFIG** — edite SÓ ali:

| Campo | O que é | Estado atual |
|---|---|---|
| `LINK_TELEGRAM` / `LINK_COMUNIDADE` / `LINK_X1` | links do João Marçal | `t.me/jotapemarcalfree` |
| `REDIRECT_URL` | pra onde o lead vai **depois** de preencher o form | `t.me/jotapemarcalfree` |
| `LEAD_ENDPOINT` | URL do Apps Script que grava o lead na planilha | ✅ conectado (planilha "Leads Marcal") |
| `LEAD_TOKEN` | token anti-spam — tem que ser idêntico ao do Apps Script | ✅ configurado |
| `FB_PIXEL_ID` | ID do Pixel da Meta | **`''` (vazio — sem rastreio)** |
| `ORIGEM` | identificador enviado no payload | `joaomarcal_grupo_vip` |

## 📊 Planilha de leads (Google Sheets + Apps Script)

- Os leads caem na planilha **Leads Marcal**, aba **Leads** (colunas: data/hora,
  telefone, e-mail, origem, evento, respostas do quiz e UTMs).
- O backend é o arquivo `apps-script-leads-joaomarcal.gs`, publicado como
  **App da Web** no Google Apps Script (Executar como: Eu · Acesso: Qualquer pessoa).
- **Se editar o script:** só salvar não atualiza o que está no ar — vá em
  **Implantar → Gerenciar implantações → ✏️ → Versão: Nova versão → Implantar**
  (a URL `/exec` continua a mesma).
- **Se trocar o `LEAD_TOKEN`:** troque nos DOIS lados (script e `index.html`),
  senão o backend descarta os leads silenciosamente.

## ⚠️ O que falta pra rastreio completo

- **Pixel da Meta (`FB_PIXEL_ID`)** — está vazio. Coloque o seu pra rastrear
  PageView + Lead.

## Observações

- O quiz tem **1 pergunta** — dá pra adicionar mais no array `STEPS`/`QUESTIONS`.
- Textos de resultado (“+300K membros”, “98% das vagas”, bilhetes de exemplo, etc.)
  são **exemplos** — ajuste pros números reais do João Marçal.
- Conteúdo é +18 / apostas: o aviso de jogo responsável foi mantido no rodapé.
