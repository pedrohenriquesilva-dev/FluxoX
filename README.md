<div align="center">

<img src="public/favicon.svg" width="80" height="80" alt="FluxoX logo" />

# FluxoX

**Controle financeiro pessoal, construído do zero.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3-22c55e?style=flat-square&logoColor=white)](https://recharts.org/)
[![PWA](https://img.shields.io/badge/PWA-ready-5b8af5?style=flat-square&logo=googlechrome&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Deploy](https://img.shields.io/badge/Vercel-deploy-000?style=flat-square&logo=vercel&logoColor=white)](https://fluxox.vercel.app)
[![40 commits](https://img.shields.io/badge/40_commits-diários-22c55e?style=flat-square)](https://github.com/pedrohenriquesilva-dev/FluxoX/commits/main)

<br/>

[**🚀 Acessar o app →**](https://fluxox.vercel.app)&nbsp;&nbsp;·&nbsp;&nbsp;[Ver commits](https://github.com/pedrohenriquesilva-dev/FluxoX/commits/main)&nbsp;&nbsp;·&nbsp;&nbsp;[Reportar bug](https://github.com/pedrohenriquesilva-dev/FluxoX/issues)

</div>

---

## O que é o FluxoX?

Uma alternativa ao controle financeiro em planilha. Em vez de fórmulas que quebram e abas difíceis de navegar, o FluxoX é uma aplicação web completa que separa automaticamente gastos eletrônicos de dinheiro físico, calcula sua economia real e mostra se você está no caminho certo em relação à sua meta mensal.

**Desenvolvido em 40 dias consecutivos**, com um commit por dia documentando cada etapa da evolução — do setup inicial até o PWA instalável.

---

## Screenshots

| Dashboard | Despesas | Relatórios |
|:-:|:-:|:-:|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Despesas](docs/screenshots/expenses.png) | ![Relatórios](docs/screenshots/reports.png) |

| Estatísticas | Conferência | Premissas |
|:-:|:-:|:-:|
| ![Estatísticas](docs/screenshots/stats.png) | ![Conferência](docs/screenshots/conference.png) | ![Premissas](docs/screenshots/settings.png) |

---

## Funcionalidades

```
✅ Despesas e receitas com CRUD completo
✅ Separação automática eletrônico vs espécie
✅ Meta mensal com barra de progresso
✅ Resumo anual em 3 blocos (eletrônico, espécie, planejamento)
✅ Relatórios por categoria e forma de pagamento
✅ Estatísticas com recordes e hábitos do ano
✅ Conferência: saldo calculado vs saldo real
✅ Exportação para CSV (despesas, receitas, resumo anual)
✅ Resumo mensal em texto para compartilhar no WhatsApp
✅ Busca global com Ctrl+K e highlight de texto
✅ Toast notifications em todas as ações
✅ Tema claro e escuro (detecta o sistema automaticamente)
✅ Skeleton loading no Dashboard
✅ Animações de entrada com IntersectionObserver
✅ PWA instalável no celular, funciona offline
✅ Responsivo — sidebar no desktop, nav inferior no mobile
```

---

## Lógica financeira

| Conceito | Cálculo |
|---|---|
| **Eletrônico** | Qualquer forma que não contenha "dinheiro" ou "físico" |
| **Espécie** | Forma = "Dinheiro Físico" |
| **Economia Real** | Entrada Eletrônica − Saída Eletrônica |
| **Acumulado** | Soma progressiva da economia mês a mês |
| **Conferência** | Total Guardado − Acumulado Calculado |
| **Taxa de Economia** | Economia ÷ Total Recebido × 100 |

---

## Stack

| | Tecnologia | Por quê |
|---|---|---|
| ⚛️ | React 18 | Framework principal — hooks e componentes funcionais |
| ⚡ | Vite 5 | Build ultrarrápido e HMR instantâneo |
| 📊 | Recharts 3 | Gráficos de barra, pizza e linha com tooltips interativos |
| 📦 | vite-plugin-pwa | Service worker e manifest gerados automaticamente |
| 🎨 | CSS puro | Design system com variáveis — sem Tailwind, sem libs de UI |
| 💾 | localStorage | Dados 100% locais, sem servidor, sem conta |
| 🚀 | Vercel | Deploy contínuo a cada push na main |

> **Nenhuma biblioteca de componentes foi usada.** Os 24 componentes de interface foram construídos do zero para demonstrar domínio real de React e CSS.

---

## Estrutura

```
src/
├── components/ui/      # 24 componentes (Sidebar, Charts, Modal, Toast...)
├── components/transactions/ # TransactionForm, TransactionList
├── contexts/           # ToastContext — notificações globais
├── hooks/              # 7 hooks (useFinance, useTheme, useGlobalSearch...)
├── pages/              # 9 telas (Dashboard, Despesas, Relatórios, Stats...)
└── utils/              # formatters, exportCsv, exportText, storage
```

---

## Rodando localmente

```bash
git clone https://github.com/pedrohenriquesilva-dev/FluxoX.git
cd FluxoX
npm install
npm run dev        # http://localhost:5173
```

Para testar o PWA:
```bash
npm run build
npm run preview    # http://localhost:4173
```

---

## Os 40 commits

O projeto foi desenvolvido com **um commit por dia** durante 40 dias consecutivos. Cada commit representa uma entrega real e isolada — não há commits de "correção do commit anterior" ou mensagens genéricas.

<details>
<summary>Ver todos os 40 commits</summary>

| Dia | Mensagem |
|-----|----------|
| 1 | `feat: project setup with vite + react, vercel deploy configured` |
| 2 | `chore: folder structure, global styles and css variables` |
| 3 | `feat: sidebar navigation and state-based routing` |
| 4 | `chore: constants file and utility functions` |
| 5 | `feat: reusable base components (icon, field, modal, statcard)` |
| 6 | `feat: transaction form component with validation` |
| 7 | `feat: transaction list component with edit and delete` |
| 8 | `feat: expenses page with filters, search and totals` |
| 9 | `feat: incomes page with filters, search and totals` |
| 10 | `feat: useLocalStorage hook, persist all data to browser storage` |
| 11 | `feat: advanced filters with method, sort and clear button` |
| 12 | `style: visual polish, hover states and responsive improvements` |
| 13 | `feat: useFinance hook with monthly and accumulated calculations` |
| 14 | `feat: barchart, piechart and accumulated table components` |
| 15 | `feat: dashboard page with kpis, charts and goal tracking` |
| 16 | `feat: annual summary page with three financial blocks` |
| 17 | `feat: savings page with location tracking and comparison` |
| 18 | `feat: conference page with monthly reconciliation` |
| 19 | `feat: settings page with editable lists and monthly goal` |
| 20 | `refactor: centralize storage keys, add proptypes and pageheader` |
| 21 | `refactor: add proptypes to all components and apply pageheader` |
| 22 | `style: mobile responsiveness with bottom nav and media queries` |
| 23 | `refactor: cleanup dead code, add jsdoc and standardize naming` |
| 24 | `feat: recharts bar chart with interactive tooltip` |
| 25 | `feat: recharts pie chart with legend and hover animation` |
| 26 | `feat: recharts line chart showing real vs goal accumulated savings` |
| 27 | `feat: export filtered transactions to csv` |
| 28 | `feat: monthly summary text export for sharing` |
| 29 | `feat: pwa support with manifest, icons and service worker` |
| 30 | `docs: final readme with screenshots and v1.0 release` |
| 31 | `feat: entrance animations with intersection observer` |
| 32 | `feat: light and dark theme toggle with system preference` |
| 33 | `feat: period filter and expandable rows on conference page` |
| 34 | `feat: reports page with category and payment method analytics` |
| 35 | `feat: skeleton loading state for dashboard with shimmer animation` |
| 36 | `feat: toast notifications for user actions across all pages` |
| 37 | `feat: global search across expenses and incomes with keyboard shortcut` |
| 38 | `feat: stats page with yearly records and financial habits` |
| 39 | `style: polish, accessibility focus styles, scroll to top and empty state` |
| 40 | `docs: readme v2.0, changelog and final release` |

</details>

---

## Autor

**Pedro Henrique Silva**
[github.com/pedrohenriquesilva-dev](https://github.com/pedrohenriquesilva-dev)

---

<div align="center">
  <sub>Feito com 💙 em 40 dias · <a href="https://fluxox.vercel.app">fluxox.vercel.app</a></sub>
</div>
