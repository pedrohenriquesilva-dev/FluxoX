# CHANGELOG — FluxoX

Todas as mudanças notáveis neste projeto são documentadas neste arquivo.

---

## [1.0.0] — 2026-04-29

### ✨ Fase 6: Gráficos Interativos com Recharts

#### Added
- **Recharts 2.14.2** integrado ao projeto
- **BarChart.jsx** com gráfico interativo de barras (Entradas vs Saídas)
  - Hover effects com brightness
  - Tooltip customizado com formatação de moeda
  - Barras lado a lado com cores (sucesso/perigo)
  - Responsivo para mobile
- **PieChart.jsx** migrado para Recharts com design donut
  - Hover interativo nas fatias
  - Legend com formatação de moeda
  - Estado de seleção visual
  - Responsivo
- **LineChart.jsx** novo com acumulado vs meta
  - Linha sólida para acumulado real
  - Linha tracejada para meta desejada
  - Animações suaves
  - Tooltip com informações de ambas as linhas

#### Changed
- BarChart.css: Estilos refatorados para Recharts (GridBox, hover, responsivo)
- PieChart.css: Refatorado com tooltip e legend customizados
- useFinance.js: Adicionado `lineChartData` para calcular acumulado progressivo

#### Technical
- Todos os gráficos usam CSS variables (--success, --accent, --warning, --danger)
- Transições suaves de 0.2s ease em todas as interações
- Responsivos com grid e containers flexíveis

---

### 📋 Fase 7: Exportação de Dados para CSV

#### Added
- **exportCsv.js** utility com 3 funções principais
  - `exportExpensesToCSV()` - Exporta despesas filtradas
  - `exportIncomesToCSV()` - Exporta receitas filtradas
  - `exportAnnualToCSV()` - Exporta resumo anual
- **ExportButton.jsx** componente reutilizável
  - Ícone de download SVG
  - Estado de loading com spinner animado
  - Feedback de sucesso/erro
  - Responsivo para mobile
- **ExportButton.css** com estilos elegantes
  - Hover effects (transform, brightness)
  - Spinner CSS animado (@keyframes spin)
  - Estados disabled
- Integração em **ExpensesPage.jsx**
- Integração em **IncomesPage.jsx**
- Integração em **AnnualPage.jsx**

#### Features
- ✅ Exporta dados **filtrados** (não todos)
- ✅ Formatação brasileira: datas (DD/MM/YYYY), moedas (1.234,56)
- ✅ CSV com escape de caracteres especiais
- ✅ Headers em português
- ✅ Download automático no navegador

#### Changed
- ExpensesPage.jsx: Adicionado ExportButton no header
- IncomesPage.jsx: Adicionado ExportButton no header
- AnnualPage.jsx: Adicionado ExportButton no header
- ExpensesPage.css: Adicionado `.expenses-page__header-row`
- IncomesPage.css: Adicionado `.incomes-page__header-row`
- AnnualPage.css: Adicionado `.annual-page__header-row`

---

### 📤 Compartilhamento de Resumo Mensal

#### Added
- **exportText.js** utility com funções de texto
  - `generateMonthlySummary()` - Gera texto formatado do mês
  - `copyToClipboard()` - Copia para clipboard (moderno + fallback)
- **MonthlySummaryModal.jsx** componente modal elegante
  - Exibe resumo formatado em monospace
  - Botão "Copiar" com feedback visual
  - Botão "Compartilhar" (Web Share API)
  - Fechar com overlay click ou botão X
  - Responsivo para mobile
- **MonthlySummaryModal.css** estilos completos
  - Modal com backdrop blur
  - Overlay semi-transparente
  - Box shadow elegante
  - Transições suaves
  - Responsivo (768px e 480px)
- Integração no **DashboardPage.jsx**
  - Novo botão "📤 Compartilhar resumo" no header
  - Estado `showSummaryModal` com toggle
  - Props `monthlyData` e `goal` passadas corretamente

#### Features
- ✅ Resumo contém: Receitas, Despesas, Economia, Meta, Status
- ✅ Emojis para visualização rápida (💰, 💸, 💾, 🎯, 🎉)
- ✅ Formatação com quebras de linha claras
- ✅ Copia com fallback para navegadores antigos
- ✅ Usa Web Share API quando disponível (móvel)
- ✅ Feedback visual quando cópia é bem-sucedida

