import { useMemo, useState } from "react";
import Field from "../ui/Field.jsx";
import { CATEGORIES, PAYMENT_METHODS, TRANSACTION_TYPES } from "../../utils/constants.js";
import { generateId, normalizeMoneyInput } from "../../utils/formatters.js";
import "./TransactionForm.css";

const FORM_TEXT = {
  [TRANSACTION_TYPES.EXPENSE]: {
    title: "Nova despesa",
    button: "Salvar despesa"
  },
  [TRANSACTION_TYPES.INCOME]: {
    title: "Nova receita",
    button: "Salvar receita"
  }
};

function toInputDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export default function TransactionForm({
  mode = TRANSACTION_TYPES.EXPENSE,
  onSubmit
}) {
  const copy = FORM_TEXT[mode] ?? FORM_TEXT[TRANSACTION_TYPES.EXPENSE];
  const [form, setForm] = useState({
    description: "",
    value: "",
    category: CATEGORIES[0],
    method: PAYMENT_METHODS[0],
    date: toInputDate()
  });
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => form.description.trim() && normalizeMoneyInput(form.value) > 0 && form.date,
    [form]
  );

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const parsedValue = normalizeMoneyInput(form.value);
    if (!form.description.trim() || parsedValue <= 0 || !form.date) {
      setError("Preencha descricao, valor maior que zero e data.");
      return;
    }

    const payload = {
      id: generateId(),
      type: mode,
      description: form.description.trim(),
      value: parsedValue,
      category: form.category,
      method: form.method,
      date: form.date
    };

    onSubmit?.(payload);
    setError("");
    setForm((prev) => ({ ...prev, description: "", value: "" }));
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <header className="transaction-form__header">
        <h2 className="transaction-form__title">{copy.title}</h2>
        <p className="transaction-form__hint text-muted">
          Componente unico para despesas e receitas.
        </p>
      </header>

      <div className="transaction-form__grid">
        <Field
          id="description"
          label="Descricao"
          placeholder="Ex: supermercado, salario..."
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
        />

        <Field
          id="value"
          label="Valor"
          type="text"
          placeholder="0,00"
          value={form.value}
          onChange={(event) => updateField("value", event.target.value)}
        />

        <label className="transaction-form__select-wrap" htmlFor="category">
          <span className="field__label">Categoria</span>
          <select
            id="category"
            className="transaction-form__select"
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="transaction-form__select-wrap" htmlFor="method">
          <span className="field__label">Metodo de pagamento</span>
          <select
            id="method"
            className="transaction-form__select"
            value={form.method}
            onChange={(event) => updateField("method", event.target.value)}
          >
            {PAYMENT_METHODS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Field
        id="date"
        label="Data"
        type="date"
        value={form.date}
        onChange={(event) => updateField("date", event.target.value)}
        error={error}
      />

      <footer className="transaction-form__footer">
        <button className="day5__button" type="submit" disabled={!canSubmit}>
          {copy.button}
        </button>
      </footer>
    </form>
  );
}
