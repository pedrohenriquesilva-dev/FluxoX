import { fmt } from "../../utils/formatters.js";
import "./AccumulatedTable.css";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function AccumulatedTable({ rows = [] }) {
  return (
    <section className="accumulated-table">
      <header className="accumulated-table__header">
        <h3 className="accumulated-table__title">Acumulado Mensal</h3>
      </header>

      <div className="accumulated-table__wrapper">
        <table>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.month}>
                <td>{MONTHS[item.month] ?? "--"}</td>
                <td>{fmt(item.income)}</td>
                <td>{fmt(item.expense)}</td>
                <td className={item.balance >= 0 ? "text-success" : "text-danger"}>
                  {fmt(item.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
