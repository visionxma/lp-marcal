# Green Signal — Landing Pages ⚽

Duas landing pages no estilo **dashboard esportivo premium** (preto + verde neon, glow, mobile-first).

| Página | Arquivo | Objetivo |
|--------|---------|----------|
| **LP01** | `index.html` | Teste grátis do app por 7 dias (CTA interno) |
| **LP02** | `jogos.html` | Bingo dos jogos de hoje → solicitar odd no **WhatsApp** |

```
.
├── index.html          ← LP01 (Teste Grátis o App)
├── jogos.html          ← LP02 (Bingo dos Jogos de Hoje)
└── assets/
    ├── styles.css       ← design system compartilhado
    └── script.js        ← contador, countdown, reveal, link do WhatsApp
```

## Como visualizar
É HTML puro, sem build. Basta **dar dois cliques no `index.html`** (abre no navegador).
Para ficar igual à produção, use um servidor local:

```powershell
# na pasta do projeto:
python -m http.server 8080
# depois abra http://localhost:8080
```

## ⚙️ Configurar o WhatsApp (LP02) — IMPORTANTE
A LP02 monta o link do WhatsApp automaticamente. Edite a tag `<body>` em `jogos.html`:

```html
<body data-page="lp02"
      data-wa-number="5599999999999"   <!-- TROQUE pelo seu número: 55 + DDD + número -->
      data-wa-text="Olá! Quero receber a odd dos jogos de hoje ⚽">
```

- `data-wa-number`: só dígitos, formato internacional (ex.: `5511988887777`).
- `data-wa-text`: mensagem que já vem digitada pro usuário enviar.

Todos os botões verdes da LP02 passam a abrir `https://wa.me/<numero>?text=<mensagem>`.

## ✏️ Personalizar conteúdo
- **Marca/logo:** procure por `Green` / `GreenSignal` e o `<span class="logo">G</span>`.
- **Jogos da grade (LP02):** cada cartão é um `<article class="match">` em `jogos.html`.
  Para o escudo, troque a sigla (ex.: `FLA`) e a classe de cor (`c-fla`, `c-pal`, …) — paletas em `styles.css` na seção *Crest palettes*.
- **Número de prova social (LP01):** `data-count="1417"` na seção `#prova`.
- **Countdown da oferta (LP01):** 6h por padrão — em `script.js`, `1000 * 60 * 60 * 6`.
- **Cores do tema:** variáveis no topo de `styles.css` (`:root`) — `--neon`, `--bg`, etc.

## 🖼️ Trocar por imagens reais (opcional)
As telas de app, “prints” e escudos são **mockups feitos em HTML/CSS** (sem depender de imagens externas, carregam instantâneo).
Para usar fotos reais (tipster, dashboard, prints):
1. Coloque os arquivos em `assets/img/`.
2. Substitua o bloco `.phone` (hero) ou os `.shot` (prova) por `<img src="assets/img/seu-arquivo.jpg" alt="...">`.

> Use imagens com direito de uso. Escudos/logos de clubes e ligas são marcas registradas — os exemplos aqui são **estilizados** (siglas + cores) justamente para evitar uso indevido.

## ⚠️ Aviso legal
Rodapé já inclui aviso de jogo responsável (+18, risco de perdas, sem garantia de lucro).
Ajuste conforme as regras de publicidade/afiliação da sua plataforma.
