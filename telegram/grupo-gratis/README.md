# João Marçal — Landing Page (Grupo GG Grátis)

Landing page estática, **autossuficiente e independente**. Todo o código e os assets
usados estão dentro desta pasta — não depende de WordPress, de servidor externo nem
de CDNs (fontes, ícones e imagens são servidos localmente).

## Como rodar / publicar

É 100% estática. Sirva a pasta por qualquer servidor HTTP:

```bash
# Python
python3 -m http.server 8099
# abra http://localhost:8099/index.html

# ou Node
npx serve .
```

Para publicar, suba a pasta inteira em qualquer hospedagem estática
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, Apache/Nginx).
Arquivo de entrada: `index.html`.

## Estrutura

```
joao-marcal/
├─ index.html          → página (código + estilos/scripts inline)
├─ README.md
└─ assets/
   ├─ css/             → todas as folhas de estilo
   ├─ js/              → todos os scripts (inclui os bundles do Elementor)
   ├─ img/             → imagens (hero, grafismos, backgrounds) em .webp
   └─ fonts/           → fontes locais (Bebas Neue, Barlow, Inter, Roboto/Slab,
                          Font Awesome, ícones do Happy Addons)
```

Só os assets efetivamente referenciados foram incluídos (sem arquivos órfãos,
backups ou fontes não usadas).

## Rastreamento e integrações

| O quê | Onde (`index.html`) | Valor |
|---|---|---|
| Planilha (leads) | `const SHEET_URL` | Google Apps Script (App da Web /exec) — cole a URL em SHEET_URL |
| Destino pós-formulário (grupo) | `const REDIRECT` | `https://t.me/jotapemarcalfree` |

- **Sem rastreamento externo.** Meta Pixel (Facebook) e Google Tag Manager foram
  removidos desta versão.
- **Leads → Google Sheets.** Ao enviar o formulário, os dados são gravados na planilha
  via Apps Script (`SHEET_URL`) e o usuário é levado ao grupo do Telegram.
  O envio é "fire-and-forget": se a planilha falhar, o usuário **nunca** fica preso.
  Formato enviado: `{ lead:{email,telefone}, origem, event, timestamp, utm_params }`.

### Fluxo do formulário
1. Clique em **"Entrar no grupo grátis"** → abre o modal com o formulário.
2. Preenche e-mail + telefone (validação local) → grava na planilha → tela "Vaga Garantida!".
3. Redireciona automaticamente para o grupo do Telegram (`REDIRECT`).

## Notas

- A única chamada externa em runtime é a gravação do lead na planilha (Apps Script). Todo o resto é
  servido localmente.
- Toda referência ao domínio/marca originais foi removida ou renomeada para João Marçal.
- O publicPath do Elementor foi ajustado (`elementorFrontendConfig.urls.assets = "assets/"`)
  para que os bundles carreguem de `assets/js/`.
- Há um `console.error` inofensivo (`form-field-telefone` nulo) herdado do código
  original; não afeta o funcionamento (a máscara de telefone ativa usa `phoneInput`).
