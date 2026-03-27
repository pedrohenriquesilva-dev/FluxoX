import { useState } from "react";
import Layout from "./components/ui/Layout.jsx";
import Field from "./components/ui/Field.jsx";
import Modal from "./components/ui/Modal.jsx";
import StatCard from "./components/ui/StatCard.jsx";
import { fmt } from "./utils/formatters.js";

function App() {
  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      <section className="day5">
        <header className="day5__header">
          <h1 className="day5__title">Dia 5 - Componentes Base</h1>
          <button className="day5__button" type="button" onClick={() => setOpenModal(true)}>
            Abrir Modal
          </button>
        </header>

        <Field
          id="search"
          label="Busca rapida"
          icon="search"
          placeholder="Buscar transacao, categoria ou metodo..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          hint="Componente reutilizavel para entradas e filtros."
        />

        <div className="day5__grid">
          <StatCard title="Saldo do mes" value={fmt(4820.35)} trend={12.4} icon="dashboard" />
          <StatCard title="Receitas" value={fmt(9300)} trend={5.7} icon="incomes" />
          <StatCard title="Despesas" value={fmt(4479.65)} trend={-3.1} icon="expenses" />
        </div>
      </section>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Modal base reutilizavel"
        actions={
          <>
            <button className="day5__button day5__button--ghost" type="button" onClick={() => setOpenModal(false)}>
              Cancelar
            </button>
            <button className="day5__button" type="button" onClick={() => setOpenModal(false)}>
              Entendi
            </button>
          </>
        }
      >
        <p className="text-muted">
          Este modal ja esta pronto para formularios, confirmacoes e detalhes de transacoes.
        </p>
      </Modal>
    </Layout>
  );
}

export default App;