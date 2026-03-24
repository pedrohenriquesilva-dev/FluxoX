import { useState } from "react";
import Layout from "./components/ui/Layout.jsx";
import Placeholder from "./pages/Placeholder.jsx";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      <Placeholder page={page} />
    </Layout>
  );
}

export default App;