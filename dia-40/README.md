# FluxoX v1.0 — Controle Financeiro Pessoal

<img width="1362" height="707" alt="FluxoX Dashboard" src="https://github.com/user-attachments/assets/f4a9e8d6-a3c8-44ab-a11b-a5954985395b" />

## 📱 Sobre o Projeto

**FluxoX** é uma aplicação web moderna de controle financeiro pessoal, nascida da necessidade de transformar planilhas manuais em um sistema inteligente, visual e acessível.

Em vez de fórmulas em Excel, você agora tem:

✅ **Registros rápidos** de receitas e despesas com categorias  
✅ **Separação automática** entre pagamentos eletrônicos e dinheiro físico  
✅ **Gráficos interativos** com Recharts (barras, pizza e linhas)  
✅ **Meta mensal** com acompanhamento visual de progresso  
✅ **Visão anual** com tabela consolidada de jan-dez  
✅ **Exportação para CSV** de dados filtrados  
✅ **Compartilhamento de resumo** mensal via texto  
✅ **Instalação mobile** como PWA (Progressive Web App)  
✅ **Funcionamento offline** com Service Worker  
✅ **Interface responsiva** para desktop, tablet e celular  

---

## 🎯 Funcionalidades Principais

### 📊 Dashboard
- **Visão consolidada** de receitas, despesas, economia real e saldo do mês
- **4 cards de métricas** com tendências
- **2 gráficos de pizza** comparando eletrônico vs espécie
- **Gráfico de barras** mensal (Entradas vs Saídas)
- **Gráfico de linha** mostrando acumulado vs meta desejada
- **Tabela anual** com todos os meses e saldo corrente
- **Botão de compartilhamento** para gerar resumo textual

### 💰 Despesas & Receitas
- **Formulário CRUD completo** (criar, editar, deletar)
- **Filtros** por forma de pagamento
- **Ordenação** por valor (crescente/decrescente)
- **Stats em tempo real** (total, média)
- **Exportação CSV** dos dados filtrados
- **Campos**: data, descrição, categoria, valor, método

### 📅 Visão Anual
- **Tabela estratégica** de janeiro a dezembro
- **Consolidado anual** (receitas, despesas, saldo)
- **Comparação com meta mensal**
- **Saldo acumulado** (running balance)
- **Exportação do resumo anual**

### ⚙️ Configurações
- Gerenciar categorias de despesas
- Gerenciar métodos de pagamento
- Atualizar meta mensal desejada

### 🏦 Poupança (Placeholder)
- Interface pronta para rastrear contas e saldos guardados
- Estrutura para conferência teórico vs real

### 📱 PWA & Offline
- Instalável no celular (iOS e Android)
- Funciona totalmente offline
- Sincronização automática ao voltar online
- Cache de assets (JS, CSS, HTML, fontes)

---

## 🛠️ Tech Stack

| Layer | Tecnologia |
|-------|-----------|
| **Frontend** | React 18 + JSX |
| **Build** | Vite 5 |
| **Styling** | CSS Grid + CSS Variables |
| **Charts** | Recharts 2.14 |
| **State** | React Hooks (useState, useMemo, useLocalStorage) |
| **PWA** | Vite Plugin PWA |
| **Type Checking** | PropTypes |
| **Storage** | localStorage (persistência) |

---

## 📂 Estrutura do Projeto

```
fluxox/
├── src/
│   ├── components/
│   │   ├── transactions/
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   └── ui/
│   │       ├── BarChart.jsx          (Recharts com tooltip)
│   │       ├── PieChart.jsx          (Recharts donut interativo)
│   │       ├── LineChart.jsx         (Acumulado vs meta)
│   │       ├── AccumulatedTable.jsx
│   │       ├── StatCard.jsx
│   │       ├── PageHeader.jsx
│   │       ├── Sidebar.jsx
│   │       ├── MobileNav.jsx
│   │       ├── Modal.jsx
│   │       ├── Field.jsx
│   │       ├── ExportButton.jsx
│   │       ├── InstallBanner.jsx
│   │       ├── MonthlySummaryModal.jsx
│   │       └── Layout.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ExpensesPage.jsx
│   │   ├── IncomesPage.jsx
│   │   ├── AnnualPage.jsx
│   │   ├── SavingsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── ConferencePage.jsx
│   │   └── Placeholder.jsx
│   ├── hooks/
│   │   ├── useFinance.js          (Central de cálculos)
│   │   ├── useLocalStorage.js     (Persistência)
│   │   └── usePWAInstall.js       (Instalação PWA)
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── storage.js
│   │   ├── propTypes.js
│   │   ├── exportCsv.js
│   │   └── exportText.js
│   ├── App.jsx                   (Router principal)
│   ├── main.jsx                  (Entry point)
│   └── index.css                 (CSS global + variáveis)
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── icon-192.png          (PWA icon)
│       └── icon-512.png          (PWA icon)
├── index.html
├── vite.config.js                (PWA plugin config)
├── package.json
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

---

## 🚀 Como Começar

### Pré-requisitos
- **Node.js** 18.0.0 ou superior
- **npm** 9.0.0 ou superior

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/pedrohenriquesilva-dev/FluxoX.git

# 2. Entre na pasta
cd FluxoX

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

### Build para Produção

```bash
# Cria a build otimizada
npm run build

# Visualiza a build localmente
npm run preview
```

---

## 📊 Recursos por Página

### **Dashboard** 📈
- 4 cards com métricas totais
- Gráficos de pizza (despesas e receitas)
- Gráfico de barras (entradas vs saídas por mês)
- Gráfico de linha (acumulado vs meta)
- Tabela anual com saldo acumulado
- Botão para compartilhar resumo

### **Despesas** 💸
- Formulário para cadastrar nova despesa
- Lista com filtros e ordenação
- Edição e exclusão inline
- Export CSV dos dados filtrados

### **Receitas** 💰
- Formulário para registrar nova receita
- Lista com filtros por método
- CRUD completo
- Estatísticas (total, média)
- Export CSV

### **Visão Anual** 📅
- Tabela consolidada Jan-Dez
- Colunas: Receitas, Despesas, Saldo, Acumulado
- Comparação com meta mensal
- Export do resumo anual

### **Poupança** 🏦
- Interface pronta (placeholder)
- Estrutura para rastrear contas

### **Configurações** ⚙️
- Gerenciar categorias de despesa
- Gerenciar formas de pagamento
- Atualizar meta mensal

---

## 💾 Armazenamento de Dados

Todos os dados são salvos **localmente no navegador** usando `localStorage`. Não há servidor backend.

**Estrutura de dados:**
```javascript
{
  expenses: [{ id, date, description, category, value, method, type }],
  incomes: [{ id, date, description, category, value, method, type }],
  monthlyGoal: 5000,
  savingLocations: [{ name, electronic: 0, cash: 0 }]
}
```

---

## 🎨 Design & UX

- **CSS Grid** para layouts responsivos
- **CSS Variables** para temas e cores
- **Dark Mode Ready** (variáveis preparadas)
- **Mobile First** approach
- **Breakpoints**: 1024px, 768px, 480px, 360px
- **Ícones SVG** customizáveis
- **Transições suaves** (0.2s ease)

---

## 📱 PWA (Progressive Web App)
