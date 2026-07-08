# Changelog — FluxoX

## [2.0.0] — 2026 · v2.0 Final

### Fase 9 — Melhorias pós-lançamento (Dias 31–40)

### Dia 40 — README v2.0 e release final
- README completamente reescrito com todas as 40 fases documentadas
- Tabela de 40 commits com mensagens reais
- Arquitetura atualizada com 24 componentes e 9 páginas
- Sistema de design documentado para dark e light mode
- Decisões técnicas expandidas
- Release v2.0 publicada no GitHub

### Dia 39 — Polimento e acessibilidade
- `index.css` com `focus-visible` para navegação por teclado
- Suporte a `@media print` — sidebar e topbar somem ao imprimir
- `EmptyState` — componente padronizado de estado vazio
- `ScrollToTop` — botão animado para voltar ao topo
- `Layout` atualizado com `role="banner"`, `id="main-content"` e `tabIndex`

### Dia 38 — Tela de Estatísticas
- `StatsPage` com 4 seções: visão geral, recordes, hábitos e evolução
- 6 cards de visão geral (total de lançamentos, taxa de economia, médias)
- Recordes automáticos: mês mais caro, melhor receita, maior despesa individual
- Hábitos: categoria que mais pesou, forma de pagamento favorita
- Grade de evolução mensal com economia e acumulado por mês
- Sidebar atualizada com 9 itens de navegação

### Dia 37 — Busca global
- `useGlobalSearch` — busca em descrição, categoria, forma e mês
- `GlobalSearch` — dropdown com resultados agrupados por tipo
- Highlight do texto buscado em azul nos resultados
- Atalho `Ctrl+K` para focar a busca de qualquer lugar
- `Esc` fecha o dropdown
- Layout atualizado com topbar sticky contendo a busca

### Dia 36 — Toast notifications
- `useToast` — hook com atalhos success, error, warning, info
- `ToastContainer` — componente puro sem import de contexto
- `ToastContext` — contexto global via React Context API
- `ToastProvider` envolvendo a App em `main.jsx`
- 4 páginas atualizadas: Despesas, Receitas, Guardado, Premissas
- Posicionamento mobile acima da MobileNav

### Dia 35 — Skeleton loading
- `Skeleton` — componente com 4 variantes e animação shimmer
- `DashboardSkeleton` — replica o layout do Dashboard com placeholders
- `useLoading` — hook com delay configurável
- Dashboard mostra skeleton por 700ms antes do conteúdo real
- `prefers-reduced-motion` respeita preferência do usuário

### Dia 34 — Tela de Relatórios
- `ReportsPage` com filtro de período, abas e 3 seções
- Análise por categoria com barra de progresso e percentual
- Análise por forma de pagamento com mesmo padrão
- Gráfico de barras nativo de evolução mensal
- Período selecionado destaca barras, fora do período fica opaco

### Dia 33 — Conferência melhorada e filtro de período
- `PeriodFilter` — seletor de mês inicial → mês final reutilizável
- `filterByPeriod` — função utilitária para filtrar por intervalo
- `ConferencePage` reescrita com linhas expandíveis
- Chevron animado (90° quando expandido)
- Cards recalculam pelo período selecionado

### Dia 32 — Tema claro/escuro
- `useTheme` — lê preferência do sistema, persiste no localStorage
- Tema claro com 8 tokens de cor redesenhados
- `ThemeToggle` — botão com ícone sol/lua e animação no clique
- `[data-theme='light']` aplicado no `<html>`
- Transição suave de 300ms ao trocar tema

### Dia 31 — Animações de entrada
- `useAnimation` — IntersectionObserver sem dependências
- `Animated` — wrapper com 6 tipos: fade-up, fade-down, fade-left, fade-right, fade, scale
- Efeito stagger nos KPI cards (80ms de delay entre cada)
- BarChart e PieChart entram de lados opostos
- `prefers-reduced-motion` desabilita animações quando necessário

---

## [1.0.0] — 2026 · v1.0

### Fase 8 — PWA e Finalização (Dias 29–30)
- PWA com vite-plugin-pwa, manifest, service worker e ícones
- Cache offline de assets e fontes Google via Workbox
- `usePWAInstall` e `InstallBanner` na sidebar
- Meta tags PWA, iOS e Open Graph
- README v1.0, LICENSE e CHANGELOG

### Fase 7 — Exportação (Dias 27–28)
- `exportCsv.js` com BOM UTF-8 para Excel
- `ExportButton` com badge de contagem
- `exportText.js` e `MonthlySummaryModal` para compartilhar

### Fase 6 — Recharts (Dias 24–26)
- BarChart, PieChart e LineChart migrados para Recharts
- Tooltips customizados em todos os gráficos
- `lineChartData` adicionado ao `useFinance`

### Fase 5 — Qualidade (Dias 20–23)
- `storage.js`, `propTypes.js`, `PageHeader`
- PropTypes em todos os 15+ componentes
- `MobileNav` e media queries em todas as páginas
- JSDoc completo em `formatters.js` e `useFinance`

### Fase 4 — Telas restantes (Dias 17–19)
- `SavingsPage`, `ConferencePage`, `SettingsPage`
- App 100% funcional com 7 telas ativas

### Fase 3 — Dashboard (Dias 13–16)
- `useFinance` com useMemo em todos os cálculos
- `DashboardPage` com KPIs, gráficos SVG e GoalCard
- `AnnualPage` com 3 blocos financeiros

### Fase 2 — CRUD (Dias 6–12)
- `TransactionForm` com validação
- `TransactionList` com editar e excluir
- `ExpensesPage` e `IncomesPage` com filtros encadeados
- `useLocalStorage` com persistência automática
- Filtros por forma de pagamento e ordenação

### Fase 1 — Setup (Dias 1–5)
- Vite + React, GitHub, Vercel
- CSS variables dark mode, Google Fonts
- Sidebar, roteamento por estado
- Constantes, formatters, componentes base

---

[2.0.0]: https://github.com/pedrohenriquesilva-dev/FluxoX/releases/tag/v2.0.0
[1.0.0]: https://github.com/pedrohenriquesilva-dev/FluxoX/releases/tag/v1.0.0
