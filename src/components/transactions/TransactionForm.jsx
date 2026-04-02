import { useEffect, useMemo, useState } from "react";
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
  initial = null,
  categoryOptions = CATEGORIES,
  methodOptions = PAYMENT_METHODS,
  submitButtonClassName = "",
  onSubmit,
  onCancelEdit
}) {
  const categories = categoryOptions?.length ? categoryOptions : CATEGORIES;
  const methods = methodOptions?.length ? methodOptions : PAYMENT_METHODS;
  const effectiveMode = initial?.type ?? mode;
  const copy = FORM_TEXT[effectiveMode] ?? FORM_TEXT[TRANSACTION_TYPES.EXPENSE];
  const [form, setForm] = useState({
    description: "",
    value: "",
    category: categories[0],
    method: methods[0],
    date: toInputDate()
  });
  const [error, setError] = useState("");
  const isEditing = Boolean(initial?.id);

  useEffect(() => {
    if (!initial) return;
    setForm({
      description: initial.description ?? "",
      value: String(initial.value ?? ""),
      category: initial.category ?? categories[0],
      method: initial.method ?? methods[0],
      date: initial.date ?? toInputDate()
    });
  }, [initial, categories, methods]);

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
      id: initial?.id ?? generateId(),
      type: effectiveMode,
      description: form.description.trim(),
      value: parsedValue,
      category: form.category,
      method: form.method,
      date: form.date
    };

    onSubmit?.(payload);
    setError("");
    if (isEditing) return;
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
            {categories.map((item) => (
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
            {methods.map((item) => (
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
        {isEditing ? (
          <button className="day5__button day5__button--ghost" type="button" onClick={onCancelEdit}>
            Cancelar edicao
          </button>
        ) : null}
        <button
          className={`day5__button ${submitButtonClassName}`.trim()}
          type="submit"
          disabled={!canSubmit}
        >
          {isEditing ? "Atualizar transacao" : copy.button}
        </button>
      </footer>
    </form>
  );
}