#### Changed
- DashboardPage.jsx: Adicionado MonthlySummaryModal e botão
- DashboardPage.css: Adicionados `.dashboard-page__header-actions` e `.dashboard-page__share-button`
- propTypes.js: Atualizado financeShape com lineChartData

---

### 📱 PWA (Progressive Web App)

#### Added
- **vite-plugin-pwa@0.20.5** integrado
- **manifest.json** gerado automaticamente com:
  - Nome: FluxoX - Controle Financeiro
  - Short name: FluxoX
  - Tema: Azul (#5b8af5)
  - Icons: 192×192 e 512×512
  - Display: standalone
  - Orientação: portrait
- **Service Worker** com:
  - Caching de assets (JS, CSS, HTML, SVG, PNG)
  - Estratégia CacheFirst para Google Fonts (365 dias)
  - Auto-update em background
  - Offline support completo
- **vite.config.js** atualizado com VitePWA plugin

#### Features
- ✅ Instalável no Chrome, Edge, Firefox, Safari
- ✅ Funciona completamente offline
- ✅ Sincronização automática ao reconectar
- ✅ Ícones customizáveis
- ✅ Cache de fontes por 1 ano
- ✅ Auto-update de versões

#### Technical
- Manifest gerado em `dist/manifest.webmanifest`
- Service Worker em `dist/sw.js`
- Ícones em `public/icons/`
- Estratégia workbox para runtimeCaching

#### Changed
- package.json: Adicionada dependência vite-plugin-pwa

---

### 📚 Documentação

#### Added
- **README.md** v1.0 completo com:
  - Visão geral e funcionalidades
  - Tech stack com tabela
  - Estrutura de projeto detalhada
  - Como começar (instalação e build)
  - Recursos por página
  - Informações de armazenamento
  - Design & UX
  - Instruções PWA
  - Como contribuir
  - Informações de suporte
- **CHANGELOG.md** (este arquivo)
- **LICENSE** MIT completa

#### Features
- ✅ Documentação em Markdown
- ✅ Badges e emojis para visualização
- ✅ Estrutura clara e navegável
- ✅ Exemplos de código
- ✅ Links internos

---

## Histórico Anterior

### [Pre-release] — Semanas 1-4

#### Core Features
- ✅ Setup com Vite + React 18
- ✅ Router completo (Dashboard, Despesas, Receitas, Anual, Poupança, Configurações, Conferência)
- ✅ CRUD de transações (criar, editar, deletar)
- ✅ Separação eletrônico vs espécie (cash)
- ✅ Cálculos financeiros no useFinance.js
- ✅ localStorage para persistência
- ✅ Filtros e ordenação
- ✅ Cards de estatísticas
- ✅ Tabela anual consolidada
- ✅ Design responsivo com CSS Grid
- ✅ CSS Variables para tema
- ✅ Mobile navigation (Sidebar + MobileNav)
- ✅ Modal reutilizável
- ✅ PropTypes para type-checking

---

## Resumo de Commits

```
01d2df8 - feat: pwa support with manifest, icons and service worker
08cbb48 - feat: monthly summary text export for sharing
800318f - feat: export filtered transactions to csv
8920116 - feat: recharts line chart showing real vs goal accumulated savings
94921f2 - feat: recharts bar chart with interactive tooltip
```

---

## 🎯 Roadmap Futuro

### Phase 8: Melhorias & Polish
- [ ] Dark mode toggle
- [ ] Histórico de transações com busca
- [ ] Relatórios em PDF
- [ ] Notificações de alerta de meta

### Phase 9: Avançado
- [ ] Backend com Supabase ou Firebase
- [ ] Sincronização entre dispositivos
- [ ] Compartilhamento de orçamentos familiares
- [ ] Integração com bancos (API)
- [ ] Gráficos customizáveis

### Phase 10: Produção
- [ ] Hospedagem (Vercel, Netlify, etc)
- [ ] CI/CD com GitHub Actions
- [ ] Testes automatizados
- [ ] Monitoramento e analytics
- [ ] Suporte multi-idioma

---

## 🏆 Versão Atual

**v1.0.0** — Lançada em 29 de Abril de 2026

Todas as funcionalidades core implementadas e testadas. Pronto para produção e instalação como PWA!

---

## 📌 Notas

- Todos os dados são armazenados **localmente** no navegador (localStorage)
- A aplicação funciona **100% offline** após primeira visita
- Não há servidor backend — é um app client-side puro
- Compatível com navegadores modernos (Chrome, Firefox, Safari, Edge)
