import { useState } from "react";
import Layout from "./components/ui/Layout.jsx";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
import Placeholder from "./pages/Placeholder.jsx";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === "expenses" ? <ExpensesPage /> : null}
      {page === "incomes" ? <IncomesPage /> : null}
      {page !== "expenses" && page !== "incomes" ? <Placeholder page={page} /> : null}
    </Layout>
  );
}

export default App;